/**
 * Created by lenovo on 2017/9/13.
 */
import EasyAlert from './EasyAlert'

export default  {
	install(Vue, defaultOption = {}){
		const EasyAlertVue = Vue.extend(EasyAlert);
		const Cache = {}; //涉及到多次调用，缓存起来

		Object.assign({}, defaultOption, EasyAlertVue.DEFAULT_OPT);
		function alert(msg, option = {}) {
			console.log(option);
			option.message = msg;
			let alert = Cache[option.id] || (Cache[option.id] = new EasyAlertVue);
			if(!alert.$el){ //已经挂载的元素可以找到$el，可以通过这个区判别
				//如果元素没挂载，即第一次使用，需要挂载
				let vm = alert.$mount(); //这里应该挂载一个元素，但元素是自定义的，通过原生方式挂载
				document.querySelector(option.parent || 'body').appendChild(vm.$el);
			}
			alert.queue.push(option)
		}
		Vue.alert  =  alert;  //挂载到Vue静态

		Vue.mixin({
			created(){
				this.$alert = alert;
			}
		});
	}
}