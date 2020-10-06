/*
 Our postcss configuration
 We mostly use this to generate a minimized version of our tailwind css for production

 To run use yarn build-css

*/

const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    purgecss({
      content: [
        "src/**/*.svelte",
        "public/*.html",
        "src/**/*.js",
        "src/**/*.ts",
      ],
      // extractor from:
      // https://github.com/tailwindcss/discuss/issues/254#issuecomment-517918397
      defaultExtractor: (content) => {
        const regExp = new RegExp(/[A-Za-z0-9-_:/\.]+/g);

        const matchedTokens = [];

        let match = regExp.exec(content);

        while (match) {
          if (match[0].startsWith("class:")) {
            matchedTokens.push(match[0].substring(6));
          } else {
            matchedTokens.push(match[0]);
          }

          match = regExp.exec(content);
        }

        return matchedTokens;
      },
    }),
    // ...
    require("cssnano")({
      preset: "default",
    }),
  ],
};
