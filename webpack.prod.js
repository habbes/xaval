const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// TODO: npm install was not downloading this plugin, causing module not found errors
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [
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
            }),
            // new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});
