const autoprefixer = require("autoprefixer");
const cssnanoPlugin = require("cssnano");
module.exports = {
  plugins: [
    autoprefixer,
    cssnanoPlugin({preset: 'default'})
  ]
}
