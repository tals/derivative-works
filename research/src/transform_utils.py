import torch
import kornia

def transform_imgs_white(M, I):
    # Transform the images while preserving white background.
    return 1-kornia.warp_affine(
        1-I, M,
        dsize=I.shape[-2:],
        padding_mode='zeros'
    )

def transform_imgs(M, I):
    # Transform the images.
    return kornia.warp_affine(
        I, M,
        dsize=I.shape[-2:],
        padding_mode='zeros'
    )

def mask_images_white(masks, imgs):
    return 1-(((1-imgs) * masks))

def create_trans_matrix(img_size, angles, translations, scales):
    # Return a transformation matrix, size=(n, 2, 3)
    n = angles.shape[0]
    center = torch.ones(n, 2).cuda()
    center[..., 1] = img_size / 2  # y
    center[..., 0] = img_size / 2  # x
    M = kornia.get_rotation_matrix2d(center, angles, scales)
    M[..., 2] += translations
    return M