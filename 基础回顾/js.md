# js

### 变量提升

var声明和function函数声明都会造成变量提升，将提升到代码块首部且此时值为undefined；直到js执行到相应代码处再赋值

es6的let const class 将不会提升

### 为什么会声明提升？ 讲讲底层原理

在词法检查、语法检查过后，js运行又分为了**预解释阶段和执行阶段**

老说法是：预解释阶段实现了创建作用域链、创建Variable Object（先创建arguments、再声明函数，创建var声明的变量）、创建this

而后到了执行阶段，才会执行代码，进行变量赋值、函数引用已经相关逻辑操作。

而新说法用执行上下文来贯穿着整个过程

**执行上下文分为创建阶段和执行阶段**

创建阶段主要做了三件事：创建this指向，创建词法环境（主要分为：全局环境、模块环境、函数环境；而词法环境本身包括存储变量和函数声明的实际位置的环境记录器以及对外部环境的引用（即作用域）），变量环境（也是词法环境，到了es6变量环境专门存储会提升的var变量绑定）

执行阶段就是把全局可执行上下文压入栈，再把函数体内上下文压入栈，再执行代码。

无论哪种说法：解决了：

- this绑定：创建上下文（或预编译）时根据代码执行条件绑定
- 作用域链：可执行上下文创建的词法环境中的环境记录器保存了对外部环境的引用
- 闭包：可执行上下文的词法环境中含有对外部环境的引用，通过这个引用获取外部环境的变量和声明就可以形成闭包。

### 闭包？作用？缺点？

定义：函数可以访问到被创建时的外部词法作用域
	可以理解为：
$$
闭包 =『函数』和『函数体内可访问的变量总和』
$$
作用：隐藏变量，将变量私有化。

```js
function Person(){
  var name = 'cxk'; // 私有化变量
  this.getName = function(){
    return name; // 闭包
  }
  this.setName = function(value){
    name = value; // 闭包
  }
}
```

缺点：闭包不会被垃圾回收，于是很容易造成内存泄漏，消耗内存。很容易影响父函数内部变量的值。

### conmmonJS和ES6 模块化的区别

1. **conmmonJS整体加载，ES6可以按需加载：**

   **CommonJS的实质是整体加载**fs模块生成一个`_fs`对象，之后再从对象中分别读取n个方法，称为“**运行时加载**”。而**ES6模块是自由加载n个方法**，称为“**编译时加载**”

2. CommonJs同步，ES6模块异步

3. CommonJS一个模块对应一个脚本文件，require命令每次加载一个模块就会执行整个脚本，然后生成一个对象。这个对象一旦生成，以后再次执行相同的require命令都会直接到缓存中取值。

4. ES6模块是动态引用，CommonJS是静态复制

### 宏任务微任务

