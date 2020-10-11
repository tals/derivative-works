<style>
  a {
    text-decoration: underline;
  }
  p {
    margin-bottom: 1em;
  }
</style>

<svelte:head>
  <title>About</title>
</svelte:head>
<div class="p-4 text-black ">
  <div class="max-w-3xl ">
    <p>
      Derivative-Works is an experiment in using machine learning to create
      image collages.
    </p>
    <p />
    <div>
      <span>
        We wanted to see how a simple "agent" (vanilla Adam optimizer) will cut
        up and match textures and shapes when trying to achieve its goal:
      </span><span class="font-semibold">creating a face</span>
    </div>

    <p class="mt-8">
      Created by
      <a href="https://www.joelsimon.net/" target="_blank">Joel</a>
      &
      <a href="https://twitter.com/eiopa" target="_blank">Tal</a>
    </p>
    <p>
      Code is
      <a
        href="https://github.com/tals/derivative-works"
        target="_blank">available here</a>
    </p>

    <h2 class="font-semibold text-lg mt-8">Source Material</h2>
    <p>
      All the images are in public domain, created in
      <a href="https://www.Artbreeder.com/" target="_blank">Artbreeder </a>
      using BigGAN and StyleGAN.
    </p>

    <h2 class="font-semibold text-lg mt-8">Generating Patches</h2>
    <div>
      We happened to have had a pretty decent patch generator (vanilla DCGAN)
      from
      <a href="https://joelsimon.net/forms-of-life.html">a previous project</a>,
      researching optimization techniques on
      <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Game of
        Life</a>.
      <br />
      <br />
      <div>
        To our surprise, this worked well - it is fully-differentiable and had a
        great variety of shapes
      </div>
    </div>

    <h2 class="font-semibold text-lg mt-8">Optimization</h2>
    <div class="whitespace-pre-line">
    For every patch we have, we keep a variable for Z (which gets decoded to a 2d mask), rotation, translation and scale.

    We take 20 such patches per image, and have between 2-5 images per exhibit.

    These variables are then taken as a whole, and optimized (using Adam) to do feature inversion over a face classifier (DLIB’s CNN model).

    The primary difference between this method and vanilla inversion
    is the input medium: instead of optimizing pixels directly, we optimize
    collage collage parameters


    To our surprise, this simple technique lead to a variety of textures and
    compositions.

    The videos on the website show the actual optimization.
    </div>
</div>

</div>