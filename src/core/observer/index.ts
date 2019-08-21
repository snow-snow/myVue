import Dep from './dep'

class Observer {
  constructor (value) {
    this.walk(value)
  }

  walk(obj){
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object') {
        this.walk(obj[key])
      }
      defineReactive(obj, key, obj[key])
    })
  }
}

// 重新set和get 新建一个Dep 与 obj绑定
export  function defineReactive  (obj, key, value){
  let dep:Dep = new Dep()
  Object.defineProperty(obj, key, {
    set (newVal) {
      console.log('set',key)
      if (newVal === value) {
        return
      }
      value = newVal
      // 调用notify 更新所有sub中的Watcher
      dep.notify()
    },
    get () {
      // 在获取属性值的时候， 如果有target， 将当前watcher 加入dep 的sub数组中
      if (Dep.target) {
        dep.addDepend()
      }
      return value
    }
  })
}

export default function observer(value) {
  return new Observer(value)
}
