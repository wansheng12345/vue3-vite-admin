/*
     图片懒加载 + 动画
*/
const DISTANCE = 100; // 偏移量
const DURATION = 500; // 动画时间
const map = new WeakMap();
// 写在外面指挥执行一个io，如果在mounted里面执行，会多次 外面执行需要存储 el 对应的animation
const io = new IntersectionObserver(entries => {
	entries.forEach(el => {
		if (el.isIntersecting) {
			// 出现在视口中
			const animation = map.get(el.target);
			const src = el.target.dataset.src; // 请求后端后返回图片路径
			el.target.removeAttribute('data-src');
			el.target.src = src;
			animation && animation.play(); // 执行动画
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
		// 判断是否在视口中 如果执行 已经出现在视口中不会执行
		// if(!isBelowViewport(el)){
		//     return 
		// }
		console.log(el);
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

/*
     单纯的懒加载图片
*/
// const io=new IntersectionObserver(item=>{
//     item.forEach(el=>{
//         if(el.isIntersecting){
//             const src=map.get(el.target);
//             el.target.removeAttribute('data-src');
//             el.target.src=src;
//             io.unobserve(el.target);
//         }
//     })
// })
// export default{
//     mounted(el) {
//         const src=el.dataset.src;
//         map.set(el,src)
//         io.observe(el);
//     },
//     onUnmounted(el){
//         io.unobserve(el);
//     }
// }