<template>
	<div class="markdown-page">
		<div class="btn">
			<el-button @click="handleTo">跳转</el-button>
			<el-button @click="handleClick" type="primary">{{mode=='preview'?'编辑':'预览'}}</el-button>
		</div>
		<v-md-editor v-model="text" height="95%" :mode="mode" @upload-image="handleUploadImage" :default-show-toc='true'
			ref="preview" :include-level="[1,2,3,4,5]" @save="handleSave" :left-toolbar="toolbar"></v-md-editor>
	</div>
</template>

<script setup>
	const text = ref('')
	const toolbar = ref(
		'undo redo clear | tip  | h bold italic strikethrough quote | ul ol table hr | link image code | save')
	const mode = ref('preview')

	function handleClick() {
		if (mode.value == 'preview') {
			mode.value = 'editable'
		} else {
			mode.value = 'preview'
		}
	}

	function handleUploadImage(event, insertImage, files) {
		console.log(event, insertImage, files);
	}

	function handleSave(text, html) {
		console.log(text);
		console.log('html', html);
	}
	const preview = ref(null)
	const List = ref([])

	function handleTo() {
		let obj = List.value.filter(v => v.title == '第二步')
		console.log(obj);
		const heading = preview.value.$el.querySelector(`[data-v-md-line="${obj[0].lineIndex}"]`);
		console.log(heading, preview.value);
		if (heading) {
			preview.value.editorScrollToLine({
				target: heading,
				scrollContainer: window,
				top: 60,
			});
		}
	}

	function load(data) {
		console.log(111, data);
		text.value = `	
# ${data.name}
		
## 第一步


::: tip
  在此输入内容
:::

::: tip
  在此输入内容
:::

::: warning
  在此输入内容
:::

::: warning
  在此输入内容
:::

::: danger
  在此输入内容
:::

::: danger
  在此输入内容
:::

## 第二步

::: tip
  在此输入内容
:::

::: tip
  在此输入内容
:::

::: warning
  在此输入内容
:::

::: warning
  在此输入内容
:::

::: danger
  在此输入内容
:::

::: danger
  在此输入内容
:::
		`
		nextTick(() => {
			const heading = preview.value.$el.querySelectorAll(`h1,h2,h3,h4,h5,h6`)
			console.log(heading);
			const titles = Array.from(heading).filter((title) => !!title.innerText.trim());
			console.log(titles);
			const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();
			console.log(hTags);
			let arr = titles.map((el) => ({
				title: el.innerText,
				lineIndex: el.getAttribute('data-v-md-line'),
				indent: hTags.indexOf(el.tagName),
			}));
			List.value = arr;
			console.log(arr);
		})
	}
	defineExpose({
		load
	})
</script>

<style lang="scss" scoped>
	.markdown-page {
		height: 100%;
		width: 100%;

		.btn {
			text-align: right;
		}
	}
</style>