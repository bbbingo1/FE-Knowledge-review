# Module

## 模块化概述

在学习ES6的模块化之前先复习一下之前出现的模块化，比较常用的有三种规范定义：CommonJS、AMD、CMD。

它们的特点与相互间的区别是：

1. **CommonJS适用于服务端**，写法为：

```js
var clock = require('clock.js')
clock.start();
```

上例表示，`clock`的调用必须等待`clock.js`请求加载成功，换句话说，是**同步**操作，而这也导致了CommonJS广泛应用于服务端而不是客户端（服务器读取模块都是在本地磁盘，加载速度快，而如果是在客户端则容易出现‘假死’状态）那么能不能用异步加载模块呢？

2. **AMD  (Asynchronous Module Definition) 就是异步加载模块，多用于浏览器**（ **requireJs应用了这一规范**），写法为：

```js
require([module],callback);

// eg
require(['clock.js'],function(clock){
  clock.start();
})
```

虽然实现了异步加载，规避了浏览器的“假死”问题，但是也存在缺点： **一开始就把所有依赖写出来是不符合逻辑顺序的**。那么，能不能像**CommonJS一样用的时候才require，然后还能支持异步加载后执行呢**？

3. **CMD (Common Module Definition)  则是依赖就近，用的时候再require**（ **seajs推崇的规范** ），写法为：

```js
define(function(require,exports,module){
  var clock = require('clock.js');
  clock.start();
})
```

 **AMD和CMD的区别是对依赖模块的执行时机不同**，而不是加载处理方式不同，二者皆为异步加载模块。 

**AMD依赖前置**，**js可以方便地清楚依赖模块有哪些**，立即加载；

**CMD就近依赖**，开发者可以在需要用到依赖的时候再require，但是对于js处理器来说，需要把代码处理为字符串解析一遍才知道依赖了哪些模块，即**牺牲性能来获得开发的便利**，虽然实际上解析的时间短到可以忽略，但是也有很多人诟病CMD这一点。

ES6的模块化设计思想是尽量静态化，使得编译时就能确定模块的依赖关系。

对比CommonJS和ES6模块：

```js
// CommonJS
let { start, exists, readFile } = require('fs')
// 相当于
// let _fs = require('fs')
// let start = _fs.start, exists = _fs.exists, readFile = _fs.readFile

// ES6
import { start, exists, readFile } from 'fs'
```

上述例子中，**CommonJS的实质是整体加载**fs模块生成一个`_fs`对象，之后再从对象中分别读取3个方法，称为“**运行时加载**”。而**ES6模块是加载3个方法**，称为“**编译时加载**”

## ES6模块化的语法规范

### 严格模式

在ES6模块中自动采用严格模式。规定：

- 变量必须先声明
- 函数参数不能有同名属性
- 不能使用`with`
- 对只读属性赋值、`delete`不可删除属性直接报错
- 不可删除变量`delete prop`、只能删除属性`delete global[prop]`
- `eval`不会再外层作用域引入变量
- `eval`和`arguments`不可重新赋值
- `arguments`不会自动反应函数参数变化
- 禁止`this`指向全局
- 增加保留字：static、interface、protected等。

> 注意：**在ES6模块中，顶层`this`为`undefined`，不应该被使用。**

### export命令

第一种：

```js
export var a = '123';
export const _b = '2323'
export let c = '2222' 
```

第二种：

```js
var a = '123';
const _b = '2323'
let c = '2222' 
export {a, _b, c}; // 推荐
```

第三种（第二种基础上加上as关键词重命名）

```js
var a = '123';
const _b = '2323'
let c = '2222' 
export {
	a as stream1,
  _b as stream2,
  c as stream3};
```

> 注意：
>
> 1. **export语句输出的接口是对应值的引用**，也就是一种**动态绑定**关系，通过该接口可以获取模块内部实时的值。
>
>    对比CommonJS规范：**CommonJS模块输出的是值的缓存**，不存在动态更新。
>
> 2. **export命令规定要处于模块顶层**，不过出现在块级作用域内，就会报错，**import同理**。

### import命令

第一种：

```js
import {a, _b ,c} from './profile'
```

第二种：

```js
import {stream1 as firstVal} from './profile'
```

> import 是**静态执行**，不可以应用表达式、变量和if结构。
>
> ```js
> if(x == 1){
> import { foo } from 'module1'
> }else{
> //...
> }
> ```

import语句是Singleton模式：虽然`foo`和`bar`在两个语句中加载，但是对应的是同一个`my_module`实例。

```js
import { foo } from './module1'
import { bar } from './module1'

// 相当于
import {foo,bar} from './module1'
```

### 模块的整体加载

可以使用*来指定一个对象，所有输出值都加载到这个对象上：

```js
import * as circle from './module1'
circle.foo();
circle.bar();
```

由于模块整体加载所在的对象都是可以静态分析的，所以不允许运行时改变。

```js
import * as circle from './module1'
// 下面两行都是不允许的
circle.foo = 123;
circle.bar = function(){}
```

### 默认输出

export default命令可以为模块默认输出

```js
// module2.js
export default function(){
  console.log('123')
}
// 相当于
function a(){
  console.log('123')
}
export {a as default}; 
```

import命令可以为匿名函数指定任意名字

```js
import defaultFn from './module2'
// 相当于
import {default as defaultFn} from './module2'
```

### export和import的复合写法

```js
export { foo, bar} from 'my_module';
// 等同于
import {foo,bar} from 'my_module';
export{foo,bar};
```

```js
export {es6 as default} from './someModule'
// 等同于
import {es6} from './someModule'
export default es6;
```

