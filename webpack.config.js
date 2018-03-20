const path = require('path');

module.exports = {
    entry: './client/js/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'client/js')
    }
};