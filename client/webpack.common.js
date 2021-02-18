const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	entry: {
		app: './src/main.js',
		vendor: [
			'vue',
			'vue-router',
			'element-ui',
			'element-ui/lib/theme-chalk/index.css',
			'axios',
			'dayjs',
			'v-calendar',
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		// new CleanWebpackPlugin(),
		new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
		}),
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				/* 				common: {
					name: 'vendor',
					chunks: 'initial',
					minChunks: 2,
				}, */
				defaultVendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					reuseExistingChunk: true,
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
			},
		},
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve('../sanguosha_server/', 'views'),
		publicPath: './',
	},
	resolve: {
		alias: { '@': path.resolve(__dirname, 'src') },
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
				use: ['url-loader'],
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: ['url-loader'],
			},
		],
	},
}
