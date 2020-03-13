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