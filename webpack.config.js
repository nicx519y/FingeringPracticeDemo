const path = require('path');

module.exports = {
    entry: path.join(__dirname,'./src/index.ts'),
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    performance: {
        hints: false
    },
    devServer: {
        static: './dist',
        proxy: [
            {
                host: 'localhost',
                port: '8080',
            },
        ],
    },
};