const path = require('path')
// const webpack = require('webpack') // Unneeded
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const HTMLWebpackPlugin = require('html-webpack-plugin')




module.exports = {
    entry: {
        'src/elements/main-app/main-app-bundle.js': './src/elements/main-app/main-app.js',
        'plugins/pluginLoaderBundle.js': './plugins/pluginLoader.js',
        'src/elements/login-screen/login-screen-bundle.js': './src/elements/login-screen/login-screen.js',
        'src/elements/login-screen/login-page/login-page-bundle.js': './src/elements/login-screen/login-page/login-page.js',
        'src/elements/login-screen/create-account-page/create-account-page-bundle.js': './src/elements/login-screen/create-account-page/create-account-page.js',
        'src/elements/login-screen/login-handler/login-handler-bundle.js' : './src/elements/login-screen/login-handler/login-handler.js',
        'plugins/core/main.js': './plugins/core/main-src.js', // Should have it's own webpack (eerrrhhhmmm rollup) config the itself
        'plugins/airdrop/airdrop-app-bundle.js': './plugins/airdrop/airdrop-app.js' // Should have it's own webpack (eerrrhhhmmm rollup) config the itself
    },
    output: {
        path: path.resolve(__dirname),
        filename: '[name]'
    },
    plugins: [
        new UglifyJsPlugin()
    ], 
    // optimization: {
    //     // Not working, might need to try import the modules asmCrypto modules from their individual files. ick
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 name: "src/elements/common-scripts/common-scripts-bundle.js",
    //                 chunks: "initial",
    //                 minChunks: 1
    //             }
    //         }
    //     }
    // }
};