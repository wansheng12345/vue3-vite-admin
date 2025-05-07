<script setup>
	// import {
	// 	uploadFiles
	// } from "@/api/index";
	import "@vueup/vue-quill/dist/vue-quill.snow.css";
	import {
		QuillEditor,
		Quill
	} from "@vueup/vue-quill";
	// import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter'
	// Quill.register("modules/blotFormatter", BlotFormatter); // 自定义图片上传
	const props = defineProps({
		disabled: {
			type: Boolean,
			default: false,
		},
		placeholder: {
			type: String,
			default: "请输入内容"
		}
	})
	const options = ref({
		theme: "snow",
		bounds: document.body,
		debug: "warn",
		modules: {
			// 工具栏配置
			toolbar: {
				container: [
					['bold', 'italic', 'underline', 'strike'], // 加粗'bold', 斜体 下划线 删除线
					[{
						color: []
					}, {
						background: []
					}], // 字体颜色、字体背景颜色
					[{
						align: []
					}], // 对齐方式
					[{
						size: ['small', false, 'large', 'huge']
					}], // 字体大小
					[{
						font: []
					}], // 字体种类
					[{
						header: [1, 2, 3, 4, 5, 6, false]
					}], // 标题
					[{
						indent: '-1'
					}, {
						indent: '+1'
					}], // 缩进
					[{
						list: 'ordered'
					}, {
						list: 'bullet'
					}], // 有序、无序列表
					[{
						script: 'sub'
					}, {
						script: 'super'
					}], // 上标/下标
					['blockquote', ], // 引用  代码块 'code-block'
					['clean'], // 清除文本格式
					['link', 'image', ], // 链接、图片、视频  'video'
				],
				// handlers: {
				// 	image: imageHandler, // 点击图片触发事件
				// },
			},
			// blotFormatter: {
			// 	// 允许缩放的最小/最大比例
			// 	scaling: {
			// 		min: 0.2, // 最小缩放比例
			// 		max: 3, // 最大缩放比例
			// 	},
			// 	// 调整手柄样式
			// 	overlay: {
			// 		style: {
			// 			border: '2px dashed #1890ff',
			// 		}
			// 	}
			// }
		},
		placeholder: props.placeholder,
		readOnly: props.disabled,
	});

	const myQuillEditor = ref(null);

	function imageHandler() {
		if (props.disabled) {
			return
		}
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.style.display = 'none';
		// 监听文件选择
		input.onchange = async (e) => {
			const file = e.target.files[0];
			if (!file) return;

			const quill = myQuillEditor.value.getQuill();
			const range = quill.getSelection(true); // 显示上传中占位符
			try {
				// quill.insertEmbed(range.index, 'image', '/assets/logo/newlogo.png', 'user');
				// 上传图片到服务器
				const imageUrl = await uploadImageToServer(file);
				// 替换占位图为真实 URL
				quill.deleteText(range.index, 1);
				quill.insertEmbed(range.index, 'image', imageUrl, 'user');
				quill.setSelection(range.index + 1);
			} catch (error) {
				console.error('Upload failed:', error);
				quill.deleteText(range.index, 1); // 删除占位符
			}
		}
		document.body.appendChild(input);
		input.click();
		document.body.removeChild(input);
	}
	async function uploadImageToServer(file) {
		if (file) {
			const formData = new FormData();
			formData.append('files', file);
			const res = await uploadFiles(formData, "upload/测试文件夹")
			return res.result[0].url;
		}
	}

	function onEditorReady() {
		initTitle()
	}
	const initTitle = () => {
		for (let item of titleConfig) {
			// .editor 是富文本编辑器的类名
			let tip = document.querySelector('.editor ' + item.Choice);
			if (tip) {
				tip.setAttribute('title', item.title);
			}
		}
	}
	const titleConfig = [{
			Choice: '.ql-insertMetric',
			title: '跳转配置'
		},
		{
			Choice: '.ql-bold',
			title: '加粗'
		},
		{
			Choice: '.ql-italic',
			title: '斜体'
		},
		{
			Choice: '.ql-underline',
			title: '下划线'
		},
		{
			Choice: '.ql-header',
			title: '段落格式'
		},
		{
			Choice: '.ql-strike',
			title: '删除线'
		},
		{
			Choice: '.ql-blockquote',
			title: '块引用'
		},
		{
			Choice: '.ql-code',
			title: '插入代码'
		},
		{
			Choice: '.ql-code-block',
			title: '插入代码段'
		},
		{
			Choice: '.ql-font',
			title: '字体'
		},
		{
			Choice: '.ql-size',
			title: '字体大小'
		},
		{
			Choice: '.ql-list[value="ordered"]',
			title: '编号列表'
		},
		{
			Choice: '.ql-list[value="bullet"]',
			title: '项目列表'
		},
		{
			Choice: '.ql-direction',
			title: '文本方向'
		},
		{
			Choice: '.ql-header[value="1"]',
			title: 'h1'
		},
		{
			Choice: '.ql-header[value="2"]',
			title: 'h2'
		},
		{
			Choice: '.ql-align',
			title: '对齐方式'
		},
		{
			Choice: '.ql-color',
			title: '字体颜色'
		},
		{
			Choice: '.ql-background',
			title: '背景颜色'
		},
		{
			Choice: '.ql-image',
			title: '图像'
		},
		{
			Choice: '.ql-video',
			title: '视频'
		},
		{
			Choice: '.ql-link',
			title: '添加链接'
		},
		{
			Choice: '.ql-formula',
			title: '插入公式'
		},
		{
			Choice: '.ql-clean',
			title: '清除字体格式'
		},
		{
			Choice: '.ql-script[value="sub"]',
			title: '下标'
		},
		{
			Choice: '.ql-script[value="super"]',
			title: '上标'
		},
		{
			Choice: '.ql-indent[value="-1"]',
			title: '向左缩进'
		},
		{
			Choice: '.ql-indent[value="+1"]',
			title: '向右缩进'
		},
		{
			Choice: '.ql-header .ql-picker-label',
			title: '标题大小'
		},
		{
			Choice: '.ql-header .ql-picker-item[data-value="1"]',
			title: '标题一'
		},
		{
			Choice: '.ql-header .ql-picker-item[data-value="2"]',
			title: '标题二'
		},
		{
			Choice: '.ql-header .ql-picker-item[data-value="3"]',
			title: '标题三'
		},
		{
			Choice: '.ql-header .ql-picker-item[data-value="4"]',
			title: '标题四'
		},
		{
			Choice: '.ql-header .ql-picker-item[data-value="5"]',
			title: '标题五'
		},
		{
			Choice: '.ql-header .ql-picker-item[data-value="6"]',
			title: '标题六'
		},
		{
			Choice: '.ql-header .ql-picker-item:last-child',
			title: '标准'
		},
		{
			Choice: '.ql-size .ql-picker-item[data-value="small"]',
			title: '小号'
		},
		{
			Choice: '.ql-size .ql-picker-item[data-value="large"]',
			title: '大号'
		},
		{
			Choice: '.ql-size .ql-picker-item[data-value="huge"]',
			title: '超大号'
		},
		{
			Choice: '.ql-size .ql-picker-item:nth-child(2)',
			title: '标准'
		},
		{
			Choice: '.ql-align .ql-picker-item:first-child',
			title: '居左对齐'
		},
		{
			Choice: '.ql-align .ql-picker-item[data-value="center"]',
			title: '居中对齐'
		},
		{
			Choice: '.ql-align .ql-picker-item[data-value="right"]',
			title: '居右对齐'
		},
		{
			Choice: '.ql-align .ql-picker-item[data-value="justify"]',
			title: '两端对齐'
		}
	]

	function GetContent() {
		return myQuillEditor.value?.getHTML()
	}

	function SetContent(text = '') {
		// myQuillEditor.value?.setHTML(text)
		if (!myQuillEditor.value) return;
		const quill = myQuillEditor.value.getQuill();
		quill.root.innerHTML = text; // 直接操作 DOM
		quill.update(Quill.sources.USER); // 强制更新编辑器状态
		// 手动移除空白状态
		if (text.trim() !== '') {
			quill.root.classList.remove('ql-blank');
		}
	}
	defineExpose({
		GetContent,
		SetContent
	})
</script>
<template>
	<div class="editor">
		<quill-editor ref="myQuillEditor" :options="options" @ready="onEditorReady">
		</quill-editor>
	</div>
</template>
<style lang="scss">
	.editor {
		padding: 10px;
		height: 100%;
		display: flex;
		flex-direction: column;

		.ql-container {
			width: 100%;
			flex: 1;
			overflow: hidden;
		}

		.ql-toolbar.ql-snow {
			width: 100% !important;
		}
	}
</style>