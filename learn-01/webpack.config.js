const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	// mode: 'production',
	mode: 'development',
	devtool: 'cheap-module-eval-source-map', // 快速定位错误，提高打包速度
	entry: {
		main: './src/index.js',
		sub: './src/index.js',
	},
	output: {
		publicPath: '/',
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		// rules: [{
		// 	test: /\.(png|jpg|gif)$/,
		// 	use: {
		// 		loader: 'file-loader',
		// 		options: {
		// 			name: '[name]_[hash].[ext]',
		// 			outputPath: 'images/'
		// 		}
		// 	},
		// }],
		rules: [{
			test: /\.(png|jpg|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10, // 优化图片
				},
			}
		},{
			test: /\.css$/,
			use: ['style-loader', {
				loader: 'css-loader',
				// options: {
				// 	modules: true,
				// },
			}],
		}],
	},
	plugins: [new HtmlWebpackPlugin({
		template: 'src/index.html',
	})],
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		open: true,
		proxy: {
			'./api': 'http*****'
		},
		port: 8080,
		compress: true,
		headers: {
			"X-Custom-Foo": "bar"
		}
	},
}