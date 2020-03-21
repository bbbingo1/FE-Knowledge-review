function MyPromise(fn) {
  var _this = this;

  this.callback = []; // 改为数组，resolve时每一个then传入的函数都会执行
  this.isResolved = false; // 记录是否调用过resolve；原生的 Promise 在调用了第一个 resolve 之后，后面的 resolve 都无效化

  function resolve(val) {
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

//简单的写法
function promise() {
  this.msg = '' // 存放value和error
  this.status = 'pending'
  var that = this
  var process = arguments[0]

  process(function () {
    that.status = 'fulfilled'
    that.msg = arguments[0]
  }, function () {
    that.status = 'rejected'
    that.msg = arguments[0]
  })
  return this
}

promise.prototype.then = function () {
  if (this.status === 'fulfilled') {
    arguments[0](this.msg)
  } else if (this.status === 'rejected' && arguments[1]) {
    arguments[1](this.msg)
  }
}