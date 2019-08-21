/**
 * @author monkeywang
 * Date: 2018/4/8
 */
let app = new MyVue({
  el: '#app',
  data: {
    msg: 'MyVue',
    deep: {
      a: 1,
      b: 2
    }
  },
  mounted () {
    this.deep.a = '111'
  }
})
