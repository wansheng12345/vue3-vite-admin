<template>
	<div class="bar-reverse">
		<div id="reverse"></div>
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

	const reverse = ref(null)
	const Data = ref([120, 200, 150, 80, 70, 110])

	function init(data = Data.value) {
		let option = {
			backgroundColor: '',
			xAxis: {
				show: false,
				type: 'value',
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				}
			},
			color: ['#2f89cf'],
			grid: {
				left: 40,
				right: 40,
				bottom: 5,
				top: 10,
			},
			yAxis: {
				type: 'category',
				data: ['华北', '东北', '华东', '中南', '西南', '西北', ],

				axisTick: {
					show: false
				},

				axisLine: {
					show: false,
				},
				axisLabel: {
					color: '#2f89cf'
				}
			},
			series: [{
				data: data,
				type: 'bar',
				showBackground: true,
				barWidth: 12,
				backgroundStyle: {
					color: '#4e5c8699',
				},
				label: {
					show: true,
					position: 'right',
					color: '#fff'
				},
				itemStyle: {
					barBorderRadius: 6
				}
			}],
			animationDuration: 300,
			animationDurationUpdate: 500,
			animationEasing: 'linear',
			animationEasingUpdate: 'linear'
		}
		reverse.value.setOption(option);
	}
	onMounted(() => {
		reverse.value = markRaw(proxy.$echarts.init(document.getElementById("reverse")));

		init(Data.value);
		setInterval(() => {
			let arr = Data.value.map(v => {
				return v += Math.round(Math.random() * 50)
			})
			init(arr);
		}, 2000)
	})
</script>

<style lang="scss" scoped>
	.bar-reverse {
		height: calc(100% - 30px);
		width: 100%;

		#reverse {
			width: 100%;
			height: 100%;
		}
	}
</style>