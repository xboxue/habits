module.exports = function(api) {
  api.cache(true);
  return {
    plugins: ["babel-plugin-transform-typescript-metadata"],
    presets: ["babel-preset-expo"]
  };
};
