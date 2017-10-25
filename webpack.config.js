const glob = require('glob');
const page_directories = glob.sync('./examples/*/webpack.config.js');

module.exports = page_directories.map((p) => require(p));
