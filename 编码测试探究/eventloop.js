console.log('start');
setTimeout(()=>{
    console.log('set1')
    Promise.resolve().then(()=>{
        console.log('promise1');
        setTimeout(()=>{
            console.log('set2');
        })
    }).then(()=>{
        console.log('promise2')
    })

})
console.log('end');