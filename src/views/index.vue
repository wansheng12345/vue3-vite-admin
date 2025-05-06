<template>
	<div class="app-container home">
		<div class="left-container">
			<div class="bar-container">
				<h3 class="title">【大区数据信息】</h3>
				<Bar></Bar>
			</div>
			<div class="radar-container">
				<h3 class="title">【大区异常处理】</h3>
				<div class="echart-container">
					<div id="pie"></div>
				</div>
			</div>
			<div class="graph-container">
				<h3 class="title">【数据传递信息】</h3>
			</div>
		</div>
		<div class="center-container">
			<div class="list-card">
				<div class="total-box">
					数据总量 :
					<!-- <h2>{{numStr}}</h2> -->
					<div class="text">
						<template v-for="item in numStr">
							<div v-if="item === ','" class="dot">,</div>
							<div v-else class="num-box" :style="{
						          transform: ` translateY(${-sh * Number(item)}px)`,
						        }">
								<span v-for="i in 10"> {{ i - 1 }}</span>
							</div>
						</template>
					</div>
					条记录
				</div>
				<ul>
					<li v-for="v in list" :key="v.name">
						{{ v.name }} : <span>{{ v.value }}</span>
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
	import Bar from "./components/bar-reverse";
	const list = ref([{
			name: "华北",
			value: "87,788",
		},
		{
			name: "东北",
			value: "65,446",
		},
		{
			name: "华东",
			value: "76,456",
		},
		{
			name: "中南",
			value: "42,135",
		},
		{
			name: "西南",
			value: "74,546",
		},
		{
			name: "西北",
			value: "75,753",
		},
	]);

	const Pie = ref(null);
	const currentIndex = ref(0);
	const timer = ref(null);
	const pieData = ref([{
			value: 1048,
			name: "Option1"
		},
		{
			value: 735,
			name: "Option2"
		},
		{
			value: 580,
			name: "Option3"
		},
		{
			value: 484,
			name: "Option4"
		},
		{
			value: 300,
			name: "Option5"
		},
	]);

	function drawPie() {
		Pie.value.clear();
		const option = {
			color: ["#6be6c1", "#ffb980", "#07D2F9", "#b6a2de", "#96dee8", "#e6a0d2", ],
			tooltip: {
				trigger: "item"
			},
			series: [{
				name: "Access From",
				type: "pie",
				radius: ["50%", "65%"],
				itemStyle: {
					borderRadius: 0,
					opacity: 0.7,
				},
				emphasis: {
					label: {
						show: true
					},
					scale: true,
					scaleSize: 10
				},
				label: {
					show: false,
					position: "center",
					fontSize: 26,
					color: "#fff"
				},
				data: pieData.value,
			}, ],
		};
		Pie.value.setOption(option);
		Pie.value.on("mouseover", handleMouseOver);
		Pie.value.on("mouseout", handleMouseOut);
	}

	function handleMouseOver(params) {
		if (timer.value) clearInterval(timer.value);
		currentIndex.value = params.dataIndex;
		highlightPie();
	}

	function handleMouseOut() {
		if (timer.value) clearInterval(timer.value);
		timer.value = setInterval(selectPie, 2000);
	}

	function selectPie() {
		currentIndex.value = (currentIndex.value + 1) % pieData.value.length;
		highlightPie();
	}

	function highlightPie() {
		pieData.value.forEach((_, i) => {
			Pie.value.dispatchAction({
				type: "downplay",
				seriesIndex: 0,
				dataIndex: i,
			});
		});
		Pie.value.dispatchAction({
			type: "hideTip",
			seriesIndex: 0,
			dataIndex: pieData.value.length - 1,
		});
		Pie.value.dispatchAction({
			type: "highlight",
			seriesIndex: 0,
			dataIndex: currentIndex.value,
		});
		Pie.value.dispatchAction({
			type: "showTip",
			seriesIndex: 0,
			dataIndex: currentIndex.value,
		});
	}
	const TotalNum = ref(523458740);
	const sh = ref(85);
	// 转化成千分位
	const numStr = computed(() => {
		return TotalNum.value.toLocaleString();
	});
	onMounted(() => {
		const {
			proxy
		} = getCurrentInstance();
		Pie.value = markRaw(proxy.$echarts.init(document.getElementById("pie")));
		drawPie();
		timer.value = setInterval(selectPie, 2000);
		setInterval(() => {
			TotalNum.value = Math.floor(Math.random() * 100000000);
		}, 3000);
	});
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

						align-items: baseline;
						color: rgba(203, 213, 225, 1);
						display: flex;
						justify-content: center;
						overflow-y: hidden;

						.text {
							display: flex;
							justify-content: center;
							overflow-y: hidden;
							line-height: 85px;
							height: 85px;
							font-family: "fx-ledfx-led_bold_fxcalendar";
							letter-spacing: 2px;
							color: #00ffff;
							margin: 0 10px;
						}

						.dot {
							font-size: 85px;
						}

						.num-box {
							display: flex;
							flex-direction: column;
							font-size: 85px;
							margin: 0 1px;
							transition: all 1.5s ease-in-out;
						}

						// h2 {
						// 	font-family: "fx-ledfx-led_bold_fxcalendar";
						// 	font-size: 85px;
						// 	letter-spacing: 2px;
						// 	background-image: linear-gradient(to bottom, #00ffff, #bdfeff);
						// 	-webkit-background-clip: text;
						// 	-webkit-text-fill-color: transparent;
						// 	margin: 0 10px;
						// }
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
								font-family: "fx-ledfx-led_bold_fxcalendar";
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

			.radar-container {
				.echart-container {
					width: 100%;
					height: calc(100% - 30px);
					padding: 5px 0;

					#pie {
						width: 100%;
						height: 100%;
					}
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