import {
	getCurrentInstance,
} from "vue";
export default function useContextMenu() {
	const  {
		proxy
	} = getCurrentInstance();
	const fn = (e) => {
		proxy.$contextmenu({
			theme: 'win10 dark',
			items: [{
				label: "菜单1",
				icon: h('img', {
					src: 'https://imengyu.top/assets/images/test/icon.png',
					style: {
						width: '18px',
						height: '18px',
					}
				}),
				onClick: () => {
					console.log(111, '传递的参数是' + str);
				}
			},
			{
				label: "菜单2",
				children: [{
					label: "菜单2-1",
					icon: 'Edit'
				},
				{
					label: "菜单2-2"
				},
				{
					label: "菜单2-3"
				},
				]
			},
			],
			x: e.x,
			y: e.y,
			customClass: "class-a", // 自定义公共的class
			iconFontClass: '',
		});
	}
	return {
		fn,
	}
}