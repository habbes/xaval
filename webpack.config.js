const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: "production",
    devtool: 'inline-source-map',
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
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};