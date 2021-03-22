const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './example/index.ts',
    output: {
        filename: 'jude.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            filename: 'index.html'
        }),
    ],
    devServer: {
        hot: true,
        open: true,
        contentBase: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    resolve: {
        modules: [
            'src',
            'node_modules'
        ],
        extensions: [
            '.js',
            '.ts'
        ],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            '@': path.resolve(__dirname, '../src'),
        }
    },

    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ],
                exclude: /(?:node_modules)/,
            }
        ]
    }
};