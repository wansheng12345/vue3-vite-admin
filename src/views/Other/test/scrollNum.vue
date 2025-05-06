<script setup>
	import {
		ref,
		computed,
		onMounted
	} from 'vue';

	// 数字值
	const num = ref(15481245);
	// 每个数字的高度
	const sh = ref(60);

	// 转换为千分位格式并拆分为数组
	const numStrArray = computed(() => {
		return num.value.toLocaleString().split('');
	});

	// 测试：每2秒随机生成一个数字
	onMounted(() => {
		setInterval(() => {
			num.value = Math.floor(Math.random() * 1000000000);
		}, 2000);
	});
</script>

<template>
	<div class="num-warp">
		<template v-for="(item, index) in numStrArray" :key="index">
			<div v-if="item === ','" class="dot">,</div>
			<div v-else class="num-box" :style="{
          transform: `translateY(${-sh * (9 - Number(item))}px)`,
        }">
				<span v-for="i in 10" :key="i"> {{ 10 - i }} </span>
			</div>
		</template>
	</div>
</template>

<style scoped lang="scss">
	.num-warp {
		display: flex;
		height: 60px;
		overflow-y: hidden;
		line-height: 60px;
	}

	.dot {
		font-size: 40px;
		line-height: 60px; // 保证与数字对齐
	}

	.num-box {
		display: flex;
		flex-direction: column; // 数字从下到上排列
		font-size: 40px;
		margin: 0 1px;
		transition: transform 0.8s ease-in-out; // 优化动画效果
	}
</style>