export default {
	mounted(el, binding) {
		const scrollSpeed = binding.arg || 50;
		let timer = null;
		const clearScroll = () => {
			clearInterval(timer);
			timer = null;
		};

		const createScroll = () => {
			clearScroll();
			const tableWrapper = el.querySelector('.el-scrollbar__wrap');
			timer = setInterval(() => {
				tableWrapper.scrollTop += 1;
				if (tableWrapper.scrollTop + tableWrapper.clientHeight >= tableWrapper.scrollHeight) {
					tableWrapper.scrollTop = 0;
				}
			}, scrollSpeed);
		};

		el.addEventListener('mouseover', clearScroll);
		el.addEventListener('mouseleave', createScroll);

		createScroll();

		el.__vueScrollCleanup__ = () => {
			clearScroll();
			el.removeEventListener('mouseover', clearScroll);
			el.removeEventListener('mouseleave', createScroll);
		};
	},
	unmounted(el) {
		el.__vueScrollCleanup__ && el.__vueScrollCleanup__();
	}
};