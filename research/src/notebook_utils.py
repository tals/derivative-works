import numpy as np
import PIL
import PIL.Image
import IPython.display
from io import BytesIO
import matplotlib.pyplot as plt
import cv2
from pytorch_pretrained_biggan import convert_to_images


def imgrid(imarray, cols=5, pad=1):
    if type(imarray) == list:
        imarray = np.array(imarray, dtype='uint8')
    """Turn an imarray into a grid."""
    if imarray.dtype != np.uint8:
        raise ValueError("imgrid input imarray must be uint8")
    
    pad = int(pad)
    assert pad >= 0
    cols = int(cols)
    assert cols >= 1
    
    # print(imarray.shape)
    gray = False
    if len(imarray.shape) == 3:
        gray = True
        imarray = imarray[:, :, :, None]
    N, H, W, C = imarray.shape
    rows = N // cols + int(N % cols != 0)
    batch_pad = rows * cols - N
    assert batch_pad >= 0
    post_pad = [batch_pad, pad, pad, 0]
    pad_arg = [[0, p] for p in post_pad]
    imarray = np.pad(imarray, pad_arg, "constant", constant_values=255)
    H += pad
    W += pad
    grid = (
        imarray.reshape(rows, cols, H, W, C)
        .transpose(0, 2, 1, 3, 4)
        .reshape(rows * H, cols * W, C)
    )
    if pad:
        grid = grid[:-pad, :-pad]
    if gray:
        grid = grid[:,:,0]
    return grid


def imshow(a, max_size=None, scale=False):
    a = np.asarray(a, dtype=np.uint8)
    
    if max_size:
        scale = min(max_size / a.shape[0],max_size / a.shape[1])
        if scale < 1:
            a = cv2.resize(a, None, fx=scale, fy=scale)
    
    image = PIL.Image.fromarray(a, "L" if len(a.shape) == 2 else "RGB")
    buffered = BytesIO()
    image.save(buffered, format="JPEG", quality=90)
    im_data = buffered.getvalue()

    disp = IPython.display.display(IPython.display.Image(im_data))
    return disp

def half(img):
    return cv2.resize(img,None,fx=0.5,fy=0.5)

def pltshow(img):
    plt.figure()
    plt.axis('off')
    plt.imshow(img)
    plt.show()

def draw_tensors(t):
    imgs = [ np.array(img) for img in convert_to_images(t.cpu()) ]
    imshow(imgrid(imgs, cols=min(len(imgs), 5), pad=0))