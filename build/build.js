var adm_zip = require('adm-zip')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

webpack(webpackConfig, function (err, stats) {
  var zip = new adm_zip()  
  zip.addLocalFolder('dist')
  zip.writeZip('index.zip')
})
