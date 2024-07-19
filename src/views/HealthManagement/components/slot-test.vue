<template>
	<div class="slot-page">
		<header>
			<slot name="header" :text='obj' count='1111'>默认头部的slot</slot>
			<el-button type="primary" @click="handleClick">改变子组件的文字</el-button>
		</header>
		<slot>默认的slot </slot>
		<slot name="footer">默认的底部slot
		</slot>
	</div>
</template>

<script setup>
	const str = inject('num')
	const obj = ref('子组件动态文字')

	function handleClick() {
		obj.value = "改变后的文字"
	}
</script>

<style>
</style>