<script setup>
	const {
		proxy
	} = getCurrentInstance();
	import worldMap from "./world.json";
	const myEcharts = ref();
	const mapData = [{
			name: "中国",
			value: [116.20, 39.56, 120],
			Total1: 111000,
			Total2: 222000,
			Total3: 333000,
		},
		{
			name: "日本",
			value: [139.20, 35.56, 120],
			Total1: 111,
			Total2: 222,
			Total3: 333,
		},
	];
	const initMap = (mapData) => {
		nextTick(() => {
			proxy.$echarts.registerMap("world", worldMap);
			const myChart = proxy.$echarts.init(myEcharts.value, "");
			const option = {
				tooltip: {
					show: false, // 不显示地图的 tooltip
				},
				geo: {
					show: true,
					map: "world",
					roam: false,
					zoom: 1.1,
					itemStyle: {
						borderColor: "#f5f5f5",
						areaColor: "#1c68b3", // 正常状态的区域颜色
					},
					emphasis: {
						disabled: false,
						label: {
							show: false,
						},
						itemStyle: {
							areaColor: "#1c68b3", // 鼠标悬浮颜色
							shadowOffsetX: 0,
							shadowOffsetY: 0,
							borderWidth: 0,
						},
					},
				},

				series: [{
						//波纹点部分的配置
						type: "effectScatter",
						coordinateSystem: "geo",
						effectType: "ripple",
						symbolSize: 10,
						// symbol:"image://http://example.website/a/b.png",// 自定义标记
						label: {
							formatter: "{b}",
							color: "#fff", // 标记文字的颜色
							fontSize: 12, // 标记文字的大小
							position: "left",
							show: true,
						},
						itemStyle: {
							color: "#c5210d", // 标记的颜色
							shadowBlur: 10, // 标记阴影的模糊大小
							shadowColor: "#c5210d", // 标记阴影的颜色
						},
						data: mapData,
					},
					{
						type: "scatter",
						labelLine: {
							show: true,
							lineStyle: {
								color: "#999",
							}, // 引导线颜色
							smooth: 0.2,
							length: 0.001,
						},
						coordinateSystem: "geo",
						labelLayout: function(params) {
							// 中国北京
							if (params.dataIndex == 0) {
								return {
									x: params.rect.x + 120,
									y: params.rect.y - 30,
								};
							}
							// 日本东京
							if (params.dataIndex == 1) {
								return {
									x: params.rect.x + 30,
									y: params.rect.y + 40,
								};
							}
						},
						label: {
							position: "top",
							show: true,
							padding: [10, 10],
							color: "#000",
							backgroundColor: "#fff",
							borderWidth: 0.2,
							borderColor: "#f00",
							borderRadius: 4,
							shadowColor: "rgba(31,39,51,0.1200)",
							shadowBlur: 10,
							align: "left",
							lineHeight: 20,
							formatter(params) {
								let str = ''
								str += `名称：${params.name}\n总数：1234567`
								return str;
							},
						},

						itemStyle: {
							color: "#FE7718",
							borderColor: "#f00",
							shadowBlur: 10,
							shadowColor: "#FE7718",
						},
						data: mapData,
					},
				],
			};
			myChart.setOption(option);
		});
	};

	//初始化echarts实例
	onMounted(() => {
		initMap(mapData);
	});
</script>
<template>
	<div class="test-page">
		<div class="container">
			<div ref="myEcharts" style="width: 1200px; height: 660px"></div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	.test-page {
		width: 100%;
		height: 100%;
	}
</style>