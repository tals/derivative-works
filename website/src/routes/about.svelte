
<svelte:head>
  <title>About</title>
</svelte:head>
<style>
  a {
    text-decoration: underline;
  }
  p, ol {
    margin-bottom: 1em;
  }
  ol {
    list-style-position: inside;
  }
  li {
    margin-top: .5em;
    margin-bottom: .5em;
  }
</style>
<div class="p-4 text-black flex justify-center">
	<div class="max-w-3xl ">
    <h3 class="font-bold">About</h3>
    <p class="">
      Derivative-Works is an experiment in using machine learning to create image collages. The algorithm cuts out shapes from images and rearranges them to create a face.
    </p>
    <p>
      The popularity of generative ML and GAN’s have created an infinite abundance of textures. Derivative-Works thinks of these textures as ingredients and raw materials to reinvent, similar to the prior Dada use of magazines and print media. The arrangement of dozens of textures can become an approachable creative medium driven by the selection of images and objectives.
    </p>
    <h3 class="font-bold">Created By</h3>
    <p>
      <a href='https://www.joelsimon.net/' target='_blank'>Joel</a>
      &
      <a href='https://github.com/tals' target='_blank'>Tal</a>
    </p>
    
    <h3 class="font-semibold text-md">Source Materials</h3>
    <p>
      <!-- <span class="font-semibold">Source Materials:</span> -->
      All of the reference images are in the public domain, created in
      <a href="https://www.Artbreeder.com/" target="_blank">Artbreeder </a>
      using BigGAN and StyleGAN.
    </p>
    <h3 class="font-semibold text-md">
      Methods - <a class="font-semibold" href='https://github.com/tals/derivative-work' target='_blank'>source code</a>
    </h3>
    <ol class="list-decimal">
      <li>A patch generator (DCGAN) trained on Perlin noise was taken from a <a href="https://joelsimon.net/forms-of-life.html" target="_blank">previous project</a>. It creates a high diversity of shapes and is fully-differentiable.
      </li>
      <li>
        There are a fixed number of patches that each has a corresponding latent vector and transformation matrices. These transformations control where in the reference image the patch is cut from and where in the canvas it is placed.
      </li>
      <li>These variables are then optimized (using Adam) to do feature inversion over a face classifier (DLIB’s CNN model).
      </li>
    </ol>
    <p>
      The primary difference between this method and vanilla inversion
      is the input medium: instead of optimizing pixels directly, we optimize
       parameters. This simple technique lead to a variety of textures and
      compositions and the videos show the actual optimizations.</p>
    </div>
</div>