const {merge} = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const path = require('path');

const localProxy = {
    target: {
        host: 'localhost',
        protocol: 'http:',
        port: 8081
    },
    // ignorePath: false,
    changeOrigin: true,
    secure: false,
};

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        static: [
            {
                directory: path.join(__dirname, 'public'),
                watch: false,
            },
            {
                directory: path.join(__dirname),
                watch: false,
            }
        ],
        hot: true,
        proxy: {
            '/api': {...localProxy},
            '/images/': {...localProxy},
            '/timeclock/': {...localProxy},
            '/pdf/': {...localProxy},
            '/files/': {...localProxy},
            '/node_modules/': {...localProxy},
            '/node-chums/': {...localProxy},
            '/node-dev/': {...localProxy},
            '/node-sage/': {...localProxy},
            '/sage/': {...localProxy},
            '/version': {...localProxy},
        }
    },
    devtool: 'eval-source-map',
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
    ]
});
