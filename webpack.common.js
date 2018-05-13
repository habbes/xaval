const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /.txt$/,
                use: 'raw-loader'
            }
        ]
    },
    resolve: {
        alias: {
            '@': './src'
        },
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public')
    },
    plugins: [
        new HtmlPlugin({
            template: './src/ui/index.html'
        })
    ]
};