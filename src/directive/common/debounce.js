// 防抖  应用到按钮上，其实就是禁用按钮
export default {
	mounted(el, binding) {
		const time = binding.value?.time || 1000
		const func = binding.value?.func || null
		el.timer = null

		el.addEventListener('click', () => {
			if (el.timer !== null) {
				clearTimeout(el.timer)
				el.timer = null
			}
			el.timer = setTimeout(() => {
				func && func()
			}, time)
		})
	}
}