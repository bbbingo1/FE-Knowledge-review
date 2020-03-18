# async函数

> async函数其实就是Generator的语法糖（所以永远记住它之所以会存在最起初是以为异步函数回调地狱的问题）
>
> 看一个用async代替co函数库的例子：
>
> ```js
> const fs = require("fs").promises;
> async function read() {
>  let concent = await fs.readFile("./name.txt", "utf-8")
>  let age = await fs.readFile(concent, "utf-8")
>  return age
> }
> read().then(data => {
>  console.log(data) // 666
> })
> ```

相比于Generator，有了以下改进：

1. 内置执行器

   **async函数自带执行器，直接调用就会自动执行**，不需要手动执行或引入co模块等。

2. 更好的语义

   async表示函数里有异步操作，**await表示紧跟在后面的表达式等待结果**

3. 更好的适用性

   async函数的await后面可以是Promise对象，也可以是原始类型的值（数值、字符串或布尔值，但这时就等于同步操作，没啥意义）

4. 返回一个Promise对象

   async函数完全可以看作由多个异步操作包装成的一个Promise对象，而await对象就是内部then命令的语法糖。

## 用法形式：

```js
// 函数声明
async function foo(){}

// 函数表达式
var foo = async function(){}

// 对象的方法
let obj = {
  async foo(){}
}

// Class的方法
class Storage{
  constructor(){
    this.cachePromise = caches.open('avatars')
  }
  
  async getAvatar(name) {
		const cache = await this.cachePromise;
    return cache.match(`/avatar/${name}.jpg`)
  }
}

const storage = new Storage();
storage.getAvatar('jake').then(...)
```

## 语法

### 1. 返回值

#### async的返回值：

**返回一个Promise对象，函数体内返回值作为该对象then方法回调函数的参数，如果内部抛出错误，返回的Promise会变成reject状态，抛出对象会被catch方法接收到。**

```js
async function f(){
  return 'Hello World'
}
f().then(
  data => console.log(data),
  err => console.log(err)
)
//'Hello World'

async function f(){
  throw new Error('出错')
}
f().then(
  data => console.log(data),
  err => console.log(err)
)
//'出错'
```

#### await的返回值：

await等待的虽然是promise对象，但不必写 .then(..) ，直接可以得到返回值。

```js
var sleep = function (time) {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			// 返回 ‘ok’
			resolve('ok');
		}, time);
	})
};
var start = async function () {
	let result = await sleep(3000);
	console.log(result); // 收到 ‘ok’
};
```



### 2.状态更改条件

**async函数会等到内部所有awit命令执行完才会更改返回的Promise对象的状态。除非遇到return语句或者抛出错误。**

```js
var sleep = function (time) {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			// 模拟出错了，返回 ‘error’
			reject('error');
		}, time);
	})
};
var start = async function () {
	try {
		console.log('start');
		await sleep(3000); // 这里得到了一个返回错误
		// 所以以下代码不会被执行了
		console.log('end');
	} catch (err) {
		console.log(err); // 这里捕捉到错误 `error`
	}
};
start(); // Object Promise {<pending>}
// "start"
// "error"
```



### 3. 异常处理

1. 既然 `.then(..)` 不用写了，那么 `.catch(..)` 也不用写，可以直接用标准的 `try catch` 语法捕捉错误。 

   ```js
   async function f() {
     
   	try {
   		await Promise.reject('出错'); // 这里得到了一个返回错误
   	} catch (err) {
   		console.log(err); // 这里捕捉到错误 `error`
   	} // try catch捕获错误后，后面正常运行
     
     return await Promise.resolve('Hello World')
   };
   
   f().then(data => console.log(data)); // "出错" // "Hello World"
   ```

2. 当然，也可以在await后面的Promise对象后直接添加catch方法

   ```js
   async function f() {
     
     await Promise.reject('出错').catch ((err)=>console.log(err)) // 这里捕捉到错误 `error`
   	// catch捕获错误后，后面正常运行
     
     return await Promise.resolve('Hello World')
   };
   
   f().then(data => console.log(data));  // "出错" // "Hello World"
   ```

如果没有进行任何错误捕获及处理，那么async函数返回的Promise对象就会被reject，同时内部函数不在向下执行。

```js
async function f(){
  await Promise.reject('出错')
}
f().then(
  data => console.log(data),
  err => console.log(err)
)
//'出错'
```

### 4.非继发处理

多个await命令后面的**异步操作**如果不存在继发关系，需要处理为同时触发：

```js
// 继发写法
let foo = await getFoo();
let bar = await getBar()

// 非继发：
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```



## 实现原理:point_down:

async其实就是讲Generator函数和自动执行器包装在一个函数里，所有async都可以改写成下列第二种形式

```js
async function fn(args){
  // ...
}

// 等同于
function fn(args){
  return spawn(function*(){ // spawn函数就是自动执行器
    // ...
  });
}
```

```js
// spawn函数实现
function spawn(genF){
  // 对应async返回的Promise (产生返回对象)
  return new Promise(function(resolve,reject){
    var gen = genF(); // iterator
    
    function step(nextF) {
	    try{
        var next = nextF(); 
      }catch(e) {
        return reject(e)
      }
      if(next.done) {
        return resolve(next.value); // 产生结束条件
      }
      Promise.resolve(next.value).then(function(v){ // 产生继发关系
        step(function() { return gen.next(v); }); // 递归调用next，直到错误异常或结束
      },function(e) {
        step(function() { return gen.throw(e); }) // 错误异常
      })
    }
    
    step(function() { return gen.next(undefined) })
  })
}
```



## Promise->>Generator->>async:fire:

举个例子：假定某个DOM元素上面部署了一系列动画，前一个结束才开始后一个（链式、继发关系），如果其中一个动画出错，就不再继续执行，返回上一个成功执行动画的返回值。

Promise：

```js
function chainAnimationsPromise(elem, animations){
  
  // 变量ret保存上一个动画的返回值
  var ret = null
  
  // 新建一个空的Promise
  var p = Promise.resolve()
 
  // 使用then方法，链式执行所有动画
  for(var anim of animations){
  	p = p.then(function(val){
      ret = val;
      return anim(elem) // 执行动画，anim(elem)的返回值将作为下一个then方法函数的传入参数
    })
  }
  
  // 返回一个部署了错误捕获机制的Promise
  return p.catch(function(e) {
    // 忽略错误，继续执行
  }).then(function() {
    return ret;  // 返回最后一个成功执行的动画的返回值
  })
}
```

虽然Promise写法比回调有很大改进，但代码上看，有太多的Promise的API（then、catch）显得不是很雅观，语义也不是很清晰。

Generator：

```js
function chainAnimationsPromise(elem, animations){
  
  return spawn(function*() {
    var ret = null;
    
    try{
      for(var anim of animations){
        ret = yield anim(elem)
      }
    }catch{
      // 忽略错误，继续执行
    }
    return ret;
  })
}
```

语义相比Promise写法更清晰，但问题主要在于，必须要有一个任务运行器（上面代码中的spawn函数），而且必须保证yield后面是一个Promise对象

async：

```js
async function chainAnimationsPromise(elem, animations){
    var ret = null;
    try{
      for(var anim of animations){
        ret = await anim(elem)
      }
    }catch{
      // 忽略错误，继续执行
    }
    return ret;
}
```

更符合语义，代码更简洁。将Generator写法中的自动执行器盖在语言层面提供，不向外暴露。