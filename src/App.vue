<template>
	<router-view />
</template>

<script setup>
	import useSettingsStore from '@/store/modules/settings'
	import {
		handleThemeStyle
	} from '@/utils/theme'
	const num = ref(0)
	setInterval(() => {
		num.value += 1
	}, 5000)
	provide('num', num)
	onMounted(() => {
		nextTick(() => {
			handleThemeStyle(useSettingsStore().theme)
		})
	})
</script>