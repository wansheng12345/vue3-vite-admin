<template>
	<el-dialog v-model="visible">
		<h1>这是弹窗的内容</h1>
	</el-dialog>
</template>

<script setup>
	import {
		computed
	} from 'vue'
	const props = defineProps({
		modelValue: {
			type: Boolean,
			default: false
		}
	})
	const emits = defineEmits(['update:modelValue'])
	const visible = computed({
		get: () => props.modelValue,
		set: (val) => {
			emits('update:modelValue', val)
		}
	})
</script>

<style scoped lang="scss">
</style>