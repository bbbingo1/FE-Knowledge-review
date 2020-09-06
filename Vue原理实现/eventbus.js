// function EventEmitter () {
//   // todo
//   this.callbacks = {};
//   this.prototype.on = function(name,callback){
//     if(this.callback[name]){
//      this.callback[name].push({callback})
//     }
//     else{
//         this.callbacks[name] = [{callback}];
//     }
//   }
//   this.prototype.off = function(name,callback){
//     let i = this.callbacks[name].indexOf(callback)
//     this.callbacks[name].splice(i,1)
//   }
//   this.prototype.emit = function(name,data){
//     return this.callbacks[name].forEach(fn => fn(data))
//   }
// }
class EventEmitter {
  constructor() {
    this.callbacks = {}
  }
  on(name, callback) {
    if (this.callbacks[name]) {
      this.callbacks[name].push({
        callback
      })
    } else {
      this.callbacks[name] = [{
        callback
      }];
    }
  }
  off(name, callback) {
    let i = this.callbacks[name].indexOf(callback)
    this.callbacks[name].splice(i, 1)
  }
  emit(name, data) {
    return this.callbacks[name].forEach(fn => fn(data))
  }
}
// test
var emitter = new EventEmitter();
emitter.on('foo', function (e) {
  console.log('foo event: ', e);
});
emitter.on('*', function (e, type) {
  console.log('some event: ', e, type);
});

function onBar(e) {
  console.log('bar event: ', e);
}
emitter.on('bar', onBar);
emitter.emit('foo', {
  name: 'John'
});
emitter.emit('bar', {
  name: 'John'
});
emitter.off('bar', onBar);
emitter.emit('foo', {
  name: 'John'
});
emitter.emit('bar', {
  name: 'John'
});