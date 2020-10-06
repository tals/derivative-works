import os
import random
import torch
import torch.nn as nn
from PIL import Image
from torchvision import transforms, datasets
from pytorch_pretrained_biggan import truncated_noise_sample
to_tensor = transforms.ToTensor()

def random_biggan_latents(n_ref, truncation, img_size, n_classes=1000, seed=1234):
    noise_vectors = truncated_noise_sample(truncation=truncation, batch_size=n_ref, seed=seed)
    noise_vectors = torch.from_numpy(noise_vectors).cuda()
    class_vectors = torch.zeros(n_ref, n_classes).cuda()
    random.seed(seed)
    for i in range(n_ref):
        class_vectors[i, random.randrange(0, n_classes)] = 1.0    
    return noise_vectors, class_vectors

def random_biggan(n, img_size, model, seed=1, truncation=.4):
    pz, pc = random_biggan_latents(n, truncation, img_size, seed=seed)
    palette_imgs = torch.stack([
        model(pz[i:i+1], pc[i:i+1], truncation).detach()[0]
        for i in range(pz.shape[0])
    ])
    return palette_imgs

def load_images(img_paths, img_size):
    palette_imgs = [
        Image.open(path).resize((img_size, img_size)).convert('RGB')
        for path in img_paths
    ]
    palette_imgs = torch.stack([
        (to_tensor(img)-.5)*2
        for img in palette_imgs
    ]).cuda()
    return palette_imgs

def load_directory(img_dir, img_size):
    img_paths = [ os.path.join(img_dir, n) for n in os.listdir(img_dir) ]
    return load_images(img_paths, img_size)
    