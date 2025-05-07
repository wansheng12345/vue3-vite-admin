// 防抖 
export default {
	mounted(el, binding) {
		const { time = 500, name = null, params = {} } = binding.value || {};
		const { arg = 'click' } = binding || {};
		el.timer = null;
		const debounce = (e) => {
			e.preventDefault()
			e.stopPropagation()
			clearTimeout(el.timer);
			el.timer = setTimeout(() => {
				if (typeof name === 'function') {
					name.apply(null, [params,e])// 额外返回事件对象 
				} else {
					console.warn('v-debounce: name should be a function');
				}
			}, time);
		};
		el.addEventListener(arg, debounce)
		el._debounce = debounce;
		el.arg = arg;
	},
	unmounted(el) {
		el.removeEventListener(el.arg, el._debounce); // 在unmounted钩子中移除事件监听器
	}
}