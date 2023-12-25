<template>
	<div class="operation-manual-page">
		<div class="left scroll-box">
			<ul class="F-ul">
				<li v-for="item in menuList" :key="item.code" :class="{active:Index==item.code}">
					<span @click="clickTitle(1,item)">{{item.name}}</span>
					<ul class="S-ul" v-if='item.subItem'>
						<li v-for="v in item.subItem" :key='v.code' :class="{active:Index==v.code}"
							@click="clickTitle(2,v)">
							<span>{{v.name}}</span>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="right">
			<Mark ref="mark"></Mark>
		</div>
	</div>
</template>

<script setup>
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	import Mark from "./../Element/Markdown/index.vue"
	const Index = ref(1)
	const menuList = ref([{
			name: '准备工作',
			code: 1,
			subItem: [{
					name: '第一步',
					code: 101
				},
				{
					name: '第二步',
					code: 102
				}
			]
		},
		{
			name: '系统登录',
			code: 2,
		},
		{
			name: '快速开始',
			code: 3,
		},
		{
			name: '设备数据',
			code: 4,
		},
		{
			name: '常见问题及解决办法',
			code: 5,
		},
		{
			name: '主数据管理',
			code: 6,
		},
		{
			name: '门户管理',
			code: 7,
		},
		{
			name: '日志管理',
			code: 8,
		},
		{
			name: 'Oee分析',
			code: 9,
		},
		{
			name: '设备健康管理',
			code: 10,
		},
		{
			name: '设备管理',
			code: 11,
		},
		{
			name: '监控管理',
			code: 12,
		},
		{
			name: '量检具管理',
			code: 13,
		},
		{
			name: '设备点选',
			code: 14,
		},
	])
	const mark = ref(null)

	function getMarkData(data = menuList.value[0]) {
		mark.value.load(data)
	}

	function clickTitle(type, item) {
		Index.value = item.code
		getMarkData(item)
	}
	onMounted(() => {
		getMarkData()
	})
</script>

<style scoped lang="scss">
	.operation-manual-page {
		padding: 5px 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		color: #656565;

		&>div {
			height: 100%;
			width: 100%;

			&.left {
				width: 200px;
				overflow-y: auto;

				ul.F-ul {

					&>li {
						line-height: 32px;
						cursor: pointer;
						padding: 0px 10px;

						&:hover {}

						&.active {
							&>span {
								color: #55aaff;
							}
						}

						&>ul {
							padding-left: 18px;
							font-size: 14px;
							color: #999;

							&>li {
								&.active {
									color: #55aaff;
								}
							}
						}
					}
				}
			}

			&.right {
				flex: 1;
				margin-left: 10px;
				border: 1px solid #e5e5e5;
			}
		}
	}
</style>