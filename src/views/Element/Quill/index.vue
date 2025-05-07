<script setup>
	import Quill from "@/components/Quill/index.vue"
	const quillRef = ref(null)

	function handleSet() {
		quillRef.value?.SetContent("<p>Hello World</p>")
	}

	function handleGet() {
		console.log(quillRef.value?.GetContent())
	}
</script>
<template>
	<div class="test-page">
		<Quill ref="quillRef"></Quill>
		<el-button @click="handleSet">设置内容</el-button>
		<el-button @click="handleGet">获取内容</el-button>
	</div>
</template>
<style lang="scss" scoped>
	.test-page {
		width: 100%;
		height: 300px;
	}
</style>