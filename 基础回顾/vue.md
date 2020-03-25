## 框架 VUE

### 模块化思想

隔离不同的js文件，仅暴露当前模块所需要的其他模块，这就是模块化思想。

### 组件化思想

 组件化思想，让我们把页面划分为一个个组件，组件内部维护自己的UI展示、交互逻辑，组件间可以进行数据通信，实现一种变相的相互隔离，便不会出现A和B两人一起编辑一段html的难受场景，同时，提高了代码的可维护性和复用性，这是其解决的关键痛点。

### SPA

特点：单页面、不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。
优点：用户体验好，执行快，对服务器压力较小，避免了不必要跳转和重复渲染
缺点：初次加载耗时多；（不考虑框架处理）无法使用浏览器的前进后退功能，SEO难度较大

### MVVM

MVVM 模式，顾名思义即 Model-View-ViewModel 模式

model：数据层，主要做域模型的同步，一般通过ajax完成客户端和服务端的model同步
view：视图层，MVVM中，整个view是一个动态模板，不负责处理状态和数据，做的事情：数据绑定、指令声明、事件绑定。
viewModel：把view需要的层数据暴露，并对其声明和数据绑定负责，处理业务逻辑。viewModel会做好绑定属性的监听，当model数据变化，就可以同步到view层更新。

优点：分离视图和模型，**降低代码耦合**，**提高视图和逻辑的重用性**，可以把view或者model单独拿出来复用，只需要修改viewmodel的逻辑即可
	提高可测试性，**viewModel便于编写测试代码**
	**自动更新dom，不需要手动控制dom**

缺点：一个**大的模块model可能很大，当长期持有时就会花费很多的内存**；对于**大型图形应用程序**，视图状态较多，**ViewModel的构建和维护成本都会比较高**

### 生命周期

| 生命周期      | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| beforeCreate  | 组件实例被创建之初，组件的属性生效之前                       |
| created       | 组件实例已经完全创建，属性也绑定，但**真实dom还没有生成**，`$el`还不可用 |
| beforeMount   | 在挂载开始之前被调用：相关的 **render 函数首次被调用**       |
| mounted       | el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子    |
| beforeUpdate  | 组件数据更新之前调用，发生在虚拟 DOM 打补丁之前              |
| update        | 组件数据更新之后                                             |
| activited     | keep-alive专属，组件被激活时调用                             |
| deadctivated  | keep-alive专属，组件被销毁时调用                             |
| beforeDestory | 组件销毁前调用                                               |
| destoryed     | 组件销毁后调用                                               |

> 补充：`serverPrefetch`；前身：`ssrPrefetch`，用来处理ssr，允许我们在渲染过程中“等待”异步数据。可在任何组件中使用，而不仅仅是路由组件。

### Vue 的父组件和子组件生命周期钩子函数执行顺序？

Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 部分：

- 加载渲染过程

  父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

- 子组件更新过程

  父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

- 父组件更新过程

  父 beforeUpdate -> 父 updated

- 销毁过程

  父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

### 父组件监听子组件生命周期函数

1. 子组件中用emit触发父组件

2. 直接用@hook来监听：

   ```vue
   <child @hook:mounted="doSomething"></child>
   ```

### keep-alive

keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染 ，其有以下特性：

- 一般结合路由和动态组件一起使用，用于缓存组件；
- 提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；
- 对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。

1. `<keep-alive>`是 `Vue` 源码中实现的一个全局抽象组件，通过自定义 `render` 函数并且利用了插槽来实现数据缓存和更新。它的定义在`src/core/components/keep-alive.js` 中：

   ```js
   export default {
     name: 'keep-alive',
     abstract: true,
     ...
   }
   ```

2. 所有的抽象组件是通过定义`abstract`选项来声明的。抽象组件不渲染真实`DOM`，且不会出现在父子关系的路径上（`initLifecycle`会忽略抽象组件），相关代码片段：

   ```js
   if (parent && !options.abstract) {
     // abstract 即 `ptions.abstract`
     // while 循环查找第一个非抽象的父组件
     while (parent.$options.abstract && parent.$parent) {
       parent = parent.$parent
     }
     parent.$children.push(vm)
   }
   
   ```

   

### 组件通信

1. **`props / $emit` 适用 父子组件通信**
2. **`ref` 与 `$parent / $children` 适用 父子组件通信**
3. **`EventBus （$emit / $on）` 适用于 父子、隔代、兄弟组件通信**
4. **`$attrs`/`$listeners` 适用于 隔代组件通信**
5. **`provide / inject` 适用于 隔代组件通信**
6. **Vuex 适用于 父子、隔代、兄弟组件通信**

### 状态管理vuex

（1）Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。

（2）改变 store 中的状态的**唯一途径就是显式地提交 (commit) mutation**。这样使得我们可以方便地跟踪每一个状态的变化。

