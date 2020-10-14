import os, sys
import dlib_torch_converter
import torch
import torch.nn as nn
import torch.nn.functional as F
from PIL import Image
import torchvision.transforms as transforms
from pathlib import Path

MODEL_PATH = Path(dlib_torch_converter.__file__).parent / 'face.xml'

class DlibFaceLoss:
    def __init__(self, filter_index=1, target_image_path=None):
        self.filter_index = filter_index
        self.dlib_model = dlib_torch_converter.get_model(str(MODEL_PATH)).eval().cuda()
        self.model = nn.Sequential(*[self.dlib_model._modules[i] \
                                   for i in list(self.dlib_model._modules.keys())[:-2]])
        self.model.eval()
        self.model.zero_grad()
        self.target_activations = None
        if target_image_path:
            target_ten = transforms.ToTensor()(Image.open(target_image_path)).unsqueeze(0)
            target_ten = F.interpolate(target_ten, size=(128, 128), mode='bilinear')
            self.target_activations = self.model(target_ten.cuda()).detach()

    def __call__(self, img_tensors):
        # [0, 1] input range
        self.model.zero_grad()
        img_tensors = F.interpolate(img_tensors, size=(128, 128), mode='bilinear')

        out = self.model(img_tensors)
        size = out.size(2)
        if self.target_activations is not None:
            # loss = torch.dist(out[0, :5], self.target_activations[0, :5])
            loss = torch.dist(out, self.target_activations)
        else:
            # Take the middle pixel in the image.
            if self.filter_index == 'all':
                loss = -out[:, :, size//2, size//2]
            else:
                loss = -out[:, self.filter_index, size//2, size//2]
        return loss

class IdentityLoss:
    def __init__(self, target, image_size=256, margin=86):
        """ Target is a path to an image or directory of images.
        """
        from facenet_pytorch import MTCNN, InceptionResnetV1, fixed_image_standardization
        self.mtcnn = MTCNN(image_size=image_size, margin=margin)
        self.facenet = InceptionResnetV1(pretrained='vggface2').eval().cuda()

        # Create target embedding.
        self.target_img_embeddings = []
        self.target_img_tensors = []
        if os.path.isdir(target):
            paths = [ os.path.join(target, n) for n in os.listdir(target) ]
        else:
            paths = [target]
        for name in paths:
            try:
                img = Image.open(name).convert('RGB')
                img_cropped = self.mtcnn(img)
                self.target_img_tensors.append(img_cropped)
                if img_cropped is not None:
                    self.target_img_embeddings.append(
                        self.facenet(img_cropped.cuda().unsqueeze(0)).detach()
                    )
            except Exception as e:
                # print(e)
                pass
        print(len(self.target_img_embeddings), 'images found with faces.')
        self.target_emb = torch.stack(self.target_img_embeddings).squeeze().mean(axis=0).cuda()

    def _get_emb(self, img_tensors):
        self.facenet.zero_grad()
        self.facenet.eval()
        img_tensors = F.interpolate(img_tensors, size=(256, 256), mode='bilinear')
        img_embs = self.facenet(fixed_image_standardization(img_tensors*255))
        return img_embs

    def __call__(self, img_tensors):
        # [0, 1] input range
        img_embs = self._get_emb(img_tensors)
        distances = (img_embs - self.target_emb).norm(dim=1)
        return distances

# class DiscriminatorLoss:
#     def __init__(self):
#         sys.path.append('/home/joel/Repos/stylegan2-pytorch')
#         from model import Discriminator
#         self.disc = Discriminator(256).eval().cuda()
#         checkpoint = torch.load('/home/joel/Repos/stylegan2-pytorch/550000.pt')
#         self.disc.load_state_dict(checkpoint['d'], strict=False)
#     def __call__(self, img_tensors):
#         # [-1, 1] image range
#         img_tensors = F.interpolate(img_tensors, size=(256, 256), mode='bilinear')
#         scores = self.disc(img_tensors.cuda())
#         return scores