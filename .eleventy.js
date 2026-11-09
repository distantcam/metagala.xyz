const fs = require("fs");

module.exports = function(eleventyConfig) {

  if (process.env.ELEVENTY_PRODUCTION) {
    eleventyConfig.addTransform("htmlmin", htmlminTransform);
  }

  // Passthrough
  eleventyConfig.addPassthroughCopy({ "src/static": "." });

  // Watch targets
  eleventyConfig.addWatchTarget("./src/styles/");

  var pathPrefix = "";
  if (process.env.GITHUB_REPOSITORY) {
    pathPrefix = process.env.GITHUB_REPOSITORY.split('/')[1];
  }

  return {
    dir: {
      input: "src"
    },
    pathPrefix
  }
};

async function htmlminTransform(content, outputPath) {
  if( outputPath.endsWith(".html") ) {
    const { minify } = await import("html-minifier");
    return await minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true
    });
  }
  return content;
}
