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

    def makeRandom(self, trans_scale=.2, seed=None):
        if seed is not None:
            torch.random.manual_seed(seed)
        n = self.n_patches
        Z = torch.randn(n, self.latent_size).cuda()/2 # Latent to create the patch
        angles = torch.randn(2, n).cuda()
        translations = torch.randn((2, n, 2)).cuda() * trans_scale
        scales = torch.randn(2, n).cuda()
        ordering = torch.randn(n).cuda()
        return Z, angles, translations, scales, ordering

    def _process_transforms(self, angle_raw, scale_raw, translation_raw):
        # Assume all input values are in normal distributions.
        scale = torch.sigmoid(scale_raw) # Scale is [0, 1.0]
        angle = torch.tanh(angle_raw) * 180 #[-180, 180] range
        translation = torch.tanh(translation_raw) * self.img_size * .5
        
        scale = torch.stack((
            .25 + .75*scale[0], # Dont go too small or it gets blurry.
            scale[1] * .75
        ))
        
        return angle, scale, translation

    def __call__(self, Z, angle, translation, scale, ordering, debug=False, return_data=False):
        img_size  = self.img_size
        masks = self.mask_generator(Z) # Create each mask shape.
        masks = F.interpolate(masks, size=(img_size, img_size), mode='bilinear')
        masks = (masks + 1) / 2 # [0, 1] range
        
        angle, scale, translation = self._process_transforms(angle, scale, translation)
    
        M_pre = create_trans_matrix(
            img_size, angle[0], translation[0], scale[0]
        )
        M_post = create_trans_matrix(
            img_size,
            angle[1]-angle[0],
            translation[1]-translation[0],
            scale[1] / scale[0]
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
                data = (lut, masks, masks_pre, masks_post, angle, scale, translation, ordering)
                return collage, data

        return collage, None
    