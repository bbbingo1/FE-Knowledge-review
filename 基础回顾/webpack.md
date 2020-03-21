## Webpack

### webpack和grunt、gulp有什么不同？

webpack是一个模块打包工具，可以**递归**的打包项目中的所有模块，最终生成一个打包文件，他和其他工具最大的不同在于他可以支持代码分割，模块化和全局分析。

### webpack-dev-server和http服务器如nginx有什么区别

webpack-dev-server使用内存来存储webpack开发环境下的打包文件，并且可以使用模块热更新，开发时比传统的http服务更简单高效。

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

- html-webpack-plugin：依据一个简单的index.html模版，生成一个自动引用你打包后的js文件的新index.html 

- uglifyjs-webpack-plugin：通过`UglifyES`压缩`ES6`代码

- HotModuleReplacementPlugin 

  模块热替换，代码更改浏览器自动刷新。但是要注意，永远不要再生产环境使用HotModuleReplacementPlugin。

  HMR的核心点有两个：

  > 1. 如何在服务端文件变化之后通知客户端？使用socket
  > 2. 如何判断文件是否发生变化？客户端和服务端都保存chunk，比较是否发生变化

- webpack-parallel-uglify-plugin: 多核压缩,提高压缩速度

- webpack-bundle-analyzer: 可视化webpack输出文件的体积

- mini-css-extract-plugin: CSS提取到单独的文件中,支持按需加载

#### 手写loader

```js
// test: 匹配所处理文件的扩展名的正则表达式（必须）
// loader: loader的名称（必须）（需要使用npm安装）
// include/exclude: 手动添加处理的文件，屏蔽不需要处理的文件（可选）
// query: 为loaders提供额外的设置选项
// eg: 
var baseConfig = {
  // ...
  module: {
    rules: [
      {
        test: /*匹配文件后缀名的正则*/,
        use: [
          loader: /*loader名字*/,
          query: /*额外配置*/
        ]
  		}
 		]
	}
}

// ex:
var baseConfig = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./build')
  },
  devServer: {
    contentBase: './src',
    historyApiFallBack: true,
    inline: true
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'less-loader'}
        ],
        exclude: /node_modules/
      }
    ]
  }
}
```



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

### webpack配置多页面（修改入口和输出）（🔥）

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

### 什么是模块热更新

代码修改后不用刷新浏览器就可以更新，是高级的自动刷新浏览器。

```js
// webpack.config.js
devServer:{
  // inline: true // 实时刷新；这里使用HotModuleReplacementPlugin(),不用还不成熟的inline
  // hot: true, // 热更新 // 同HotModuleReplacementPlugin()；
},
plugins: [
  new webpack.HotModuleReplacementPlugin(),
	// 显示被替换模块的名称
  new webpack.NamedModulesPlugin(), // HMR shows correct file names
]

```

## webpack优化（🔥）

### 缩小文件的搜索范围

1. resolve告诉webpack去哪里搜索文件

   1. 设置`resolve.modules:[path.resolve(__dirname, 'node_modules')]`避免层层查找。

      `resolve.modules`告诉webpack去哪些目录下寻找第三方模块，默认值为`['node_modules']`，会依次查找./node_modules、../node_modules、../../node_modules。

   2. 对庞大的第三方模块设置`resolve.alias`, 使webpack直接使用库的min文件，避免库内解析

      如对于react：

      ```js
      resolve.alias:{
      	'react':patch.resolve(__dirname, './node_modules/react/dist/react.min.js')
      }
      ```

      这样会影响Tree-Shaking，适合对整体性比较强的库使用，如果是像lodash这类工具类的比较分散的库，比较适合Tree-Shaking，避免使用这种方式。

   3. 合理配置`resolve.extensions`，减少文件查找

      默认值：`extensions:['.js', '.json']`,当导入语句没带文件后缀时，Webpack会根据extensions定义的后缀列表进行文件查找，所以：

      - 列表值尽量少
      - 频率高的文件类型的后缀写在前面
      - 源码中的导入语句尽可能的写上文件后缀，如`require(./data)`要写成`require(./data.json)`

2. **配置loader时，通过test、exclude、include缩小搜索范围**

### 压缩文件输出体积

