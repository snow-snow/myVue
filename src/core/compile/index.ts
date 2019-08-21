export default class Compiler {
  constructor(el, vm) {
    vm.$el = document.querySelector(el)
    this.replace(vm.$el, vm)
  }

  replace(frag, vm) {
    // 遍历所有子节点
    Array.from(frag.childNodes).forEach((node: any) => {
      let txt = node.textContent;
      // 双向绑定的正则
      let reg = /\{\{(.*?)\}\}/g;   // 正则匹配{{}}

      if (node.nodeType === 3 && reg.test(txt)) { // 即是文本节点又有大括号的情况{{}}
        let arr = RegExp.$1.split('.');
        let val = vm;
        arr.forEach(key => {
          val = val[key];
        });
        // 用trim方法去除一下首尾空格
        node.textContent = txt.replace(reg, val).trim();
        vm.$watch(RegExp.$1, function (newVal) {
          console.log('RegExp.$1', RegExp.$1)
          node.textContent = txt.replace(reg, newVal).trim();
        })
      }
      if (node.nodeType === 1) {  // 元素节点
        let nodeAttr = node.attributes; // 获取dom上的所有属性,是个类数组
        Array.from(nodeAttr).forEach((attr: any) => {
          let name = attr.name;
          let exp = attr.value;
          // 如果数组中包含v- 赋值value
          if (name.includes('v-')) {
            node.value = vm[exp];
            // 监听变化
            vm.$watch(exp, function (newVal) {
              console.log('exp', exp)
              node.value = newVal;
            });

            // 监听 input 事件， 更新值
            node.addEventListener('input', e => {
              let newVal = e.target.value;
              let arr = exp.split('.')
              // 更新 vm 里面的值， 触发双向绑定
              let val = vm;
              arr.forEach((key, i) => {
                if (i === arr.length - 1) {
                  val[key] = newVal
                  return
                }
                val = val[key];
              });
            });
          }
        });
      }

      // 如果还有子节点，继续递归replace
      if (node.childNodes && node.childNodes.length) {
        this.replace(node, vm);
      }
    })
  }
}
