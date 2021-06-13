const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
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