const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "main.css" })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.s?css$/,
                use: [
                  'style-loader',
                  MiniCssExtractPlugin.loader,
                  'css-loader',
//                  'postcss-loader',
//                  'sass-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|jpg)(\?[a-z0-9=.]+)?$/,
                use: [
                    {
                        loader: 'url-loader'
                    },
                ]
            },
        ]
    }
}