let path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry:  {
        index: path.resolve(__dirname)+ '/frontend/views/home/index.js',
        reset: path.resolve(__dirname)+ '/frontend/views/reset/reset.js'
        },
    target: 'web',
    output: {filename: '[name].bundle.js', path: path.resolve(__dirname) + '/dist/'},
    
    //LOADERS
    module: {
        rules: [
          { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: 'babel-loader' },
          { test: /\.s?css$/, loader: 'style-loader!css-loader!sass-loader' },
          { test: /\.(gif|png|jpe?g|svg)/i, use: [ "file-loader", { loader: "image-webpack-loader"}] }
        ]
    },

    //DEV-SERVER
    devServer: {
      publicPath: '/dist/',
        openPage: 'views/home/home.html',
        contentBase: path.join(__dirname,'frontend/'),
        open: true,
        watchContentBase: true,
        port: 8000,
        overlay:{ 
        warnings: true,
        errors: true },
        proxy: [{
            context: ['/user','/event','/message'],
            target: 'http://localhost:3000',
            secure: false,
        onProxyReq: function(proxyReq, req, res){
                  //proxyReq.headers = req.headers;
            },
        onProxyRes: function(proxyRes, req, res){
                //res.headers = proxyRes.headers;
            }
          }]
   }
}