主要包括以下几个模块：

- State：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
- Getter：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
- Mutation：是**唯一更改** store 中状态的方法，且必须是同步函数。
- Action：用于提交 mutation，而不是直接变更状态，可以**包含任意异步**操作。
- Module：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中。

### Proxy与Object.defineProperty的优劣对比?

Proxy的优势如下:

- Proxy可以直接监听对象而非属性
- Proxy可以直接监听数组的变化
- Proxy有多达13种拦截方法,不限于apply、ownKeys、deleteProperty、has等等是`Object.defineProperty`不具备的
- Proxy返回的是一个新对象,我们可以只操作新的对象达到目的,而`Object.defineProperty`只能遍历对象属性直接修改
- Proxy作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利

Object.defineProperty的优势如下:

- 兼容性好,支持IE9

### vue如何实现双向绑定

Vue 主要通过以下 4 个步骤来实现数据双向绑定的：

实现一个监听器 Observer：对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty() 对属性都加上 setter 和 getter。这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。

实现一个解析器 Compile：解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。

实现一个订阅者 Watcher：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。

实现一个订阅器 Dep：订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。

### 响应式系统简述:

- 任何一个 Vue Component 都有一个与之对应的 Watcher 实例。
- Vue 的 data 上的属性会被添加 getter 和 setter 属性。
- 当 Vue Component render 函数被执行的时候, data 上会被触碰(touch), 即被读, getter 方法会被调用, 此时 Vue 会去记录此 Vue component 所依赖的所有 data。(这一过程被称为依赖收集)
- data 被改动时（主要是用户操作）, 即被写, setter 方法会被调用, 此时 Vue 会去通知所有依赖于此 data 的组件去调用他们的 render 函数进行更新。

### 既然Vue通过数据劫持可以精准探测数据变化,为什么还需要虚拟DOM进行diff检测差异?

通常一个**绑定一个数据就需要一个Watcher**,一旦我们的**绑定细粒度过高就会产生大量的Watcher**,这会带来内存以及依赖追踪的开销,而**细粒度过低**会无法精准侦测变化,因此Vue的设计是选择中等细粒度的方案,**在组件级别进行push侦测的方式,也就是那套响应式系统,通常我们会第一时间侦测到发生变化的组件,然后在组件内部进行Virtual Dom Diff获取更加具体的差异,而Virtual Dom Diff则是pull操作,Vue是push+pull结合的方式进行变化侦测的**

### Vue中的key到底有什么用？

key是VNode的唯一标识，diff算法的过程中,先会进行新旧节点的首尾交叉对比,当无法匹配的时候会用新节点的`key`与旧节点进行比对,然后找出差异.

- 准确: 如果不加`key`,那么vue会选择复用节点(Vue的就地更新策略),导致之前节点的状态被保留下来,会产生一系列的bug.
- 快速: **key的唯一性可以被Map数据结构充分利用**,相比于遍历查找的时间复杂度O(n),Map的时间复杂度仅仅为O(1).

### 前端路由的三种实现原理

> 3 种路由模式的说明如下：
>
> - hash:  使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器；
> - history :  依赖 HTML5 History API 和服务器配置。具体可以查看 HTML5 History 模式；
> - abstract :  支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式.

#### hash 模式的实现原理

早期的前端路由的实现就是基于 location.hash 来实现的。其实现原理很简单，location.hash 的值就是 URL 中 # 后面的内容。比如下面这个网站，它的 location.hash 的值为 '#search'：

```js
https://www.word.com#search

window.onhashchage
```

hash  路由模式的实现主要是基于下面几个特性：

- **URL 中 hash 值只是客户端的一种状态**，也就是说当向服务器端发出请求时，hash 部分不会被发送；
- hash 值的改变，都**会在浏览器的访问历史中增加一个记录**。因此我们能通过浏览器的回退、前进按钮控制hash 的切换；
- 可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者**使用  JavaScript 来对 loaction.hash 进行赋值，改变 URL 的 hash 值**；
- 我们可以**使用 hashchange 事件来监听 hash 值的变化**，从而对页面进行跳转（渲染）。

#### history 模式的实现原理

HTML5 提供了 History API 来实现 URL 的变化。其中做最主要的 API 有以下两个：history.pushState() 和 history.repalceState()。这两个 API 可以在不进行刷新的情况下，操作浏览器的历史纪录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录，如下所示：

```js
window.history.pushState(null, null, path);
window.history.replaceState(null, null, path);

window.onpopState
```

history 路由模式的实现主要基于存在下面几个特性：

- pushState 和 repalceState 两个 API 来操作实现 URL 的变化 ；
- 我们可以使用 popstate  事件来监听 url 的变化，从而对页面进行跳转（渲染）；
- history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）。