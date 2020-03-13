//观察者模式 vue基于该模式
// 被观察者：我家小宝宝 ：心情好不好 -》 观察者：妈妈、爸爸：我家小宝宝心情好/不好
class Subject {
  constructor(name) {
    this.name = name;
    this.observers = [] //存放观察者
    this.state = '心情好'
  }
  // 被观察者提供一个接受观察者的方法
  attach(observer) {
    this.observers.push(observer) //存放所有的观察者
  }
  // 设置状态的方法
  setState(str) {
    this.state = str;
    this.observers.forEach(observer => {
      observer.updated(this.state)
    })
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  // 用来监视被观察者状态、通知所有的观察者的方法 
  updated(str) {
    console.log(this.name + '说：我家小宝宝' + str)
  }
}

let sub = new Subject('宝宝')
let o1 = new Observer('妈妈')
let o2 = new Observer('爸爸')
sub.attach(o1)
sub.attach(o2)
sub.setState('心情不好')