![](https://github.com/bbbingo1/FE-Knowledge-review/blob/master/img/%E5%AE%8F%E4%BB%BB%E5%8A%A1.png?raw=true)

 *requestAnimationFrame姑且也算是宏任务吧，requestAnimationFrame在MDN的定义为，下次页面重绘前所执行的操作，而重绘也是作为宏任务的一个步骤来存在的，且该步骤晚于微任务的执行*

![微任务](https://github.com/bbbingo1/FE-Knowledge-review/blob/master/img/%E5%BE%AE%E4%BB%BB%E5%8A%A1.png?raw=true)

### 基本类型

- boolean
- number
- string
- null
- undefined
- symbol

### 类型转换

![2019-06-23-09-32-17](https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/c378afab84afcdf430aec5229649faee.png)

1. 如果变量为字符串，直接返回.
2. 如果`!IS_SPEC_OBJECT(x)`，直接返回.
3. 如果`IS_SYMBOL_WRAPPER(x)`，则抛出异常.
4. 否则会根据传入的`hint`来调用`DefaultNumber`和`DefaultString`，比如**如果为`Date`对象，会调用`DefaultString`**.
5. `DefaultNumber`：首先`x.valueOf`，如果为`primitive`，则返回`valueOf`后的值，否则继续调用`x.toString`，如果为`primitive`，则返回`toString`后的值，否则抛出异常
6. `DefaultString`：和`DefaultNumber`正好相反，先调用`toString`，如果不是`primitive`再调用`valueOf`.

比如：`({}) + 1`内部会经过哪些步骤：

`{}`和`1`首先会调用ToPrimitive `{}`会走到`DefaultNumber`，首先会调用`valueOf`，返回的是`Object` `{}`，不是primitive类型，从而继续走到`toString`，返回`[object Object]`，是`String`类型 最后加操作，结果为`[object Object]1` 再比如有人问你`[] + 1`输出啥时，你可能知道应该怎么去计算了，先对`[]`调用`ToPrimitive`，返回空字符串，最后结果为"1"。

### this

默认绑定：全局/严格模式下undefined

隐式调用：obj.foo()

隐式丢失：`var bar = obj.foo` 或函数当值传递或对象方法内的内部函数this（指向全局）

显示绑定：call、apply；但不能解决所有隐式丢失问题

硬绑定：bind

new绑定：优先级最高，绑定到实例上

箭头函数：由执行的上下文外部作用域的this决定；且不能再修改

### 从回调到promise到async/await

callback：容易造成回调地狱，可读性差

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

- async/await几乎是同步的写法，代码简洁优雅

- 将Generator写法中的自动执行器盖在语言层面提供，不向外暴露。

- 错误处理友好，调试友好

  Promise的调试很差，由于没有代码块，你不能在一个返回表达式的箭头函数中设置断点，如果你在一个.then代码块中使用调试器的步进(step-over)功能，调试器并不会进入后续的.then代码块，因为调试器只能跟踪同步代码的『每一步』。

### 参数传递方式

1. 基本类型按值传递
2. 引用类型按“共享”传递；即传递的是该对象在堆内存中地址的引用，所以传入一个对象`a:{a:1,b:2}`时，如果在函数内部修改`a=10`;将不影响原来对象`a:{a:1,b:2}`，因为这时只是把内存地址的这个副本修改成了`10`；但如果修改`a.b=3`，就会影响到原来对象`a:{a:1,b:3}`

### 存在性

检查属性时：

- 如果调用`in`操作符，会检查属性是否在对象及其`[[Prototype]]`原型链中；

- 如果调用`hasOwnProperty()`只会检查属性是否在`myObject`对象中，不会检查原型链；

- 如同对象都可以通过`Object.prototype`的委托来访问`hasOwnProperty()`，但有些对象比较特殊如通过`myObject= Object.create(null)`创建的对象就无法直接调用`myObject.hasOwnproperty`；此时哟与一种更强硬方式：`Object.prototype.hasOwnProperty.call(myObject,'a')`来判断。
- `in`和`hasOwnProperty()`区别在于是否查找`[[Prototype]]`原型链；而`Object.keys()`和`Object.getOwnPropertyNames()`都只会查找对象直接包含的属性。

### new 的过程

以new foo(...)为例

1. 一个新的对象被创建，同时继承了对象类型的原型：`let obj1 = Object.create(foo.prototype)`

2. 执行对象类型的构造函数，同时该实例的属性和方法被this所引用，即this指向新构造的实例：`let other = foo.apply(obj1,[...])`

3. 如果构造函数return了一个新的“对象”，那么这个对象就会取代整个new出来的结果。如果构造函数没有return对象，那么就会返回步骤1所创建的对象，即隐式返回this。（一般情况下构造函数不会返回任何值，不过在一些特殊情况下，如果用户想覆盖这个值，可以选择返回一个普通的对象来覆盖。）

   `return (typeof other =='object'&& other)||obj1`

> 注：`Object.create(foo.prototype)`其实就是让`obj1.__proto__===Object.create(foo.prototype)`

### class部署私有属性：

```js
const _counter = new WeakMap(); // 使用WeakMap，因为是弱引用，当引用指向的值占用内存过多或符合垃圾回收条件就会被回收
const _action = new WeakMap();

class Countdown{
  constructor(counter,action){
    _counter.set(this,counter) 
    _action.set(this,action) // 一旦传入，无法更改
  }
  dec(){
    let counter = _counter.get(this)
    if(counter < 1) return;
    else{
      _action.get(this)()
    }
  }
}
const c = new Countdown(2,()=>console.log('Done'));
c.dev();
```



### 什么是事件委托

事件委托就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件.

在绑定大量事件的时候往往选择事件委托。

```html
<ul id="parent">
  <li class="child">one</li>
  <li class="child">two</li>
  <li class="child">three</li>
  ...
</ul>

<script type="text/javascript">
  //父元素
  var dom= document.getElementById('parent');

  //父元素绑定事件，代理子元素的点击事件
  dom.onclick= function(event) {
    var event= event || window.event;
    var curTarget= event.target || event.srcElement;

    if (curTarget.tagName.toLowerCase() == 'li') {
      //事件处理
    }
  }
</script>
```

> - event.target返回触发事件的元素
> - event.currentTarget返回绑定事件的元素

优点:

- **节省内存占用，减少事件注册**
- 新增子对象时无需再次对其绑定事件，适合动态添加元素

局限性:

- focus、blur 之类的事件本身没有事件冒泡机制，所以无法委托
- mousemove、mouseout 这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位，对性能消耗高，不适合事件委托

### 正则实现trim()功能

```js
function myTrim(str) {
  let reg = /^\s+|\s+$/g;
  return str.replace(reg, "");
}
console.log(myTrim('    asdf    '));
```

### 数组合并去重排序

```js
let arr1 = [1, 25, 2, 26, 1234, 6, 213];
let arr2 = [2, 6, 2134, 6, 31, 623];
let c = [...new Set([...arr1, ...arr2])].sort((a, b) => {
	return a - b;
});
```

其他方法：遍历+`indexof()`判断存在性，遍历+哈希等等

### url拿参数

```js
var url = "http://www.taobao.com/index.php?key0=0&key1=1&key2=2";
function parseQueryString(url){
    var str = url.split("?")[1],    //通过?得到一个数组,取?后面的参数
        items = str.split("&");    //分割成数组
    var arr,name,value;

    for(var i=0; i<items.length; i++){
        arr = items[i].split("=");    //["key0", "0"]
        name = arr[0];
        value = arr[1];
        this[name] = value;
    }
}

var obj = new parseQueryString(url);
alert(obj.key2)
```

### 实现深拷贝

```js
funtion deepCopy(obj){
    let result;
   if(typeofObj=='object'){
       //复杂数据类型
       result=obj.constructor==Array?[]:{}
       for (let i in obj){
           result[i]=typeof obj[i]=='object'?deepCopy(obj[i]):obj[i]
       }
   }else{
       //简单数据类型
       result = obj;
   }
   return result
}
```

### 数组扁平化

```js
const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "周杰伦同学" }];
// 使用forEach+concat递归实现
function flat(arr){
  let arrResult = [];
  arr.forEach(item => {
    if(Array.isArray(item)){
      arrResult = arrResult.concat(arguments.callee(item)); // 递归
    } else{
      arrResult.push(item);
    }
  });
  return arrResult;
}
flat(arr);
// [1, 2, 3, 4, 1, 2, 3, 1, 2, 3, 1, 2, 3, 5, "string", { name: "周杰伦同学" }];
```

### 封装ajax

```js
const myHttpClient = url =>{
  return new Promise(function(resolve,reject){
    let client = new XMLHttpRequest(); //创建 XMLHttpRequest 对象
    client.open('GET',url);  //规定请求的类型、URL 以及是否异步处理请求。
    client.onreadystatechange = handler; //接受服务器响应数据的回调
    client.responseType = 'json'; //设置响应数据类型
    client.setRequestHeader("Accept","application/json"); //设置请求头
    client.send(); //发送请求
    function handler(){
      if(this.readyState != 4){
        return;
      }
      if(this.status === 200){
        resolve(this.response)
      }else{
        reject(new Error(this.statusText));
      }
    }
  })
};
//使用
myHttpClient('http://www.baidu.com').then(res=>{
  console.log(res)
}).catch(error=>{
  console.log(error);
})
```

### 实现一个promise

初步设计：

```js
function MyPromise (fn){
  var _this = this
  this.callback = undefined;
  
  function resolve(val){
  		_this.callback() && _this.callback(val)
  }
  
  fn(resolve)
}
MyPromise.prototype.then = function(cb){
  this.callback = cb;
}
```

考虑多个resolve调用、多个then处理、支持链式调用后，进一步完善：

```js
function MyPromise (fn) {
  var _this = this;

  this.callback = []; // 改为数组，resolve时每一个then传入的函数都会执行
  this.isResolved = false; // 记录是否调用过resolve；原生的 Promise 在调用了第一个 resolve 之后，后面的 resolve 都无效化
  
  function resolve (val) {
    if (_this.isResolved) return;
    _this.isResolved = true;

    if (_this.callback.length > 0) {
      _this.callback.forEach(function (item) {
        var res;
        var cb = item.cb;
        var resolve = item.resolve;
        
        cb && (res = cb(val));
        if (typeof res === 'object' && res.then) {
          res.then(resolve);
        } else {
          resolve && resolve(res);
        }
      });
    }
  }
  
  fn(resolve);
}

MyPromise.prototype.then = function (cb) {
  var _this = this;

  return new MyPromise(function (resolve) { // 实现then的链式调用，每调用一次返回一个MyPromise对象
    _this.callback.push({
      cb: cb,
      resolve: resolve
    });
  });
};

// https://juejin.im/post/5b02ae25f265da0ba6101c72#heading-6
```

```js
// 实现promise.race
Promise.race = function(promises){
  return new Promise((resolve,reject) => {
    for(let i = 0; i <= promises.length; i++){
      Promise.resolve(promises[i]).then((data)=>{
        return resolve(data)
      },(err) => {
        return reject(err) 
      })
    }
  })
}
```

```js
// 实现promise.all
Promise.race = function(promises){
  return new Promise((resolve,reject) => {
  	  var resolvedCounter = 0;
    	var resolvedValue = [];
    	for(let i = 0; i <= promises.length; i++){
        Promise.resolve(promises[i]).then(data=>{
          resolvedCounter++;
          resolvedValue[i] = data;
          if(resolvedCounter) return resolve(resolvedValue)
        },err=>{
          return reject(err)
        })
      }
	})
}
```



### 函数柯里化

```js
Function.method('curry',function(){
  var args = Array.prototype.slice.apply(arguments)//arguments并非一个真正的数组，所以必须应用数组的slice方法来产生出拥有concat方法的常规数组
  var that = this;
  return function(){
    return that.apply(null,args.concat(Array.prototype.slice.apply(arguments)))
  }
})
```

### 继承

创建对象：工厂模式（直接返回一个新对象）、构建函数（new一个新对象，使用this）、原型式（使用prototype）、组合式（构造函数+prototype）、寄生式（工厂模式+实例方法使用this+new）、稳妥式（不使用this、不使用new）

继承：

- 原型链继承（使用son.prototype = new Father()）
  缺点：无法传参，不灵活
- 构造函数继承（使用Father.call(son,params)来使子类继承父类）
  缺点：破坏复用性
- **组合继承（共享用原型，独立属性用构造，用son.prototype.constructor= son来连接原型的构造器和构造函数对象son）**
- 原型式继承（son = Object.create(Father.prototype)）
- 寄生式：原型式的基础上增强对象
- 寄生组合式（共享用原型式，独立属性用构造）

### ES5的继承和ES6的继承有什么区别？

ES5的继承时通过prototype或构造函数机制来实现。**ES5的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到this上**（Parent.apply(this)）。

ES6的继承机制完全不同，**实质上是先创建父类的实例对象this（所以必须先调用父类的super()方法），然后再用子类的构造函数修改this**。

具体的：ES6通过class关键字定义类，里面有构造方法，类之间通过extends关键字实现继承。子类必须在constructor方法中调用super方法，否则新建实例报错。因为子类没有自己的this对象，而是继承了父类的this对象，然后对其进行加工。如果不调用super方法，子类得不到this对象。

ps：super关键字指代父类的实例，即父类的this对象。在子类构造函数中，调用super后，才可使用this关键字，否则报错。

### es6如何转换为es5

- 将代码字符串解析为抽象语法树AST
- 对AST进行处理，对ES6代码进行转换，即转成ES5
- 处理后的AST生成代码（ES5）

> 比如，可以使用 `@babel/parser` 的 `parse` 方法，将代码字符串解析成 AST；使用 `@babel/core` 的 `transformFromAstSync` 方法，对 AST 进行处理，将其转成 ES5 并生成相应的代码字符串；过程中，可能还需要使用 `@babel/traverse` 来获取依赖文件等。对此感兴趣的可以看看[这个](https://github.com/FishPlusOrange/easy-webpack)。

