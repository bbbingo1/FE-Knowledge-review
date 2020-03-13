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