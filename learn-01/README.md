## Webpack的定义
本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

## 概念
1. Entry
2. Output
3. Loader
4. Plugin

## 1 Entry
入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

## 2 Output
output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。

## 3 Loader
loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。

1. 将目标文件移动到dist文件下
2. 返回相关文件地址

#### 图片打包


```
module: {
	rules: [{
		test: /\.(png|jpg|gif)$/, // 后缀匹配
		use: {
			loader: 'file-loader', // loader名
			options: {
				name: '[name].[ext]' // 自定义名字
			}
		},
	},{
	    test: /\.css$/,
		use: ['style-loader', {
			loader: 'css-loader',
			// options: {
			// 	modules: true,
			// },
		}],
	}]
}
```
* file-loader 将图片按规则打包在指定目录
* url-loader 可以将图片打包生成base64代码在js中，或者设置limit的值，选择打包至指定目录或者生成base64。

#### 样式打包
执行顺序从下到上，从右到左。
* css-loader 解析css文件
* style-loader 将css挂载至head中
* post-css 不同浏览器的样式兼容性扩展
* module设置为true表示样式隔离

## 4 Plugin

#### 1. HtmlWebpackPlugin
打包结束后，自动生成一个html文件，并把打包的js引入。

## 5 其他配置

#### SourceMap
选择一种 source map 格式来增强调试过程。不同的值会明显影响到构建(build)和重新构建(rebuild)的速度。

对于开发环境，使用合适的source-map能帮助快速定位错误和平衡打包速度。
对于生成环境，可不设置该选项，不实用source-map

#### devServer

```
devServer: {
	contentBase: path.join(__dirname, "dist"),  // 静态资源所在目录
	open: true, // 是否自动打开
	proxy: { // 接口配置代理
		'./api': 'http*****'
	},
	port: 8080, // 配置端口
	compress: true, // gzip压缩
	headers: { // 请求头添加属性
		"X-Custom-Foo": "bar"
	},
	hot: true // 热更新
},
```

