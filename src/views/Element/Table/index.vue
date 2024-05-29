<template>
	<div class="table-page">
		<el-table :data="tableData" border :span-method="objectSpanMethod" style="width: 100%">
			<el-table-column v-for="item in tableColumn" :key="item.prop" show-overflow-tooltip align="center"
				:prop="item.prop" :label="item.label" min-width="180" />
			<el-table-column label="操作" prop="caozuo" width="200" align="center" fixed="right">
				<template #default="{row}">
					<el-button>编辑{{row.name}}</el-button>
				</template>
			</el-table-column>
		</el-table>
		<hr>
		<el-button type="primary" @click="open">汲取 {{sRGBHex}}</el-button>
		<br>
		<el-table :data="tableData" ref="tableRef" @row-click="handleRowClick" border highlight-current-row>
			<el-table-column v-for="item in tableColumn" :key="item.prop" show-overflow-tooltip align="center"
				:prop="item.prop" :label="item.label" min-width="180" />
		</el-table>
		<el-button type="info" @click="clearIndex">清空</el-button>
		<el-button type="warning" @click="setClick">设置第一行</el-button>
	</div>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		useEyeDropper
	} from "@vueuse/core"
	const {
		isSupported,
		open,
		sRGBHex
	} = useEyeDropper()
	const tableColumn = ref([{
			prop: 'time',
			label: '时间',
		},
		{
			prop: 'grade',
			label: '年级',
		},
		{
			prop: 'name',
			label: '姓名',
		},
		{
			prop: 'subjects',
			label: '科目',
		},
		{
			prop: 'score',
			label: '成绩',
		},
	])
	const tableData = ref([])
	let mergeObj = ref([]); //合并索引集合
	const mergeArr = [
		'time', 'grade', 'name', 'subjects', 'caozuo'
	]; // 合并的列
	function getSpanArr(data) {
		let count = 0;
		mergeObj.value = [];
		data.forEach((item, index) => {
			if (index === 0) {
				mergeObj.value.push(1);
			} else {
				if (item['time'] === data[index - 1]['time']) {
					mergeObj.value[count] += 1;
					mergeObj.value.push(0);
				} else {
					count = index;
					mergeObj.value.push(1);
				}
			}
		})
	}

	function objectSpanMethod({
		row,
		column,
		rowIndex,
		columnIndex
	}) {
		if (mergeArr.indexOf(column.property) !== -1) {
			if (mergeObj.value[rowIndex]) {
				return [mergeObj.value[rowIndex], 1];
			} else {
				return [0, 0];
			}
		}
	}

	function getList() {
		tableData.value = [{
				time: '2020-08-10',
				grade: 'l1',
				name: '小明',
				subjects: '语文',
				score: 80,
				id: 1
			},
			{
				time: '2020-08-10',
				grade: 'l1',
				name: '小明',
				subjects: '数学',
				score: 80,
				id: 1
			},
			{
				time: '2020-08-11',
				grade: 'l2',
				name: '小雷',
				subjects: '语文',
				score: 70,
				id: 3
			},
			{
				time: '2020-08-11',
				grade: 'l2',
				name: '小雷',
				subjects: '数学',
				score: 80,
				id: 3
			},
			{
				time: '2020-08-12',
				grade: 'l3',
				name: '小花',
				subjects: '语文',
				score: 60,
				id: 3
			},
			{
				time: '2020-08-12',
				grade: 'l3',
				name: '小花',
				subjects: '数学',
				score: 60,
				id: 3
			},
			{
				time: '2020-08-13',
				grade: 'l4',
				name: '小李',
				subjects: '数学',
				score: 75,
				id: 3
			}
		]
		getSpanArr(tableData.value)
	}
	getList()
	const tableRef = ref(null)

	function handleRowClick(row, index) {
		console.log(row, index);
	}

	function clearIndex() {
		tableRef.value.setCurrentRow()
	}

	function setClick() {
		tableRef.value.setCurrentRow(tableData.value[0])
	}
</script>

<style lang="scss" scoped>
	.table-page {
		width: 100%;
		height: 100%;
		padding: 10px 20px;
	}
</style>
<style lang="scss">
	.el-table__body tr.current-row>td {
		background-color: var(--el-color-primary) !important;
		color: #f5f5f5;
	}
</style>