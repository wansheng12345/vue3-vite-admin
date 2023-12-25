<template>
	<div class="editor-page">
		<h1>自定义的Editor</h1>
		<br>
		<Quill ref="MsgText" refs="MsgText"></Quill>
		<el-button type="primary" @click="handleGetContent(1)" plain>获取内容</el-button>
		<br>
		<h1>正常的Editor</h1>
		<editor ref="editorRef" v-model="content"></editor>
		<el-button type="primary" @click="handleGetContent(2)" plain>获取内容</el-button>
	</div>
</template>

<script setup>
	import {
		ref
	} from "vue"
	import Quill from "./quill";
	const MsgText = ref(null)

	function getList() {
		MsgText.value?.setContent('测试');
	}

	const content = ref('测试22')
	onMounted(() => {
		getList()
	})
	const editorRef = ref(null)

	function handleGetContent(type = 1) {
		let content;
		if (type == 1) {
			content = MsgText.value?.getContent();
		} else {
			content = editorRef.value?.getContent()
		}
		console.log(content);
	}
</script>

<style lang="scss" scoped>
	.editor-page {
		padding: 10px 50px;

		.el-button {
			margin: 10px 0;
		}
	}
</style>