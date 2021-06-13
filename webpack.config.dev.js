const path = require('path');
const webpack = require('webpack');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    devServer: {
        contentBase: './dist',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
          }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: require.resolve('ts-loader'),
                    options: {
                        getCustomTransformers: () => ({
                            before: [ReactRefreshTypeScript()],
                        }),
                    }
                },
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin()
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            "react": "preact/compat",
            "react-dom/test-utils": "preact/test-utils",
            "react-dom": "preact/compat",
        }
    },
    output: {
        filename: 'weasley-card.js',
        path: path.resolve(__dirname, 'dist'),
    },
};