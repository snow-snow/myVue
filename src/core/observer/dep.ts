import Watcher from './watcher'
export default class Dep {
  static target:Watcher
  // 保存页面渲染是新建的所有Watcher
  sub:Array<Watcher> = []

  addDepend () {
    Dep.target.addDep(this)
  }

  addSub (sub:Watcher) {
    this.sub.push(sub)
  }

  notify () {
    for (let sub of this.sub) {
      sub.update()
    }
  }
}

const targetStack = []
export function pushTarget (_target:Watcher) {
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}

export function popTarget () {
  Dep.target = targetStack.pop()
}
