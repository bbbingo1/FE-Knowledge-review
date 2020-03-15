# SSR 服务端渲染

> 将组件或页面通过服务器生成html字符串，再发送到浏览器，简单理解下来，发了一个请求，服务器返回的不是接口数据，而是一整个页面的HTML结构，再结合界面之前定义的CSS把页面展示出来；[VUE 服务器渲染文档](https://cn.vuejs.org/v2/guide/ssr.html)

## SSR 原理

### 服务端渲染能够解决两大问题：

1. **seo问题**，有利于搜索引擎蜘蛛抓取网站内容，利于网站的收录和排名。（–因为访问一个请求，返回的就是页面全部的HTML结构，包含所需要呈现的所有数据，于是例如搜索引擎或者爬虫的数据抓取）
   - 目前使用MV*架构的项目，大都是前后端分离，数据都是动态生成，不利于SEO优化

2. **首屏加载过慢问题**，例如现在成熟的SPA项目中，打开首页需要加载很多资源，通过服务端渲染可以加速首屏渲染。（-首屏的页面加载来自于服务器，不依赖与服务端的接口请求再数据处理）

### SSR缺点

- **性能依赖于服务器**
- 前端界面开发可操作性不高，额需要外很多的配置
- 有些**生命周期钩子无法使用（ `activated` 和 `deactivated` 等等）**

似乎服务器直出也**并一定需要node**。但假如main模块含有一个列表模块c，服务器端首先生成十条记录，浏览器端需要加载更多的话，再从后端拉取数据动态生成。这时候就涉及到View层的前后端代码复用，node因为用js写的，天生就适合用来做服务器直出。



<img src="https://i.loli.net/2020/03/15/no3uapSezZQ7y2P.png" style="zoom: 67%;" />

从图看出三点内容：

1. node 服务端和客户端共用同一套业务代码
2. 通过暴露客户端和服务端两个入口，对 Vue 实例进行访问
3. 通过构建工具打包程服务包和客户包，再由 node 服务器渲染给浏览器访问。客户端和原来一样访问资源获取

### 使用ssr

#### 第一步：安装依赖

- vue-server-renderer （核心依赖，版本必须与 vue 版本一致）
- webpack-merge（用于webpack配置合并）
- webpack-node-externals （用于webpack配置更改）
- express (用于服务端渲染)

#### 第二步：建立入口，并改造改造

分为 `2` 个入口，将 `main.js` 定为通用入口， 并额外增加`entry-client.js` 和 `entry-serve.js` 两个

1.改造主要入口，创建工厂函数

```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from "./router"
// app、router
export function createApp () {
  const router = createRouter()
  const app = new Vue({
    router,
    render: h => h(App)
  })
  return { app, router }
}
```

2.客户端入口

```js
// client.js
import { createApp } from './main'
// 客户端特定引导逻辑
const { app } = createApp()
app.$mount('#app')
```

3.服务端入口

```js
// serve.js
import { createApp } from "./main";
export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise
  return new Promise((resolve, reject) => {
    const { app, router } = createApp();
    // 设置服务器端 router 的位置
    router.push(context.url);
    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      // 匹配不到的路由，执行 reject 函数
      if (!matchedComponents.length) {
        return reject({
          code: 404
        });
      }
      // Promise 应该 resolve 应用程序实例，以便它可以渲染
      resolve(app);
    }, reject);
  });
};
```

#### 第三步：改造 vue.config 配置

```js
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const nodeExternals = require("webpack-node-externals");
const merge = require("webpack-merge");
const TARGET_NODE = process.env.WEBPACK_TARGET === "node";
const target = TARGET_NODE ? "server" : "client";
module.exports = {
  configureWebpack: () => ({
    entry: `./src/entry-${target}.js`,
    devtool: 'source-map',
    target: TARGET_NODE ? "node" : "web",
    node: TARGET_NODE ? undefined : false,
    output: {
      libraryTarget: TARGET_NODE ? "commonjs2" : undefined
    },
    externals: TARGET_NODE
      ? nodeExternals({
          whitelist: [/\.css$/]
        })
      : undefined,
    optimization: {
          splitChunks: undefined
    },
    plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()]
  }),
  //...
};
```

#### 第四步：对路由 router 改造

```js
exportfunction createRouter(){
  returnnew Router({
    mode: 'history',
    routes: [
    //...
    ]
  })
}
```

#### 第五步：使用 express 运行服务端代码

这一步主要是让 node 服务端响应 HTML 给浏览器访问

```js
const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()
server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })
  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `)
  })
})
server.listen(8080)
```

### 使用 nuxt 

简单几步体验下 nuxt

#### 安装后

![img](https://user-gold-cdn.xitu.io/2020/3/11/170c7cbe963be44c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1) 简单看了一下源码，nuxt 把我们之前提到的重要的改造，全部封装到 `.nuxt` 文件夹里面了

![img](https://user-gold-cdn.xitu.io/2020/3/11/170c7cc50e09b590?imageView2/0/w/1280/h/960/format/webp/ignore-error/1) 跑一下 dev 发现有两个端，一个 clinet 端，一个 server 端

![img](https://user-gold-cdn.xitu.io/2020/3/11/170c7cc93fe6230b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

最后查看一下效果，整个过程挺丝滑的。目录结构也比较符合我的风格，新项目需要 SSR 会考虑使用 nuxt



## 服务器端渲染 vs 预渲染 (SSR vs Prerendering)

如果你调研服务器端渲染 (SSR) 只是用来改善少数营销页面（例如 `/`, `/about`, `/contact` 等）的 SEO，那么你可能需要**预渲染**。无需使用 **web 服务器实时动态编译 HTML**，而是使用预渲染方式，**在构建时 (build time) 简单地生成针对特定路由的静态 HTML 文件**。优点是设置预渲染更简单，并可以将你的前端作为一个完全静态的站点。

如果你使用 webpack，你可以使用 [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin) 轻松地添加预渲染。

以下情况下不可以使用预渲染：

- User-specific content、
  - **不同的用户看都会不同的页面**，这种类型的页面不适用预渲染
- Frequently changing Content
  - **对于一些经常发生变化的页面，如体育比赛等，会导致编译后的数据不是实时更新的**
- Thousands of routers
  - 不适用于**路由太多的页面**，会导致**构建build的过程，等待的时间超长**

### 使用 prerender-spa-plugin 插件进行简单预渲染

1. 下载依赖：

   ```node
   npm install prerender-spa-plugin
   ```

2. Webpack简单配置

   ```js
   // webpack.conf.js
   var path = require('path')
   var PrerenderSpaPlugin = require('prerender-spa-plugin')
    
   module.exports = {
     // ...
     plugins: [
       new PrerenderSpaPlugin(
         // Absolute path to compiled SPA
         path.join(__dirname, '../dist'),
         // List of routes to prerender
         [ '/', '/about', '/contact' ]
       )
     ]
   }
   ```

   - 打包完成后，你会发现原来的`dist`目录下，多出来`about`,`contact`这样的目录，这个目录下会有对应的`index.html`文件；这份文件是对应路由生产后的静态页面，便于SEO

   ```
   curl xxxx.com
   // 会将渲染后的页面返回，而不是刚开始的之后简单的js引用的初始页面
   ```

   - 如果需要配置路由的访问， 还需要配置`Apache`或`Nginx`等访问，匹配相应的路由访问导指定目录下index.html文件，即可。

   ```
   // 配置完成后，可以查看效果,每个页面返回的都是编译后的静态文件
   curl xxxx.com/about
   curl xxx.com/contact
   ```