source code for https://derivative.works

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/tals/derivative-works/blob/main/research/make_collage.ipynb)


## About
Derivative-Works is an experiment in using machine learning to create image collages.

The algorithm cuts out shapes from images and rearranges them to create a face.

#### Created By
[Joel](https://www.joelsimon.net/) & [Tal](https://twitter.com/eiopa)


## Source Materials
All of the reference images are in the public domain, created in Artbreeder using BigGAN and StyleGAN.

## Method
1. A patch generator (DCGAN) trained on Perlin noise was taken from a previous project. It creates a high diversity of shapes and is fully-differentiable.
2. There are a fixed number of patches that each has a corresponding latent vector and transformation matrices. These transformations control where in the reference image the patch is cut from and where in the canvas it is placed.
3. These variables are then optimized (using Adam) to do feature inversion over a face classifier (DLIB’s CNN model).

The primary difference between this method and vanilla inversion is the input medium: instead of optimizing pixels directly, we optimize parameters. This simple technique lead to a variety of textures and compositions and the videos show the actual optimizations.

## Repo
### /website
The website listed above. Uses svelte + typescript + sapper + tailwind

### /research
See make_collage.ipynb to make your own

Exporting the data for the site is a little buggy 😇


## Special Thanks
- [@jacobgil](https://github.com/jacobgil/) for his [dlib port + feature inversion repo](https://github.com/jacobgil/dlib_facedetector_pytorch) which made things work :)
- [@reiinakano](https://github.com/reiinakano) for [Neural Painters](https://github.com/reiinakano/neural-painters), which was helpful during our research
