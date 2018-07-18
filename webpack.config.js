let path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry:  path.resolve(__dirname)+ '/views/index.js',
    target: 'web',
    output: {
        path: path.resolve(__dirname) + '/dist/',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: { 
                loader: 'babel-loader',
                options: {
                    
                    presets: ['env','react']

                    }                    }
            },

             { 
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(gif|png|jpe?g|svg)/i,
                use: [
                    "file-loader",
                    {
                        loader: "image-webpack-loader",
                        options: {
                        }
                    }
                ]
            }

        ]
    },
     devServer: {
    openPage: 'home.html',
    contentBase: path.join(__dirname,'views/'),
    open: true,
    watchContentBase: true,
    proxy: {
       '/user' : {
          target: 'http://localhost:3000',
          secure: false,
onProxyReq: function(proxyReq, req, res){
                //proxyReq.headers = req.headers;
            },
onProxyRes: function(proxyRes, req, res){
                //res.headers = proxyRes.headers;
            }
       }
        },
        
    port: 8000,
    overlay:{ 
        warnings: true,
        errors: true } 
   },
};

