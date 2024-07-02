import nodeExternals from 'webpack-node-externals';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: '../index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
                exclude: /node_modules/,
            },
        ],
    },
    target: 'node',
    externalsPresets: {
        node: true,
    },
    externals: [nodeExternals()],
};
