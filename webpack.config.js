const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'eval-cheap-source-map',
    // https://github.com/webpack/webpack-dev-server/issues/2758#issuecomment-710086019
    target: isProduction ? 'browserslist' : 'web',
    entry: {
        main: './src/main/entrypoint.ts',
    },
    output: {
        filename: '[name].js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.runtime.esm-bundler.js',
            // '@': __dirname,
        },
        extensions: ['.tsx', '.ts', '.js', '.vue'],
    },
    module: {
        rules: [
            {
                test: /\.(png|svg)$/,
                type: 'asset/resource'
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {}
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    'postcss-loader',
                ]
            }
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        hot: true,
        disableHostCheck: true,
        writeToDisk: true,
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin(),
        new HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/main/index.html',
        }),
        new CopyPlugin({
            patterns: [
                { from: './static' },
            ],
        }),
    ]
};
