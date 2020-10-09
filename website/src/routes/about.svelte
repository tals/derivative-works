<svelte:head>
  <title>About</title>
</svelte:head>
<style>
  a {
    text-decoration: underline;
  }
  p {
    margin-bottom: 1em;
  }
</style>
<div class="p-4 text-black flex justify-center">
	<div class="max-w-3xl ">
    <p class="text-right">
      Derivative-Works is an experiment in using machine learning to create image collages.
      Reference images are given to the algorithm which cuts out and rearranges patches to optimize an objective.  Here, the references are public domain images created in 
      <a href='https://www.Artbreeder.com/' target='_blank'>Artbreeder </a>
      using BigGan and optimized to satisfy a neural network that detects faces. Each run produces a new and distinct face. 
    </p>
    <p>
      The popularity of generative ML and GAN’s have created an infinite abundance of textures. Derivative-Works thinks of these textures as ingredients and raw materials to reinvent, similar to the prior Dada use of magazines and print media. The arrangement of dozens of textures can become an approachable creative medium driven by the selection of images and objectives.
    </p>
    <p>
      A patch generator GAN was first trained on layered Perlin noise to be able to create arbitrary shapes. Each collage is represented by a series of patch latents and transformation matrices for those patches. These variables are then optimized to do feature inversion over a face classifier (DLIB’s CNN model) by doing gradient descent on the classifier features.
    The primary difference between this method and vanilla inversion is the input medium: instead of optimizing pixels directly, we optimize collage collage parameters, leading to a variety of textures and compositions. The videos on the website show the actual optimization.
    </p>
    <p>
      Created by
      <a href='https://www.joelsimon.net/' target='_blank'>Joel</a>
      &
      <a href='https://github.com/tals' target='_blank'>Tal</a>
    </p>
    <p>Code is <a href='https://github.com/tals/derivative-work' target='_blank'>available here</a> </p>
    </div>
</div>
