var adm_zip = require('adm-zip')
var webpack = require('webpack')
var webpackConfig = require('./webpack.config')

webpack(webpackConfig, function (err) {
  if (err) { console.log(err) }
  var zip = new adm_zip()  
  zip.addLocalFolder('dist')
  zip.writeZip('index.zip')
})
