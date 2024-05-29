<template>
	<div class="Test-Index">
		<ul>
			<!-- v-slide-in 上滑动画 -->
			<li v-for="(item, index) in 10" :key="index">
				<!-- <h1>{{item}}</h1> -->
				<img :data-src="srcUrl" v-lazy-img alt="">
			</li>
		</ul>
	</div>
</template>

<script setup>
	import srcUrl from "@/assets/images/11.jpg"
</script>
<style lang="scss" scoped>
	.Test-Index {
		ul {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			width: 1600px;
			margin: 10px auto;

			li {
				width: 100%;
				height: 500px;
				margin-bottom: 20px;
				// background-color:skyblue;
				display: flex;
				align-items: center;
				justify-content: center;

				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}

				h1 {
					font-size: 50px;
					color: azure;
				}
			}
		}
	}
</style>