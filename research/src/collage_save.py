import torch
import random, string
from pathlib import Path
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, wait, as_completed
from pytorch_pretrained_biggan import convert_to_images
from tqdm.auto import tqdm
from PIL import Image
import skvideo
import skvideo.io

def masks_to_pil(masks):
    masks = ((masks+1)/2 * 255)
    masks = masks.byte().cpu().numpy()
    masks = [Image.fromarray(x.squeeze()) for x in masks]
    return masks

class CollageSaver:
    def __init__(self, ffmpeg_path='/usr/bin/ffmpeg'):
        self.key = ''.join([random.choice(string.ascii_lowercase) for i in range(6)])
        prefix = datetime.utcnow().strftime("%Y-%m-%d-%H-%M") + f"-{self.key}"
        self.path = Path(f"./results/{prefix}")
        self.path.mkdir(exist_ok=True, parents=True)
        
        self.palette_dir = self.path / "palette"
        self.palette_dir.mkdir(exist_ok=True)

        self.masks_dir = self.path / "masks"
        self.masks_dir.mkdir(exist_ok=True)
        
        # self.canvas_dir = self.path / "canvas"
        # self.canvas_dir.mkdir(exist_ok=True)
        
        self.futures = set()
        self.executor = ThreadPoolExecutor(16)
        skvideo.setFFmpegPath(ffmpeg_path)

    def run_async(self, f, *args):
        f = self.executor.submit(f, *args)
        self.futures.add(f)
        f.add_done_callback(self.futures.remove)
        
    def save_palette(self, palette_imgs: torch.Tensor):
        imgs = convert_to_images(palette_imgs.cpu())
        for i,x in enumerate(imgs):
            # x.save(self.palette_dir / f"palette_{i:04}.png")
            # x.save(self.palette_dir / f"palette_{i:04}.jpg")
            # self.run_async(x.save, self.palette_dir / f"{i:04}.png")
            self.run_async(x.save, self.palette_dir / f"{i:04}.jpg")
        
    def save_canvas_final(self, canvas: torch.Tensor):
        canvas = convert_to_images(canvas.detach().cpu())[0]
        self.run_async(canvas.save, self.path / f"{self.key}.jpg")

    def save_lookup_table_final(self, img: torch.Tensor):
        x = Image.fromarray(img.cpu().numpy(), "L")
        self.run_async(x.save, self.path / f"lut_{self.key}.png")
    
    def save_masks_final(self, masks, masks_palette):
        masks = masks_to_pil(masks.detach())
        masks_palette = masks_to_pil(masks_palette.detach())
        # mask_dir = self.path / f"final_masks"
        # mask_dir.mkdir(exist_ok=True, parents=True)
        for i, (m1, m2) in enumerate(zip(masks, masks_palette)):
            self.run_async(m1.save, self.masks_dir / f"{i:04}.png")
            self.run_async(m2.save, self.masks_dir / f"{i:04}_trans.png")
    
    def save_canvas(self, step: int, canvas: torch.Tensor):
        canvas = convert_to_images(canvas.detach().cpu())[0]
        self.run_async(canvas.save, self.canvas_dir / f"{step:04}.jpg")

    def save_lookup_table(self, step: int, img: torch.Tensor):
        x = Image.fromarray(img.cpu().numpy(), "L")
        self.run_async(x.save, self.masks_dir / f"lut_{step:04}.png")

    def save_masks(self,
                  step: int,
                  masks: torch.Tensor,
                  canvas_masks: torch.Tensor,
                #   transforms: torch.Tensor
                 ):
        step_img_mask_dir = self.masks_dir / f"img_mask_{step:04}"
        step_img_mask_dir.mkdir(exist_ok=True, parents=True)
        masks = masks_to_pil(masks.detach())
        for i, x in enumerate(masks):
            self.run_async(x.save, step_img_mask_dir / f"{i:02}.png")
        
        step_canvas_mask_dir = self.masks_dir / f"canvas_mask_{step:04}"
        step_canvas_mask_dir.mkdir(exist_ok=True, parents=True)
        canvas_masks = masks_to_pil(canvas_masks.detach())
        for i, x in enumerate(canvas_masks):
            self.run_async(x.save, step_canvas_mask_dir / f"{i:02}.png")
            
        # torch.save(transforms, self.masks_dir / f"transforms_{step:04}.pt")

    def save_video(self, frames:list):
        skvideo.io.vwrite(self.path/f'{self.key}.mp4', frames, outputdict={
            '-vcodec': 'libx264',
            '-pix_fmt': 'yuv420p',
            '-crf': '25',
            '-r':'30',
        })

    def join(self):
        pbar = tqdm(total=len(self.futures))
        for _ in as_completed(self.futures):
            pbar.update()
         