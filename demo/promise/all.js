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