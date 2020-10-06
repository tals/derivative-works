import sys
import kornia
import torch
import torch.nn as nn
# sys.path.append('/home/joel/Repos/dlib_facedetector_pytorch')
sys.path.append('/home/joel/Repos/neural-painters-pytorch/')
from neural_painters.transforms import RandomRotate, Normalization, RandomCrop, RandomScale
# Define image augmentations
padder = nn.ConstantPad2d(12, 0.5)
rand_crop_8 = RandomCrop(8)
rand_scale = RandomScale([1 + (i-5)/50. for i in range(11)])
random_rotater = RandomRotate(angle=5, same_throughout_batch=False)
rand_crop_4 = RandomCrop(4)

def augment(img, n=1):
    imgs = img.repeat(n, 1, 1, 1)
    return rand_crop_4(random_rotater(rand_crop_8(rand_scale(padder(imgs)))))