// 自定义滚动动画指令
const DISTANCE = 100; // 偏移量
const DURATION = 500; // 动画时间
const map = new WeakMap();
const io = new IntersectionObserver(entries => {
	console.log(entries);
	entries.forEach(el => {
		if (el.isIntersecting) {
			// 出现在视口中
			const animation = map.get(el.target);
			animation && animation.play();
			io.unobserve(el.target); // 出现之后停止监听
		}
	})
});

function isBelowViewport(el) {
	const rect = el.getBoundingClientRect();
	return rect.top > window.innerHeight;
}
export default {
	mounted(el, {
		value = DISTANCE
	}) {
		// 判断是否在视口中 首屏不需要执行
		if (!isBelowViewport(el)) {
			return
		}
		const animation = el.animate([{
				transform: `translateY(${value}px)`,
				opacity: 0.5
			},
			{
				transform: 'translateY(0)',
				opacity: 1
			}

		], {
			duration: DURATION,
			ease: 'ease-out',
			fill: 'forwards'
		})
		animation.pause();
		map.set(el, animation);
		io.observe(el);
	},
	onUnmounted(el) {
		io.unobserve(el);
	}
}