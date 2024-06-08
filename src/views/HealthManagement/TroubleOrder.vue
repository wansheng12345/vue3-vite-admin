<template>
	<div class="test2-page box" ref="box">
		<div class="left">
			<!--左侧div内容-->
		</div>
		<div class="resize">
			⋮
		</div>
		<div class="right">
			<!--右侧div内容-->
			<el-form :model="Form" :inline="true">
				<el-row>
					<el-form-item label="List1">
						<el-select v-model="Form.list1" @change="handleChange" multiple filterable collapse-tags
							collapse-tags-tooltip clearable>
							<el-option :label="v.name" :value="v.code" :key="v.code"
								:disabled="disabledOption(v.code, Form.list1)" v-for="v of Options"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="List2">
						<el-select v-model="Form.list2" @change="handleChange" multiple filterable collapse-tags
							collapse-tags-tooltip clearable>
							<el-option :label="v.name" :value="v.code" :key="v.code"
								:disabled="disabledOption(v.code, Form.list2)" v-for="v of Options"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="List3">
						<el-select v-model="Form.list3" @change="handleChange" multiple filterable>
							<el-option :label="v.name" :value="v.code" :key="v.code"
								:disabled="disabledOption(v.code, Form.list3)" v-for="v of Options"></el-option>
						</el-select>
					</el-form-item>
				</el-row>
			</el-form>
			<!-- 鼠标右键 -->
			<section>
				<div class="row">
					<div class="main" @contextmenu="onContextMenu($event,'传递的字符串')">
						函数时调用右键菜单
					</div>
					<div class="main" @contextmenu.prevent="showMenu($event,'2222')">组件式调用右键菜单

						<!-- <el-button @click="showMenu($event,'2222')">点击显示菜单</el-button> -->
					</div>
				</div>
			</section>
			<!-- <context-menu v-model:show="show" :options="optionsComponent">
				<context-menu-item label="Simple item" @click="onMenuClick(1)">
					<template #icon>
						<img src="https://imengyu.top/assets/images/test/icon.png" style="width:20px;height:20px" />
					</template>
				</context-menu-item>
				<context-menu-group label="Menu with child">
					<context-menu-item label="Item1" @click="onMenuClick(2)" />
					<context-menu-item label="Item2" @click="onMenuClick(3)" />
					<context-menu-group label="Child with">
						<context-menu-item v-for="index of 3" :key="index" :label="'Item3-'+index" />
					</context-menu-group>
				</context-menu-group>
			</context-menu> -->
		</div>
	</div>
</template>

