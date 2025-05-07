<script setup>
	// 基础数据源，或者外部传入
	const num = ref(15481245);
	// 这个是滚动的高度，也就是一个span元素的默认高度，设置的文字大小不同，这个元素的高度也不同，你可以动态计算，我是直接控制台鼠标点击查看的元素大小，比较省事
	const sh = ref(60);

	// 转化成千分位
	const numStr = computed(() => {
		return num.value.toLocaleString();
	});

	// 这是个测试代码
	onMounted(() => {
		setInterval(() => {
			num.value = Math.floor(Math.random() * 1000000000);
		}, 2000);
	});
</script>

<template>
	<div class="num-warp">
		<template v-for="item in numStr">
			<div v-if="item === ','" class="dot">,</div>
			<div v-else class="num-box" :style="{
          transform: ` translateY(${-sh * Number(item)}px)`,
        }">
				<span v-for="i in 10"> {{ i - 1 }} </span>
			</div>
		</template>
	</div>
</template>
<style scoped lang="scss">
	.dot {
		font-size: 40px;
	}

	.num-warp {
		display: flex;
		height: 60px;
		overflow-y: hidden;
		line-height: 60px;
	}

	.num-box {
		display: flex;
		flex-direction: column;
		font-size: 40px;
		margin: 0 1px;
		transition: all 1s;
	}
</style>