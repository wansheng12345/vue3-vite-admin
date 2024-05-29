<template>
	<div class="test-page">
		<h1>下班倒计时</h1>
		<ul v-if="DateObj">
			<li>{{ DateObj.h }} : </li>
			<li>{{ DateObj.m }} :</li>
			<li>{{ DateObj.s }}</li>
		</ul>
		<ul v-else class="over">
			<li>下班了，赶快滚，不要浪费公司电费!</li>
		</ul>
	</div>
</template>

<script setup>
	const DateObj = ref({});
	let timer;

	function init() {
		let time = new Date();
		let targetTime = new Date(time.getFullYear(), time.getMonth(), time.getDate(), 18, 0, 0)
		let diff = targetTime.getTime() - time.getTime();
		// 计算总秒数
		let totalSeconds = Math.floor(diff / 1000);
		if (totalSeconds < 0) {
			DateObj.value = false;
			cancelAnimationFrame(timer);
			return;
		}
		// 计算小时、分钟和秒
		let h = `0${Math.floor(totalSeconds / 3600)}`.slice(-2);
		let m = `0${Math.floor((totalSeconds % 3600) / 60)}`.slice(-2);
		let s = `0${totalSeconds % 60}`.slice(-2);
		DateObj.value = {
			h,
			m,
			s
		}
		timer = requestAnimationFrame(init)
	}
	timer = requestAnimationFrame(init)
</script>
<style lang="scss" scoped>
	.test-page {
		background: #2b2828;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		h1 {
			font-size: 30px;
			line-height: 40px;
			letter-spacing: 10px;
			margin-bottom: 20px;
			text-align: center;
			color: #fff;
		}

		ul {
			width: 350px;
			margin: 0 auto 20%;
			font-size: 58px;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #fff;
			border-radius: 8px;

			&.over {
				font-size: 54px;
				width: 1000px;
			}

			li {
				color: #2b2828;

				&:nth-child(2) {
					margin: 0 10px;
				}
			}
		}
	}
</style>