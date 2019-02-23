const { createConfig } = require('@rollup-umd/documentation');
module.exports = createConfig(undefined, {
  exampleMode: 'expand',
  usageMode: 'expand,'
});
