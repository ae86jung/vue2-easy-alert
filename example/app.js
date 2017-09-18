

Vue.use(window['vue-easy-alert'].default)
var app = new Vue({
  data: function() {
    return {
      message: 'How are?',
    }
  },
  methods: {
    alert: function() {
      this.$alert(this.message, {
          title: '提醒',
          titleStyle: 'color:red;',
          isConfirm: true,
          isAsync: true,
          onOk(success){
              console.log('you click ok')
			  success && typeof success === 'function' && success()
          }
      });
    }
  }
})



app.$mount('#app')
