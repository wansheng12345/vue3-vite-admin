<template>
	<div class="map-page">
		<section>
			<el-button @click="handleClick">Click Lorem</el-button>
			<div :style="{'height':`${Height}`}" ref='divRef'>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, sunt beatae sapiente corporis quasi
				cupiditate. Ipsa quos vel nostrum magni recusandae, repudiandae doloribus ad natus atque temporibus
				veniam. Corrupti, similique?
			</div>
		</section>
	</div>
</template>

<script setup>
	const Height = ref(0)
	const divRef = ref(null)

	function handleClick() {
		Height.value = 'auto';
		const {
			height
		} = divRef.value.getBoundingClientRect()
		console.log(height);
		// Height.value = Height.value ? 0 : 200;
	}
</script>

<style lang="scss" scoped>
	.map-page {
		padding: 50px;

		section {
			width: 180px;

			&>div {
				margin: 10px;
				background: #ccc;
				overflow: hidden;
				transition: height 0.5s linear;
			}
		}
	}
</style>