<script setup>
	import {
		h,
		reactive
	} from 'vue'
	import useContextMenu from '@/hooks/useContextMenu';
	const {
		fn
	} = useContextMenu();

	function onContextMenu(e, str) {
		e.preventDefault();
		fn(e)
		// console.log(str); // contextmenu.showContextMenu
		// proxy.$contextmenu({
		// 	theme: 'win10 dark',
		// 	items: [{
		// 			label: "菜单1",
		// 			icon: h('img', {
		// 				src: 'https://imengyu.top/assets/images/test/icon.png',
		// 				style: {
		// 					width: '18px',
		// 					height: '18px',
		// 				}
		// 			}),
		// 			onClick: () => {
		// 				console.log(111, '传递的参数是' + str);
		// 			}
		// 		},
		// 		{
		// 			label: "菜单2",
		// 			children: [{
		// 					label: "菜单2-1",
		// 					icon: 'Edit'
		// 				},
		// 				{
		// 					label: "菜单2-2"
		// 				},
		// 				{
		// 					label: "菜单2-3"
		// 				},
		// 			]
		// 		},
		// 	],
		// 	x: e.x,
		// 	y: e.y,
		// 	customClass: "class-a", // 自定义公共的class
		// 	iconFontClass: '',
		// });
	}
	// 组件式调用右键菜单
	const show = ref(false);
	const optionsComponent = reactive({
		theme: 'mac',
		zIndex: 3,
		x: 500,
		y: 200
	})

	function showMenu(e) {
		console.log(e);
		optionsComponent.x = e.x;
		optionsComponent.y = e.y;
		show.value = true;
	}

	function onMenuClick() {}
	const Form = ref({
		list1: [],
		list2: [],
		list3: [],
	});
	const Options = ref([{
			name: "苹果",
			code: "apple",
		},
		{
			name: "香蕉",
			code: "banana",
		},
		{
			name: "橘子",
			code: "orange",
		},
		{
			name: "火龙果",
			code: "dragonfruit",
		},
		{
			name: "葡萄",
			code: "grape",
		},
		{
			name: "西瓜",
			code: "watermelon",
		},
	]);
	const selectOption = ref([]); // 所有的选项
	function handleChange() {
		// 可以使用计算属性，但必须提前声明 list1, list2, list3 是空数组，没有必要，因为下拉选项变了，也要重新计算
		let {
			list1,
			list2,
			list3
		} = Form.value;
		selectOption.value = [...new Set([...list1, ...list2, ...list3])];
	}
	const disabledOption = (val, vModel) => {
		// 当列表选中的项存在于公共列表，但是不存在于当前列表的时候给禁用掉
		return selectOption.value.indexOf(val) >= 0 && vModel.indexOf(val) == -1;
	};
	// 点击收缩的js
	function dragControllerDiv() {
		var resize = document.getElementsByClassName('resize');
		var left = document.getElementsByClassName('left');
		var right = document.getElementsByClassName('right');
		var box = document.getElementsByClassName('box');
		for (let i = 0; i < resize.length; i++) {
			// 鼠标按下事件
			resize[i].onmousedown = function(e) {
				//颜色改变提醒
				resize[i].style.background = '#818181';
				resize[i].style.color = '#fff';
				var startX = e.clientX;
				resize[i].left = resize[i].offsetLeft;
				// 鼠标拖动事件
				document.onmousemove = function(e) {
					var endX = e.clientX;
					var moveLen = resize[i].left + (endX -
						startX); // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
					var maxT = box[i].clientWidth - resize[i].offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度

					// if (moveLen < 32) moveLen = 32; // 左边区域的最小宽度为32px
					// if (moveLen > maxT - 150) moveLen = maxT - 150; //右边区域最小宽度为150px
					/* 左边最小值 20% */
					if (moveLen < box[i].clientWidth * .2) moveLen = box[i].clientWidth * .2;
					/* 左边最大值 80% */
					let leftMaxWith = box[i].clientWidth * .8;
					if (moveLen > leftMaxWith) moveLen = leftMaxWith;

					resize[i].style.left = moveLen; // 设置左侧区域的宽度

					for (let j = 0; j < left.length; j++) {
						left[j].style.width = moveLen + 'px';
						right[j].style.width = (box[i].clientWidth - moveLen - 40) + 'px';
					}
				};
				// 鼠标松开事件
				document.onmouseup = function(evt) {
					//颜色恢复
					resize[i].style.background = '#d6d6d6';
					document.onmousemove = null;
					document.onmouseup = null;
					resize[i].releaseCapture && resize[i]
						.releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
				};
				resize[i].setCapture && resize[i].setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
				return false;
			};
		}
	}
	onMounted(() => {
		dragControllerDiv()
	})
</script>
<style lang="scss" scoped>
	.test2-page {
		padding: 10px 15px;

		.row {
			display: flex;
			align-items: center;

			.main {
				width: 400px;
				height: 280px;
				padding: 10px;
				color: #666;
				background: skyblue;
				margin-right: 20px;
			}
		}
	}

	.box {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		// box-shadow: -1px 9px 10px 3px rgba(0, 0, 0, 0.11);

		/*左侧div样式*/
		.left {
			width: calc(20% - 15px);
			/*左侧初始化宽度*/
			height: 100%;
			background: #FFFFFF;
			box-shadow: -1px 9px 10px 3px rgba(0, 0, 0, 0.11);
			position: relative;
		}

		/*拖拽区div样式*/
		.resize {
			cursor: col-resize;
			position: relative;
			z-index: 1;
			top: 50%;
			transform: translateY(-50%);
			left:0px;
			background-color: #d6d6d6;
			border-radius: 5px;
			width: 10px;
			height: 50px;
			display: flex;
			align-items: center;
			font-size: 32px;
			color: #fff;

			&:hover {
				color: #666666;
			}
		}

		/*右侧div'样式*/
		.right {
			border: 1px solid #e5e5e5;
			width: 79%;
			/*右侧初始化宽度*/
			height: 100%;
			background: #fff;
			padding: 10px 20px;
			// box-shadow: -1px 4px 5px 3px rgba(0, 0, 0, 0.11);
		}

	}
</style>
<style lang="scss">
	.mx-context-menu-item {
		padding: 12px 15px !important;
	}
</style>