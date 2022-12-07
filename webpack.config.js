const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
require('dotenv').config()

module.exports = {
	entry: './src/index.js',
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.[contenthash].js',
		clean: true,
		publicPath: './',
	},

	resolve: {
		extensions: ['.js', '.jsx'],
		// alias: {
		// 	'@components': path.resolve(__dirname, 'src/components/'),
		// 	'@containers': path.resolve(__dirname, 'src/containers/'),
		// 	'@styles': path.resolve(__dirname, 'src/styles/'),
		// },
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
					},
				],
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
			filename: './index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'assets/[name].[contenthash].css',
		}),
		// new Dotenv(),
		new webpack.DefinePlugin({
			'process.env': {
				PAYPAL_CLIENT_ID: JSON.stringify(process.env.PAYPAL_CLIENT_ID),
				GOOGLE_API_KEY: JSON.stringify(process.env.GOOGLE_API_KEY),
			},
		}),
	],
}
