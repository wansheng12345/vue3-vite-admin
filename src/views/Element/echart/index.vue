<template>
  <div class="stop-echarts-page">
    <div id="main" v-loading="loading"></div>
  </div>
</template>

<script setup>
const loading = ref(true);
const { proxy } = getCurrentInstance();
const list=[
  {
    name: "名称1",
    value: [0, 1686512743000, 1686516343000, 3600000],
    // ['索引','开始时间戳(毫秒)','结束时间戳(毫秒)','持续时间']
  },
  {
    name: "名称1",
    value: [0, 1686512743000, 1686516343000, 3600000],
    // ['索引','开始时间戳(毫秒)','结束时间戳(毫秒)','持续时间']
  },
  {
    name: "名称2",
    value: [1, 1686512743000, 1686516343000, 3600000],
    // ['索引','开始时间戳(毫秒)','结束时间戳(毫秒)','持续时间']
  }
]
const data = ref([
  {
    itemStyle: {
      color: "#7b9ce1",
    },
    name: "超声波焊接",
    value: [0, 1686512743000, 1686516343000, 3600000],
  },
  {
    itemStyle: {
      color: "#7b9ce1",
    },
    name: "超声波焊接",
    value: [0, 1686555943000, 1686556621930, 678930],
  },
  {
    itemStyle: {
      color: "#7b9ce1",
    },
    name: "超声波焊接",
    value: [0, 1686521523000, 1686522296320, 773329],
  },
  {
    itemStyle: {
      color: "#7b9ce1",
    },
    name: "超声波焊接",
    value: [1, 1686533025000, 1686534798320, 1773320],
  },
  {
    itemStyle: {
      color: "#7b9ce1",
    },
    name: "超声波焊接",
    value: [1, 1686540195000, 1686541395000, 1200000],
  },
  {
    itemStyle: {
      color: "#7b9ce1",
    },
    name: "超声波焊接",
    value: [1, 1686568395000, 1686571291510, 2896510],
  },
  {
    itemStyle: {
      color: "#7b9ce1",
    },
    name: "超声波焊接",
    value: [2, 1686513963000, 1686514983000, 1020000],
  },
  {
    itemStyle: {
      color: "#7b9ce1",
    },
    name: "超声波焊接",
    value: [2, 1686547383000, 1686547873000, 490000],
  },
  {
    itemStyle: {
      color: "#7b9ce1",
    },
    name: "超声波焊接",
    value: [2, 1686576183000, 1686576856320, 673320],
  },
]);
const main = ref(null);
const categories = ref(["超声波焊接", "包Mylar", "顶盖激光焊接"]);
var startTime = +new Date();
function draw() {
  var option = {
    tooltip: {
      formatter: function (params) {
        let start = proxy.$moment(params.value[1]).format("HH:mm:ss");
        let end = proxy.$moment(params.value[2]).format("HH:mm:ss");
        let duration = params.value[3];
        return `${params.marker}${params.name}<br/>开始时间：${start}<br/>结束时间：${end}<br/>持续时间：${duration} ms`;
      },
    },
    title: {
      text: "设备状态甘特图",
      left: "center",
      top: 5,
      textStyle: { color: "#07D2F9", fontWeight: "normal", fontSize: 16 },
    },
    dataZoom: [
      {
        type: "inside",
        filterMode: "weakFilter",
        showDataShadow: false,
        labelFormatter: "",
        minSpan: 5,
      },
    ],
    grid: {
      left: 100,
      right: 30,
      bottom: 20,
    },
    xAxis: {
      type: "time",
      position: "top",
      axisLabel: {
        // formatter: function (val) {
        //   return Math.max(0, val - startTime) + ' ms';
        // }
      },
    },
    yAxis: {
      data: categories.value,
    },
    series: [
      {
        type: "custom",
        renderItem: renderItem,
        itemStyle: {
          opacity: 0.7,
        },
        encode: {
          x: [1, 2],
          y: 0,
        },
        data: data.value,
      },
    ],
  };
  main.value.setOption(option);
  loading.value = false;
  window.addEventListener("resize", function () {
    main.value.resize();
  });
}
function renderItem(params, api) {
  var categoryIndex = api.value(0);
  var start = api.coord([api.value(1), categoryIndex]);
  var end = api.coord([api.value(2), categoryIndex]);
  var height = api.size([0, 1])[1] * 0.4;
  var rectShape = proxy.$echarts.graphic.clipRectByRect(
    {
      x: start[0],
      y: start[1] - height / 2,
      width: end[0] - start[0],
      height: height,
    },
    {
      x: params.coordSys.x,
      y: params.coordSys.y,
      width: params.coordSys.width,
      height: params.coordSys.height,
    }
  );
  return (
    rectShape && {
      type: "rect",
      transition: ["shape"],
      shape: rectShape,
      style: api.style(),
    }
  );
}
onMounted(() => {
  main.value = markRaw(proxy.$echarts.init(document.getElementById("main")));
  draw();
});
</script>
<style lang="scss" scoped>
.stop-echarts-page {
  width: 100%;
  height: 100%;
  #main {
    width: 100%;
    height: 100%;
  }
}
</style>
