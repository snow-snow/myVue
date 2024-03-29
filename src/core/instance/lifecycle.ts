export function callHook (vm, hook:string) {
  const handlers = vm.$options[hook]
  if (handlers) {
    handlers.call(vm)
  }
}
