const path = require('path');

module.exports = {
    entry: {
        'client/js/bundle': './client/js/app.js',
        'plugins/pluginLoaderBundle': './plugins/pluginLoader.js',
        'client/elements/login-container/login-container-bundle': './client/elements/login-container/login-container.js',
        'client/elements/login-container/login-page/login-page-bundle': './client/elements/login-container/login-page/login-page.js',
        'client/elements/login-container/create-account-page/createAccountPageBundle': './client/elements/login-container/create-account-page/create-account-page.js'
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