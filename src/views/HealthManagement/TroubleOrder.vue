<template>
	<div class="test2-page">
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
	</div>
</template>

<script setup>
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
</script>
<style lang="scss" scoped>
	.test2-page {
		padding: 20px 50px;
	}
</style>