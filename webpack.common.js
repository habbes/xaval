const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.ts',
        "editor.worker": 'monaco-editor/esm/vs/editor/editor.worker.js',
        "ts.worker": 'monaco-editor/esm/vs/language/typescript/ts.worker'
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
            '@': path.resolve(__dirname, 'src')
        },
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        // filename: 'app.js',
        globalObject: 'self',
        filename: '[name].js',
        path: path.resolve(__dirname, 'public')
    },
    plugins: [
        new webpack.IgnorePlugin(/^((fs)|(path)|(os)|(crypto)|(source-map-support))$/, /vs(\/|\\)language(\/|\\)typescript(\/|\\)lib/),
        new HtmlPlugin({
            template: './src/ui/index.html'
        }),
        // TODO: enable this when using monaco
        // new MonacoWebpackPlugin({
        //     languages: ['typescript'],
        // })
    ]
};