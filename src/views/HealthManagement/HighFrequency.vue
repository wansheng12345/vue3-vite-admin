<template>
	<div class="High-page">
		<h1>数组对象模糊查询</h1>
		<el-input v-model="search" placeholder="请输入查询的关键字" @change="handleChange"></el-input>
		<div class="box">
			<el-table :data="tableList" border>
				<el-table-column prop="name" label="姓名" width="180" />
				<el-table-column prop="age" label="年龄" />
				<el-table-column prop="str" label="名句" />
			</el-table>
		</div>
	</div>
</template>
<script setup>
	import {
		ref
	} from 'vue';
	const search = ref('');
	const tableList = ref([]);

	function getList() {
		tableList.value = [{
				name: '李白',
				age: 28,
				str: '大鹏一日同风起,扶摇直上九万里'
			},
			{
				name: '杜甫',
				age: 17,
				str: '风急天高猿啸哀,渚清沙白鸟飞回'
			},
			{
				name: '杜牧',
				age: 15,
				str: '春风十里扬州路,卷上珠帘总不如',
			},
			{
				name: '李商隐',
				age: 14,
				str: '锦瑟无端五十弦,一弦一柱思华年'
			}
		]
	}
	getList()

	function handleChange() {
		if (search.value == '') {
			return getList()
		}
		let arr = tableList.value.filter(v => {
			return v.str.indexOf(search.value) > -1
		})
		tableList.value = arr;
	}
</script>
<style lang="scss">
	.High-page {
		width: 100%;
		height: 100%;

		.el-input {
			width: 50%;
			margin: 20px auto;
		}

		.box {
			width: 60%;
		}
	}
</style>