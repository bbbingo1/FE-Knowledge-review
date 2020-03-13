Function.method('curry',function(){
    var args = Array.prototype.slice.apply(arguments)//arguments并非一个真正的数组，所以必须应用数组的slice方法来产生出拥有concat方法的常规数组
    var that = this;
    return function(){
      return that.apply(null,args.concat(Array.prototype.slice.apply(arguments)))
    }
  })