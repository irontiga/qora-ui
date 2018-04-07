const path = require('path');

module.exports = {
    entry: {
        'client/js/bundle': './client/js/app.js',
        'plugins/pluginLoaderBundle': './plugins/pluginLoader.js'
    },
    output: {
        path: path.resolve(__dirname),
        filename: '[name].js'
    }
    
    
    
//    entry: './client/js/app.js',
//    output: {
//        filename: 'bundle.js',
//        path: path.resolve(__dirname, 'client/js')
//    }
};