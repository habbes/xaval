const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new UglifyJsPlugin({
            sourceMap: false,
            uglifyOptions: {
                toplevel: true,
                minimize: true,
                output: {
                    beautify: false,
                    indent_level: 1,
                    comments: false
                },
                unused: true,
                dead_code: true,
                mangle: true,
                compress: {
                    conditionals: true,
                    drop_debugger: true,
                    dead_code: true,
                    evaluate: true,
                    sequences: true,
                    booleans: true,
                    warnings: false
                }

            }
        })
    ]
});
