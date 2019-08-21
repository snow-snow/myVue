import observer from '../observer'
const LIFECYCLE_HOOKS = [
  'created',
  'mounted'
]
export default function initOptions (vm) {
  console.log('initOptions vm', vm)
   vm._data = vm.$options.data
  // observer数据劫持
  observer(vm._data)

  // 初始化生命周期函数
  LIFECYCLE_HOOKS.forEach(hook => {
    vm.$options[hook] = vm.$options[hook] || function () {}
  })

}
