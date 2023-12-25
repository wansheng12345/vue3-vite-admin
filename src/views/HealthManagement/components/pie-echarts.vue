<template>
	<div class="pie-echarts">
		<div id="Pie"></div>
	</div>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue';
	const {
		proxy
	} = getCurrentInstance();
	const pie = ref(null)

	function draw() {
		let option = {
			backgroundColor: 'transparent',
			tooltip: {
				show: false
			},
			legend: {
				show: false
			},
			series: [{
				name: 'Access From',
				type: 'pie',
				left: 0,
				radius: ['40%', '60%'],
				avoidLabelOverlap: false,
				silent: false,
				label: {
					show: false,
				},
				emphasis: {
					label: {
						show: false,
					}
				},
				labelLine: {
					show: false
				},
				data: [{
						value: 1048,
						name: 'Search Engine',
						itemStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0,
									color: 'rgba(21, 118, 210, 0)' // 0% 处的颜色
								}, {
									offset: 1,
									color: 'rgba(21, 118, 210, 1)' // 100% 处的颜色
								}],
								global: false // 缺省为 false
							}
						}
					},
					{
						value: 735,
						name: 'Direct',
						itemStyle: {
							color: {
								type: 'radial',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0,
									color: 'red' // 0% 处的颜色
								}, {
									offset: 1,
									color: 'blue' // 100% 处的颜色
								}],
								global: false // 缺省为 false
							}
						}
					},
					{
						value: 580,
						name: 'Email'
					},
					{
						value: 484,
						name: 'Union Ads'
					},
					{
						value: 300,
						name: 'Video Ads'
					}
				]
			}]
		}
		pie.value.setOption(option);
	}
	onMounted(() => {
		pie.value = markRaw(proxy.$echarts.init(document.getElementById("Pie")));
		draw()
	})
</script>

<style lang="scss" scoped>
	.pie-echarts {

		#Pie {
			background-color: #000;
			width: 800px;
			height: 300px;
		}
	}
</style>