1. 根据环境判断输出的代码，**减少生产环境代码体积**
   **通过`DefinePlugin`插件可以区分环境**

   ```js
   const DefinePlugin = require('webpack/lib/DefinePlugin');
   //...
   plugins:[
       new DefinePlugin({
           'process.env': {
               NODE_ENV: JSON.stringify('production')
           }
       })
   ]
   ```

   注意，`JSON.stringify('production')` 的原因是，环境变量值需要一个双引号包裹的字符串，而stringify后的值是`'"production"'`

   然后就可以在源码中使用定义的环境：

   ```js
   if(process.env.NODE_ENV === 'production'){
       console.log('你在生产环境')
       doSth();
   }else{
       console.log('你在开发环境')
       doSthElse();
   }
   ```

   当代码中使用了process时，**Webpack会自动打包进process模块的代码以支持非Node.js的运行环境**，这个模块的作用是模拟Node.js中的process，以支持`process.env.NODE_ENV === 'production'` 语句。


   

2. 压缩JS、CSS、ES6代码

   1. **压缩JS：`parallelUglifyPlugin`**
   2. **压缩ES6：`uglify-webpack-plugin`**
      由于浏览器越来越多的支持ES6，可以通过在.babelrc中去掉babel-preset-env来防止babel-loader转换ES6代码
   3. **压缩CSS：`css-loader?minimize` `PurifyCSSPlugin`**
      其中，css-loader内置了cssnano，可以删除多余空格，只需要使用`css-loader?minimize`就可以压缩
      而**PurifyCSSPlugin**也可以去除没用到的css代码，类似JS的Tree Shaking

   eg:

   ```js
   const UglifyJSPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
   //...
   plugins: [
       new UglifyJSPlugin({
           compress: {
               warnings: false,  //删除无用代码时不输出警告
               drop_console: true,  //删除所有console语句，可以兼容IE
               collapse_vars: true,  //内嵌已定义但只使用一次的变量
               reduce_vars: true,  //提取使用多次但没定义的静态值到变量
           },
           output: {
               beautify: false, //最紧凑的输出，不保留空格和制表符
               comments: false, //删除所有注释
           }
       })
   ]
   ```

3. **使用Tree Shaking剔除JS死代码**

   他需要依赖ES6的import、export的模块化语法，所以**它正常工作的前提是代码必须采用ES6的模块化语法**

   **启用Tree Shaking：**

   1. 修改.babelrc以保留ES6模块化语句：

      ```js
      {
          "presets": [
              [
                  "env", 
                  { "module": false },   //关闭Babel的模块转换功能，保留ES6模块化语法
              ]
          ]
      }
      ```

   2. 通过uglifysPlugin来Tree-shaking JS。

      ```js
      var baseConfig = {
      // ...
       new webpack.optimize.OccurenceOrderPlugin() // 为组件分配ID,通过这个插件webpack可以分析和优先考虑使用最多的模块，然后为他们分配最小的ID
       new webpack.optimize.UglifyJsPlugin() // 然后在我们使用npm run build会发现代码是压缩的
      }
      ```

### 优化输出质量

1. 提取页面间公共代码
   通过提取页面间的公共代码，把公共代码提取到一个文件，防止各个chumk都包含有公共代码，这样当用户访问一个网页时，加载了公共文件，再访问其他页面时就可以直接使用文件的缓存。

   1. 应用方法：**使用`CommonsChunkPlugin`**

      ```js
      const CommonChunkPlugin = require('webpack/lib/optimize/')
      // ...
      plugins:[
        new CommonsChunkPlugin({
          chunks:['a','b'], // 从哪些chunk中提取
          name:'common', // 提取的公共部分形成一个新的chunk
        })
      ]
      ```

   2. 再找出依赖的基础库，写一个base.js文件，再和common,js提取公共代码到base中，这样，common.js就剔除了基础库代码，而base.js保持不变。

      ```js
      //base.js
      import 'react';
      import 'react-dom';
      import './base.css';
      //webpack.config.json
      entry:{
          base: './base.js'
      },
      plugins:[
          new CommonsChunkPlugin({
              chunks:['base','common'],
              name:'base',
              //minChunks:2, 表示文件要被提取出来需要在指定的chunks中出现的最小次数，防止common.js中没有代码的情况
          })        
      ]
      ```

      

   