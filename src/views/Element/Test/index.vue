<script setup>

</script>

<template>
	<div>
		<h1>3D翻转</h1>
		<div class="scene">
			<div class="card">
				<img src="@/assets/images/3.jpg" />
			</div>
			<div class="card">
				<img src="@/assets/images/4.jpg" />
			</div>
			<div class="card">
				<img src="@/assets/images/5.jpg" />
			</div>
			<div class="card">
				<img src="@/assets/images/6.jpg" />
			</div>
		</div>
		<h1>3D轮播图</h1>
		<div class="container">
			<div id="carousel">
				<figure><img src="@/assets/images/3.jpg" alt=""></figure>
				<figure><img src="@/assets/images/4.jpg" alt=""></figure>
				<figure><img src="@/assets/images/5.jpg" alt=""></figure>
				<figure><img src="@/assets/images/6.jpg" alt=""></figure>
				<figure><img src="@/assets/images/7.jpg" alt=""></figure>
				<figure><img src="@/assets/images/8.jpg" alt=""></figure>
				<figure><img src="@/assets/images/9.jpg" alt=""></figure>
				<figure><img src="@/assets/images/10.jpg" alt=""></figure>
				<figure><img src="@/assets/images/11.jpg" alt=""></figure>
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
	.scene {
		width: 850px;
		display: flex;
		justify-content: space-between;
		perspective: 800px;
		padding: 10px;
	}

	.card {
		position: relative;
		width: 200px;
		height: 180px;
		color: white;
		cursor: pointer;
		transition: 1s ease-in-out;
		transform-style: preserve-3d;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.card:hover {
		transform: rotateY(0.5turn);
	}

	.container {
		margin: 50px 250px 20px;
		width: 210px;
		height: 140px;
		position: relative;
		-webkit-perspective: 1000px;
		-moz-perspective: 1000px;
		-o-perspective: 1000px;
		perspective: 1000px;
	}

	#carousel {
		width: 100%;
		height: 100%;
		position: absolute;
		transform-style: preserve-3d;
		animation: rotation 20s infinite linear;
	}

	#carousel:hover {
		animation-play-state: paused;
	}

	#carousel figure {
		display: block;
		position: absolute;
		width: 186px;
		height: 116px;
		left: 10px;
		top: 10px;
		overflow: hidden;
	}

	#carousel figure:nth-child(1) {
		transform: rotateY(0deg) translateZ(288px);
	}

	#carousel figure:nth-child(2) {
		transform: rotateY(40deg) translateZ(288px);
	}

	#carousel figure:nth-child(3) {
		transform: rotateY(80deg) translateZ(288px);
	}

	#carousel figure:nth-child(4) {
		transform: rotateY(120deg) translateZ(288px);
	}

	#carousel figure:nth-child(5) {
		transform: rotateY(160deg) translateZ(288px);
	}

	#carousel figure:nth-child(6) {
		transform: rotateY(200deg) translateZ(288px);
	}

	#carousel figure:nth-child(7) {
		transform: rotateY(240deg) translateZ(288px);
	}

	#carousel figure:nth-child(8) {
		transform: rotateY(280deg) translateZ(288px);
	}

	#carousel figure:nth-child(9) {
		transform: rotateY(320deg) translateZ(288px);
	}

	#carousel figure img {
		width: 100%;
		height: 100%;
	}

	@keyframes rotation {
		from {
			transform: rotateY(0deg);
		}

		to {
			transform: rotateY(1turn);
		}
	}
</style>