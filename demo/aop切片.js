// AOP 面向切片编程 把原来的代码切成片，在中间加上自己的代码，例如新增一个函数方法
//装饰器 扩展原有的方法 重写原有的方法

function say(who) {
  console.log(who + '说话')
}

Function.prototype.before = function (fn) {
  //this == say
  return () => { //使用箭头函数，使内部this直接指向外部函数作用域内的this
    fn() // 假如此处fn是一个异步函数，则可以使用promise控制执行顺序
    this(...arguments);// es6展开运算符 把arguments参数展开一次传入
  }
}
let newFn = say.before(function () {//新增的函数
  console.log('遗言')
})
newFn('我')

// 可以解决预置参数问题 （bind也可以实现）
// 解决异步问题