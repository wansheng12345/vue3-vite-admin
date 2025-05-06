<template>
	<div class="CityMap-page">
		<div id="map"></div>
	</div>
</template>

<script setup>
	import axios from "axios";
	const chinaJson = ref(null)
	axios.get('https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full').then(res => {
		console.log(res.data);
		chinaJson.value = res.data;
		if (!chinaJson.value) return
		nextTick(() => {
			// proxy.$echarts.registerMap("china", chinaJson.value);
			// map.value = markRaw(
			// 	proxy.$echarts.init(document.getElementById("map"), "", {
			// 		renderer: "svg"
			// 	})
			// );
			draw();
		})
	})
	const {
		proxy
	} = getCurrentInstance();
	const map = ref(null);

	function draw() {
		// 指定图表的配置项和数据
		var option = {
			backgroundColor: "",
			title: {
				text: "中国地图",
				x: "center",
				y: "top",
			},
			tooltip: {
				show: true,
				backgroundColor: "rgba(32, 33, 36,.7)",
				borderColor: "rgba(32, 33, 36,0.20)",
				borderWidth: 1,
				textStyle: {
					// 文字提示样式
					color: "#fff",
					fontSize: "12",
				},
			},
			geo: {
				map: "china",
				zoom: 1.28,
				roam: true, // 缩放和拖拽
				center: [105, 36], // 调整地图位置
				itemStyle: {
					areaColor: "#0d0059",
					borderColor: "#389dff",
					borderWidth: 1, //设置外层边框
					// shadowBlur:4,
					// shadowOffsetY: 6,
					// shadowOffsetX: 0,
					// shadowColor: "#01012a",
				},
				emphasis: {
					label: {
						show: true,
						color: "#fff",
					},
					itemStyle: {
						areaColor: "#184cff",
						shadowOffsetX: 0,
						shadowOffsetY: 0,
						shadowBlur: 5,
						borderWidth: 0,
						shadowColor: "rgba(0, 0, 0, 0.5)",
					},
				},
			},
			series: [{
					// 数据前5名的点
					name: "Top 5",
					type: "effectScatter",
					coordinateSystem: "geo",
					data: [{
						name: "内蒙古自治区", // 对应地图中的name
						value: [114.077429, 44.331087], // value值,前面两个是X轴,Y轴坐标, 后面的数据自定义,可以设置多个
					}, ],
					encode: {
						value: 2,
					},
					symbolSize: function(val) {
						return 6; //设置散点的大小，可想现在这样根据数据大小改散点的大小，也可设置成统一的固定值
					},
					showEffectOn: "render",
					rippleEffect: {
						brushType: "stroke",
						period: 10, //周期
						scale: 10, //规模
					},
					hoverAnimation: true,
					label: {
						formatter: "{b}",
						position: "right",
						show: true,
					},
					itemStyle: {
						color: "#f13434",
						shadowBlur: 15,
						shadowColor: "#333",
					},
					zlevel: 1,
				},
				{
					// 数据前5名的点
					name: "Top 4",
					type: "effectScatter",
					coordinateSystem: "geo",
					data: [{
						name: "武汉市", // 对应地图中的name
						value: [112.271301, 30.987527], // value值,前面两个是X轴,Y轴坐标, 后面的数据自定义,可以设置多个
					}, ],
					encode: {
						value: 2,
					},
					symbolSize: function(val) {
						return 6; //设置散点的大小，可想现在这样根据数据大小改散点的大小，也可设置成统一的固定值
					},
					showEffectOn: "render",
					rippleEffect: {
						brushType: "stroke",
						period: 10, //周期
						scale: 10, //规模
					},
					hoverAnimation: true,
					label: {
						formatter: "{b}",
						position: "right",
						show: true,
					},
					itemStyle: {
						color: "#f13434",
						shadowBlur: 6,
						shadowColor: "#333",
					},
					zlevel: 1,
				},
			],
		};
		// 使用刚指定的配置项和数据显示图表。
		map.value.setOption(option);
		map.value.on('click', (parmas) => {
			console.log(parmas);
		})
	}
	onMounted(() => {

	});
</script>
<style lang="scss" scoped>
	.CityMap-page {
		width: 100%;
		height: 100%;
		background: #111;
		background-size: cover;

		#map {
			width: 100%;
			height: 100%;
		}
	}
</style>