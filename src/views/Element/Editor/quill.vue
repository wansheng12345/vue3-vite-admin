<template>
	<div class="editor-container" :class="props.refs">
		<quill-editor v-model:content="content" :options="options" ref="myQuillEditor" :style="styles">
		</quill-editor>
	</div>
</template>

<script setup>
	import {
		QuillEditor
	} from "@vueup/vue-quill";
	// import { getLimitedParas } from "@/api/Equipment-management/Message";
	import "@vueup/vue-quill/dist/vue-quill.snow.css";
	const {
		proxy
	} = getCurrentInstance();
	const props = defineProps({
		refs: {
			type: String,
			default: "test",
		},
	});
	let TextList = ref([{
			code: "assertName",
			name: "资产设备",
		},
		{
			code: "markName",
			name: "测点值",
		},
		{
			code: "lastValue",
			name: "告警值",
		},
		{
			code: "currentValue",
			name: "恢复值",
		},
		{
			code: "alarmTime",
			name: "告警时间",
		},
		{
			code: "recTime",
			name: "恢复时间",
		},
		{
			code: "lastTime",
			name: "持续时长（分钟）",
		},
		{
			code: "Success",
			name: "正常",
		},
		{
			code: "Fail",
			name: "异常",
		},
	]);
	// const myQuillEditor = ref(null);
	const options = ref({
		theme: "snow",
		modules: {
			// 工具栏配置
			toolbar: {
				container: TextList.value.map((v) => v.code),
				handlers: {
					assertName: () => insertFn("assertName"),
					markName: () => insertFn("markName"),
					alarmTime: () => insertFn("alarmTime"),
					lastTime: () => insertFn("lastTime"),
					currentValue: () => insertFn("currentValue"),
					recTime: () => insertFn("recTime"),
					lastValue: () => insertFn("lastValue"),
					Success: () => selectFn("Success"),
					Fail: () => selectFn("Fail"),
				},
			},
		},
		placeholder: "请输入内容",
	});

	function insertFn(insertStr = "") {
		let Quill = proxy.$refs.myQuillEditor?.getQuill();
		let index = Quill?.selection?.savedRange?.index;
		Quill?.insertEmbed(index, "text", ` @${insertStr} `);
		Quill?.setSelection(index + insertStr.length + 3);
	}

	function selectFn(type = "") {
		let Quill = proxy.$refs.myQuillEditor?.getQuill(true);
		let delta = Quill.getSelection(); // 选中的其实结束位置
		let contents = Quill.getText();
		let start = delta.index;
		let end = start + delta.length;
		let selectText = contents.slice(start, end);
		let insetStrStar = '**<font color="info">';
		let insertStrEnd = "</font>**";
		if (type == "Fail") {
			insetStrStar = '**<font color="warning">';
		}
		let str =
			contents.slice(0, start) +
			`${insetStrStar}${selectText}${insertStrEnd}` +
			contents.slice(end);
		Quill.setText(str);
		Quill?.setSelection(end + insetStrStar.length);
	}

	function getContent() {
		// replace(/\n/g, "\r\n") 把\n替换成\r\n
		return content.value.ops?.[0]?.insert?.replace(/\n/g, "\r\n");
	}

	function setContent(content) {
		nextTick(() => {
			let Quill = proxy.$refs.myQuillEditor?.getQuill(true);
			// proxy.$refs?.myQuillEditor?.setContent(content);
			Quill?.setText(content);
		});
	}

	function AddButton() {
		let style = "";
		TextList.value.forEach((v) => {
			if (v.code == "lastTime") {
				style =
					"width:120px;border:1px solid #ccc;border-radius:4px;padding:2px 10px;margin-right:10px;";
			} else {
				style =
					"width:70px;border:1px solid #ccc;border-radius:4px;padding:2px 10px;margin-right:10px;";
			}
			const newFunctionButton = document.querySelector(`.${props.refs} .ql-${v.code}`);
			newFunctionButton.style.cssText = style;
			newFunctionButton.innerText = v.name;
		});
	}
	onMounted(() => {
		AddButton();
	});
	const styles = computed(() => {
		let style = {
			height: "140px",
			width: "100%",
		};
		return style;
	});
	const content = ref("");
	defineExpose({
		getContent,
		setContent,
	});
</script>
<style lang="scss">
	.editor-container {
		height: 180px;
		width: 100%;
	}

	.ql-snow.ql-toolbar button,
	.ql-snow .ql-toolbar button {
		height: 25px;
		font-size: 12px;
		// &.ql-Success,
		//   &.ql-Fail {
		//     margin-top: 8px;
		//   }
	}

	.ql-toolbar.ql-snow .ql-formats {
		margin: 0;
	}
</style>