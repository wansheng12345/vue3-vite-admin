<template>
	<div class="app-container home">
		<div class="left-container">
			<div class="bar-container">
				<h3 class="title">【大区数据信息】</h3>
				<Bar></Bar>
			</div>
			<div class="radar-container">
				<h3 class="title">【大区异常处理】</h3>
			</div>
			<div class="graph-container">
				<h3 class="title">【数据传递信息】</h3>
			</div>
		</div>
		<div class="center-container">
			<div class="list-card">
				<div class="total-box">
					数据总量 :<h2>523,458,740</h2>
					条记录
				</div>
				<ul>
					<li v-for="v in list" :key='v.name'>
						{{v.name}} : <span>{{v.value}}</span>
					</li>
				</ul>
			</div>
			<div class="map-box"></div>
		</div>
		<div class="right-container">
			<div class="bar-container">
				<h3 class="title">【服务资源占比】</h3>
			</div>
			<div class="radar-container">
				<h3 class="title">【云端报警风险】</h3>
			</div>
			<div class="graph-container">
				<h3 class="title">【关键词条】</h3>
			</div>
		</div>
	</div>
</template>

<script setup name="Index">
	// document.documentElement.requestFullscreen() 全屏方法
	import Bar from "./components/bar-reverse"
	const list = ref([{
			name: '华北',
			value: '87,788'
		},
		{
			name: '东北',
			value: '65,446'
		},
		{
			name: '华东',
			value: '76,456'
		},
		{
			name: '中南',
			value: '42,135'
		},
		{
			name: '西南',
			value: '74,546'
		},
		{
			name: '西北',
			value: '75,753'
		},
	])
</script>

<style scoped lang="scss">
	@import "../assets/font/stylesheet.css";

	.home {
		width: 100%;
		height: 100%;
		// background: #273267;
		background: url("@/assets/images/bg-1.jpg") center no-repeat;
		background-size: cover;
		box-sizing: border-box;
		color: #f5f5f5;
		position: relative;
		display: flex;
		justify-content: space-around;
		padding: 10px 5px;
		--bg: rgba(30, 41, 59, 0.5);

		&>div {
			width: 24.2%;
			height: 100%;
			background-color: var(--bg);
			padding: 10px;

			&.center-container {
				width: 50%;
				height: 100%;
				background-color: transparent;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding: 0;

				.list-card {
					width: 100%;
					height: 27%;
					background-color: var(--bg);
					opacity: 0.7;

					.total-box {
						font-size: 14px;
						display: flex;
						align-items: baseline;
						color: rgba(203, 213, 225, 1);
						justify-content: center;

						h2 {
							font-family: 'fx-ledfx-led_bold_fxcalendar';
							font-size: 85px;
							letter-spacing: 2px;
							background-image: linear-gradient(to bottom, #00ffff, #bdfeff);
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
							margin: 0 10px;
						}
					}

					ul {
						display: flex;
						align-items: center;
						justify-content: space-around;
						flex-wrap: wrap;
						margin-top: 10px;

						li {
							width: 32%;
							height: 45px;
							font-size: 13px;
							text-align: center;
							color: rgba(203, 213, 225, 1);

							span {
								font-family: 'fx-ledfx-led_bold_fxcalendar';
								font-size: 27px;
								color: rgb(93, 197, 239);
							}
						}
					}
				}

				.map-box {
					width: 100%;
					flex: 1;
					margin-top: 6px;
					background-color: var(--bg);
				}
			}

			&.left-container,
			&.right-container {
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				&>div {
					height: 33%;
					width: 100%;

				}
			}

			h3.title {
				font-size: 15px;
				color: #f5f5f5;
				line-height: 30px;
			}
		}


	}
</style>