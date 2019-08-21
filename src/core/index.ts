import initOptions from "./instance/init"
import Watcher from "./observer/watcher";
import proxy from "./instance/proxy";
import {callHook} from "./instance/lifecycle";
import Compiler from "./compile";


export default class MyVue {
  constructor(option) {
    console.log("option",option)
    let vm:any = this
    // 将 option 赋值给$option
    vm.$options = option
    vm.$watch = function (key, cb) {
      new Watcher(vm, key, cb)
    }
    //初始化option

    initOptions(vm)

    for (let key in vm._data) {
      // 代理程序 vm[option] 获取值时 返回vm._data[option]
      proxy(vm, '_data', key)
    }
    // 调用生命周期函数 created
    callHook(vm, 'created')

    new Compiler(vm.$options.el, vm)
    callHook(vm, 'mounted')
  }
}
