<template>
	<div class="HighFrequency-Page">
		<div class="menu-box">
			<h3>属性</h3>
			<ul>
				<li v-for="v in mark0" @click="insertText(v,0)">
					<div>{{v.name}}</div>
				</li>
			</ul>
			<h3>测点</h3>
			<ul>
				<li v-for="v in mark1" @click="insertText(v,1)">
					<div>{{v.name}}</div>
				</li>
			</ul>
		</div>
		<quill-editor v-model:content="content" class="myQuill" ref="editorRef" @click="handleClick"
			@textChange="handleClick" :options="options"></quill-editor>
		<br />
		{{`鼠标最后的位置: ${lastIndex.index}`}}
	</div>
</template>

<script setup>
	import {
		QuillEditor
	} from "@vueup/vue-quill";
	const {
		proxy
	} = getCurrentInstance();
	const content = ref('这是一段测试的文字')
	const editorRef = ref(null)
	const options = ref({
		modules: {
			toolbar: false
		}
	})
	const lastIndex = ref({});
	const Quill = ref(null)

	function handleClick() {
		Quill.value = proxy.$refs.editorRef?.getQuill();
		let select = Quill.value?.getSelection();
		let text = Quill.value?.getText().replace(/\n/g, "")
		console.log(select, text.length);
		lastIndex.value = select || {
			index: text.length,
			length: 0
		};
	}
	// 属性
	const mark0 = ref([{
			code: 'PS_T_L',
			name: '温度_下限'
		},
		{
			code: 'PS_TORQUE_U',
			name: '扭矩预警上限'
		}
	])
	// 测点
	const mark1 = ref([{
			code: 'PR_TENS',
			name: '张力'
		},
		{
			code: 'PR_E_T',
			name: '极片温度'
		}
	])
	// 插入文字
	function insertText(row, type) {
		let Q = proxy.$refs.editorRef?.getQuill();
		let contents = Q.getText();
		let insetStrStar = '原神';
		let i = lastIndex.value.index;
		let str = contents.slice(0, i) + insetStrStar + contents.slice(i);
		console.log(Q, i, i + insetStrStar.length);
		Q.setText(str);
		Q.setSelection(i + insetStrStar.length)
		lastIndex.value = {
			index: i + insetStrStar.length,
			length: 0
		}
		// Q.formatText(i, 7, {
		// 	background: `#f00`,
		// 	color: '#0f0'
		// })
		// 设置样式之后还原
		// Q.formatText(7, str.length, {
		// 	background: `#fff`,
		// 	color: '#333'
		// })
	}
	onMounted(() => {
		proxy.$refs.editorRef.getQuill()?.setText(content.value)
	})
</script>

<style lang="scss" scoped>
	.HighFrequency-Page {
		padding: 20px;
		display: flex;

		.menu-box {
			min-width: 200px;

			h3 {
				color: #222;
				line-height: 40px;
			}

			ul {
				padding-left: 1em;

				li {
					div {
						color: #444;
						font-size: 14px;
						line-height: 30px;
						cursor: pointer;
					}
				}
			}
		}

		:deep(.myQuill) {
			height: 180px;
			width: 600px;
			border: 1px solid #999;
			font-size: 18px;
		}
	}
</style>