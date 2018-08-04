const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    entry: {
        app: './src/index.ts'
    },
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
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /.txt$/,
                use: 'raw-loader'
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: 'file-loader'
            }
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public')
    },
    plugins: [
        new webpack.IgnorePlugin(/^((fs)|(path)|(os)|(crypto)|(source-map-support))$/, /vs(\/|\\)language(\/|\\)typescript(\/|\\)lib/),
        new HtmlPlugin({
            template: './src/ui/index.html'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        // TODO: enable this when using monaco
        new MonacoWebpackPlugin({
            languages: ['typescript'],
            features: [
                'coreCommands', 'findController', 'ipadShowKeyboard',
                'parameterHints', 'hover', 'suggest',
                'inspectTokens', 'comment', 'contextmenu'
            ]
        })
    ]
};