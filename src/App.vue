<template>
	<router-view />
</template>

<script setup>
	import useSettingsStore from '@/store/modules/settings'
	import {
		handleThemeStyle
	} from '@/utils/theme'
	provide('test', {
		str: 'provide 传递的字符串'
	})
	onMounted(() => {
		nextTick(() => {
			handleThemeStyle(useSettingsStore().theme)
		})
	})
</script>