### import()方法

前面提到过，require是动态加载，即可以在用的时候再require；而import是静态执行，只能处于代码最顶层，不可以存在于块级作用域中。这导致import无法在运行中执行（类似于AMD的缺点）。
于是就有了一种提案：引入import()函数，类似于Node的require函数（CommonJS），但是它实现了异步加载。

定义：import()函数接收与import相同的参数，返回一个Promise对象，加载获取到的值作为then方法的回调参数。

```js
const main = document.querySelector('main')

import(`./section-modules/${someVariable}.js`)
	.then(module => {
  	module.loadPageInto(main);
	})
	.catch(err => {
    main.textContext = err.message;
  })
```

```js
// 加载获得接口参数：
import('./module1.js')
.then(({default:defaultFn,foo,bar}) => {
  console.log(defaultFn)
})
```

```js
// 同时加载多个模块并应用于async函数中
async function main() {
  const myModule = await import('./myModule.js');
  const {export1, export2} = await import('./myModule.js');
  const [module1, module2, module3] = 
        await Promise.all([
          import('./module1,js'),
          import('./module2.js'),
          import('./module3.js')
        ])
}
main();
```

## 不同规范间加载

### import加载CommonJS模块

- 使用import命令加载CommonJS模块，Node会自动将module.exports属性当做模块的默认输出，即等同于export default

  ```js
  // a.js
  module.exports = {
    foo: 'hello',
    bar: 'world'
  }
  
  // 在import引入时等同于
  export default {
    foo: 'hello',
    bar: 'world'
  }
  ```

- CommonJs模块是运行时确定输出接口，所以采用import命令加载CommonJS模块时，只能使用整体输入（*）。

  ```js
  import {readfile} from 'fs' //当'fs'为CommonJS模块时错误
  // 整体输入
  import * as express from 'express'
  const app = express.default();
  ```

### require加载ES6模块

- require命令加载ES6模块时，所有的输出接口都会成为输入对象的属性。

  ```js
  // es.js
  let foo = {bar : 'my-default'};
  exxport default foo;
  foo = null;
  
  // cjs.js
  const es_namespace = require('./es')
  console.log(es_namespace.default);// {bar:'my-default'}
  ```

## CommonJS

### 输出值的复制

CommonJS模块输出的是一个值的复制，ES6输出的是值的引用

```js
// lib.js 
let num = 3;
function changeNum() {
  num = 4;
}
module.exports = {
  num: num,
  changeNum: changeNum,
};

//main.js
var mod = require('./lib.js')
console.log(mod.num); // 3
mod.changeNum();
console.log(mod.num); // 3
```

这是由于，mod.num是一个原始类型的值，会被缓存。可以通过写成一个函数，来得到内部修改后的值：

```js
// lib.js 
let num = 3;
function changeNum() {
  num = 4;
}
module.exports = {
  get num(){
    return num
  },
  changeNum: changeNum,
};

//main.js
var mod = require('./lib.js')
console.log(mod.num); // 3
mod.changeNum();
console.log(mod.num); // 3
```

对比ES6模块：

```js
// lib.js 
export let num = 3;
export function changeNum() {
  num = 4;
}

//main.js
import {num,changeNum} from './lib.js'
console.log(num); // 3
changeNum();
console.log(num); // 4
```



### CommonJS的循环加载

#### 加载原理

CommonJS一个模块对应一个脚本文件，require命令每次加载一个模块就会执行整个脚本，然后生成一个对象。这个对象一旦生成，以后再次执行相同的require命令都会直接到缓存中取值。也就是说：CommonJS模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载时就返回第一次运行的结果，除非手动清除系统缓存。

#### 循环加载

```js
// a.js
exports.done = false;
var b = require('./b.js'); // 1. a.js暂停执行，转到执行b.js ； b.js完毕后回来，b:{done:true}
console.log('在a.js中，b.done=%j',b.done); // 5. '在a.js中，b.done=true'
exports.done = true;
console.log('a.js执行完毕') // 6. 'a.js执行完毕'

// b.js
exports.done = false;
var a = require('./b.js') // 2. a:{done:false}
console.log('在b.js中，a.done=%j',a.done); // 3. '在b.js中，a.done=false'
exports.done = true;
console.log('b.js执行完毕') // 4. 'b.js执行完毕'，继续执行a.js

// main.js
var a = require('./a.js');
var b = require('./b.js');
console.log('在main.js中，a.done=%j，b.done=%j',a.done,b.done); // 7.'在main.js中，a.done=true，b.done=true'
```

上面代码可以看到：第一，在b.js中，a.js没有执行完毕，第二，当main.js执行到第二行时不会再次执行b.js，而是输出缓存的b.js的执行结果，即它的第四行：`exports.done = true`

总结一下：1. 由于CommonJS模块遇到循环加载返回的是当前已经执行的部分的值，而不是代码全部执行后的值（上面的第2步注释）2. CommonJS输入的是被输出值的缓存（复制），而非动态引用。

对比：ES6模块是动态引用，变量不会被缓存

```js
// a.js
import {bar} from './b.js';
export function foo(){
  console.log('foo')
  bar();
  console.log('执行完毕')
}
foo();

// b.js
import {foo} from './a.js' // 如果为CommonJS，这里直接就返回undefined值且不会再更改
export function bar(){
  console.log('bar')
  if(Math.random() > 0.5){
    foo();
  }
}

// 执行结果可能为：foo bar 执行完毕
// 执行结果也可能为： foo bar foo bar 执行完毕 执行完毕
```

















