# html

### 有哪些常用的meta标签？

meta标签由name和content两个属性来定义，来描述一个HTML网页文档的`元信息`，例如作者、日期和时间、网页描述、关键词、页面刷新等，除了一些http标准规定了一些name作为大家使用的共识，开发者也可以自定义name。

- **charset**，用于描述HTML文档的编码形式

```html
 <meta charset="UTF-8" >
```

- **http-equiv**，顾名思义，相当于http的文件头作用,比如下面的代码就可以设置http的缓存过期日期

```html
<meta http-equiv="expires" content="Wed, 20 Jun 2019 22:33:00 GMT">
```

- **viewport**，移动前端最熟悉不过，Web开发人员可以控制视口的大小和比例

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```

### src和href的区别？

在请求src资源时会将其指向的资源下载并应用到文档内，如js脚本，img图片和frame等元素。**一般会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕**，所以一般js脚本会放在底部而不是头部。

href是指向网络资源所在位置（的超链接），用来建立和当前元素或文档之间的连接，当浏览器识别到它他指向的文件时，就会**并行下载资源**，不会停止对当前文档的处理。

### async和defer

defer是文档解析完再执行，async一旦异步加载完马上执行

![2019-06-13-07-13-42](https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/c84fdc0e47268832fa8914ab4d125002.png)

### 有几种前端储存的方式？✨

cookies、localstorage、sessionstorage、Web SQL、IndexedDB

### 这些方式的区别是什么？✨

- cookies： 在HTML5标准前本地储存的主要方式，优点是兼容性好，请求头自带cookie方便，缺点是大小只有4k，自动请求头加入cookie浪费流量，每个domain限制20个cookie，使用起来麻烦需要自行封装
- localStorage：HTML5加入的以键值对(Key-Value)为标准的方式，优点是操作方便，永久性储存（除非手动删除），大小为5M，兼容IE8+
- sessionStorage：与localStorage基本类似，区别是sessionStorage当页面关闭后会被清理，而且与cookie、localStorage不同，他不能在所有同源窗口中共享，是会话级别的储存方式
- Web SQL：2010年被W3C废弃的本地数据库数据存储方案，但是主流浏览器（火狐除外）都已经有了相关的实现，web sql类似于SQLite，是真正意义上的关系型数据库，用sql进行操作，当我们用JavaScript时要进行转换，较为繁琐。
- IndexedDB： 是被正式纳入HTML5标准的数据库储存方案，它是NoSQL数据库，用键值对进行储存，可以进行快速读取操作，非常适合web场景，同时用JavaScript进行操作会非常方便。