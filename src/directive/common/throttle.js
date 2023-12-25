// 节流  应用到按钮上，其实就是禁用按钮
// 防止按钮多次点击，多次请求
export default {
	mounted(el, binding) {
		const time = binding.value?.time || 1000
		el.timer = null

		el.addEventListener('click', () => {
			el.disabled = true

			if (el.timer !== null) {
				clearTimeout(el.timer)
				el.timer = null
				el.disabled = true
			}
			el.timer = setTimeout(() => {
				el.disabled = false
			}, time)
		})
	}
}