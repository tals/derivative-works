import torch
import numpy as np
import torch.nn.functional as F
from src.transform_utils import transform_imgs, create_trans_matrix

class Collager:
    def __init__(self, palette_imgs, mask_generator, img_size, patch_per_img=1):
        self.latent_size=100 # for shape generator
        self.patch_per_img = patch_per_img
        self.palette_imgs = palette_imgs
        self.mask_generator = mask_generator
        self.img_size = img_size
        self.n_patches = palette_imgs.shape[0] * patch_per_img

    def makeRandom(self, seed=None):
        if seed is not None:
            torch.random.manual_seed(seed)
        n = self.n_patches
        Z = torch.randn(n, self.latent_size).cuda() # Latent to create the patch
        angles = torch.randn(2, n).cuda()
        translations = torch.randn((2, n, 2)).cuda() / 3
        scales = torch.randn(2, n).cuda()
        ordering = torch.randn(n).cuda()
        return Z, angles, translations, scales, ordering

    def __call__(self, Z, angles, translations, scales, ordering, debug=False, return_data=False):
        img_size  = self.img_size
        masks = self.mask_generator(Z) # Create each mask shape.
        masks = F.interpolate(masks, size=(img_size, img_size), mode='bilinear')
        masks = (masks + 1) / 2 # [0, 1] range
        
        pre_scale = .1 + .9 * torch.sigmoid(scales[0]) # Dont go too small or it gets blurry.
        
        M_pre  = create_trans_matrix(img_size, angles[0], translations[0], pre_scale)
        M_post = create_trans_matrix(
            img_size,
            angles[1]-angles[0],
            translations[1]-translations[0],
            (1/pre_scale) * torch.sigmoid(scales[1]) * .75
        )
        
        masks_pre = transform_imgs(M_pre, masks)
        masks_post = transform_imgs(M_post, masks_pre)
        patch_pre = masks_pre * torch.cat(self.patch_per_img*[self.palette_imgs])
        
        patch_post = transform_imgs(M_post, patch_pre)    
        collage = torch.ones((1, 3, img_size, img_size)).cuda()
        
        # for i in range(len(Z)):
        for i in ordering.argsort(): # this works?? :0
            collage *= (1-masks_post[i]) #Empty the spot the new image will go.
            collage += patch_post[i] 
        
        if debug:
            from src.notebook_utils import pltshow, draw_tensors
            pltshow(np.hstack(masks[:5, 0].detach().cpu().numpy()))
            pltshow(np.hstack(masks_pre[:5, 0].detach().cpu().numpy()))
            pltshow(np.hstack(masks_post[:5, 0].detach().cpu().numpy()))
            draw_tensors(patch_pre[:5])
            draw_tensors(patch_post[:5])

        if return_data:
            with torch.no_grad():
                lut = torch.zeros(self.img_size, self.img_size).cuda().byte()
                overlay = torch.ones(self.img_size, self.img_size).cuda().byte()
                for i in ordering.argsort(): 
                    write_mask = masks_post[i].round().squeeze().byte()
                    lut *= (1-write_mask)
                    lut += write_mask*overlay*(i+1)
            return collage, lut, masks, masks_pre

        return collage
    