## Webpack

### webpack和grunt、gulp有什么不同？

webpack是一个模块打包工具，可以**递归**的打包项目中的所有模块，最终生成一个打包文件，他和其他工具最大的不同在于他可以支持代码分割，模块化和全局分析。

### 什么是loader，什么是plugins

loader：可以将某一类型的文件进行转换，并且引入到打包出的文件。
plugins（插件）：可以打包优化，资源管理，注入环境变量。

#### 几个常用的loader：

1. babel-loader： 让下一代的js文件转换成现代浏览器能够支持的JS文件。
   babel有些复杂，所以大多数都会新建一个`.babelrc`进行配置
2. css-loader,style-loader:两个建议配合使用，用来解析css文件，能够解释`@import,url()`如果需要解析less就在后面加一个less-loader,sass等同理
3. file-loader: 生成的文件名就是文件内容的`MD5`哈希值并会保留所引用资源的原始扩展名
4. url-loader: 功能类似 file-loader,但是文件大小低于指定的限制时，可以返回一个`DataURL`。

#### 有哪些常见的Plugin？

- define-plugin：定义环境变量
- html-webpack-plugin：简化html文件创建
- uglifyjs-webpack-plugin：通过`UglifyES`压缩`ES6`代码
- webpack-parallel-uglify-plugin: 多核压缩,提高压缩速度
- webpack-bundle-analyzer: 可视化webpack输出文件的体积
- mini-css-extract-plugin: CSS提取到单独的文件中,支持按需加载

### 什么是module，什么是Chunk，什么是bundle

module：开发过程中每一个依赖的模块
chunk：webpack进行依赖分析时、代码分割出来的代码块
bundle：打包出来的文件

### Webpack功能原理（🔥）

- 代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等等
- 文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等
- 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载
- 模块合并：在采用模块化的项目有很多模块和文件，需要构建功能把模块分类合并成一个文件
- 自动刷新：监听本地源代码的变化，自动构建，刷新浏览器
- 代码校验：在代码被提交到仓库前需要检测代码是否符合规范，以及单元测试是否通过
- 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。

### webpack构建过程（🔥）

- 从entry配置中递归解析出依赖的所有module
- 每一个module都调用对应的loader转换规则
- module转换完后，就解析当前module依赖的其他module，
- 这些模块按entry为单位分组，每一个entry和其依赖的所有module分到一个组chunk
- webpack将chunk转换为文件输出
- 整个过程中webpack会在合适的时机执行plugins（打包优化，资源管理，注入环境变量等）

输出的js中：vendor则是通过提取公共模块插件来提取的代码块（webpack本身带的模块化代码部分），而manifest则是在vendor的基础上，再抽取出要经常变动的部分，比如关于异步加载js模块部分的内容。

### webpack配置多页面（修改入口和输出）

```js
//多入口配置
// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
// 那么就作为入口处理
exports.entries = function () {
  var entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
  var map = {}
  entryFiles.forEach((filePath) => {
      var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
      map[filename] = filePath
  })
  return map
}

//多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中
exports.htmlPlugin = function () {
  let entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
  let arr = []
  entryHtml.forEach((filePath) => {
      let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
      let conf = {
          // 模板来源
          template: filePath,
          // 文件名称
          filename: filename + '.html',
          // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
          chunks: ['manifest', 'vendor', filename],
          inject: true
      }
      if (process.env.NODE_ENV === 'production') {
          conf = merge(conf, {
              minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeAttributeQuotes: true
              },
              chunksSortMode: 'dependency'
          })
      }
      arr.push(new HtmlWebpackPlugin(conf))
  })
  return arr
}
```

