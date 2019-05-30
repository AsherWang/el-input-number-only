module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/el-input-number-only/'
    : '/',
  pages: {
    index: {
      entry: 'demo/main.js',
      // the source template
      template: 'demo/index.html',
      filename: 'index.html',
      title: 'Index Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
  },
};
