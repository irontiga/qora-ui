const path = require('path');

module.exports = {
    entry: {
        'src/elements/main-app/main-app-bundle.js': './src/elements/main-app/main-app.js',
        'plugins/pluginLoaderBundle.js': './plugins/pluginLoader.js',
        'src/elements/login-screen/login-screen-bundle.js': './src/elements/login-screen/login-screen.js',
        'src/elements/login-screen/login-page/login-page-bundle.js': './src/elements/login-screen/login-page/login-page.js',
        'src/elements/login-screen/create-account-page/create-account-page-bundle.js': './src/elements/login-screen/create-account-page/create-account-page.js'
    },
    output: {
        path: path.resolve(__dirname),
        filename: '[name]'
    }



    //    entry: './client/js/app.js',
    //    output: {
    //        filename: 'bundle.js',
    //        path: path.resolve(__dirname, 'client/js')
    //    }
};