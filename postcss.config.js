module.exports = {
  plugins: [
    require('precss')({ /* ...options */ }),
    require('autoprefixer')({ browsers: ['last 2 versions'] })
  ]
};
