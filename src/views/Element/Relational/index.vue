<template>
  <div class="Mass-page">
    <div ref="box" class="box">
      <relation-graph
        ref="relationGraphRef"
        :on-node-click="handleClickNode"
        :options="graphOptions"
      >
        <template #node="{ node }">
          <div
            @mouseover="showNodeTips(node, $event)"
            @mouseout="hideNodeTips(node, $event)"
            style="width: 100%; height: 100%"
          >
            <div
              style="
                font-size: 16px;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              {{ node.text }}
            </div>
          </div>
        </template>
      </relation-graph>
      <div
        v-if="isShowNodeTipsPanel"
        :style="{
          left: nodeMenuPanelPosition.x + 'px',
          top: nodeMenuPanelPosition.y + 'px',
        }"
        style="
          z-index: 9999;
          padding: 10px;
          background-color: #ffffff;
          border: #eeeeee solid 1px;
          box-shadow: 0px 0px 8px #cccccc;
          position: absolute;
        "
      >
        <div
          style="line-height: 25px; padding-left: 10px; color: #888888; font-size: 12px"
        >
          节点名称：{{ currentNode.text }}
        </div>
        <div class="c-node-menu-item">id:{{ currentNode.text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
var graphOptions = {
  debug: false,
  disableDragNode: true,
  backgrounImageNoRepeat: true,
  allowSwitchLineShape: true,
  allowSwitchJunctionPoint: true,
  layouts: [
    {
      label: "竖向",
      layoutName: "tree",
      defaultNodeShape: 1,
      defaultLineShape: 1,
      centerOffset_y: 200,
      from: "top",
      // 通过这4个属性来调整 tree-层级距离&节点距离
      min_per_width: "150",
      max_per_width: "350",
      levelDistance: "",
    },
  ],
  defaultNodeShape: 1,
  defaultLineShape: 4, //线条样式
  defaultJunctionPoint: "tb",
  defaultNodeBorderWidth: 0,
  defaultLineColor: "#ccc",
  defaultNodeColor: "#108ffe",
};
const isShowNodeTipsPanel = ref(false);
const relationGraphRef = ref(null);
onMounted(() => {
  const jsonData = {
    rootId: "N15",
    nodes: [
      {
        id: "N15",
        text: "Maas",
        color: "#4ea2f0",
        width: 120,
        height: 40,
        data: {
          myicon: "el-icon-sunny",
        },
      },
      {
        id: "N16",
        color: "#4ea2f0",
        text: "MQ",
        width: 120,
        height: 40,
      },
      {
        id: "MQ1",
        color: "#4ea2f0",
        text: "MQ 队列1",
        width: 120,
        height: 40,
      },
      {
        id: "MQ2",
        color: "#4ea2f0",
        text: "MQ 队列2",
        width: 120,
        height: 40,
      },
      {
        id: "Maas Site",
        color: "#4ea2f0",
        text: "Maas Site",
        width: 120,
        height: 40,
      },
      {
        id: "N17",
        text: "Redis",
        color: "#dc5d5d",
        width: 120,
        height: 40,
      },
      { id: "N18", text: "ESOP", color: "#4ea2f0", width: 120, height: 40 },
      { id: "N19", text: "DB", color: "#4ea2f0", width: 120, height: 40 },
    ],
    lines: [
      { from: "N15", to: "N16" },
      { from: "N15", to: "N17", color: "#dc5d5d" },
      { from: "N15", to: "N18" },
      { from: "N15", to: "N19" },
      { from: "N15", to: "Maas Site" },
      {
        from: "N16",
        to: "MQ1",
      },
      {
        from: "N16",
        to: "MQ2",
      },
    ],
  };
  relationGraphRef.value.setJsonData(jsonData);
});

const { proxy } = getCurrentInstance();
const nodeMenuPanelPosition = ref({ x: 0, y: 0 });
function handleClickNode(node, e) {
  console.log(node, e);
  currentNode.value = node;
  const _base_position = box.value.getBoundingClientRect();
  nodeMenuPanelPosition.value.x = e.clientX - _base_position.x + 20;
  nodeMenuPanelPosition.value.y = e.clientY - _base_position.y + 10;
  console.log(nodeMenuPanelPosition.value);
  isShowNodeTipsPanel.value = true;
}
const currentNode = ref({});
const box = ref(null);
function showNodeTips(obj, e) {
  // currentNode.value = obj;
  // const _base_position = box.value.getBoundingClientRect();
  // nodeMenuPanelPosition.value.x = e.clientX - _base_position.x + 20;
  // nodeMenuPanelPosition.value.y = e.clientY - _base_position.y + 10;
  // nextTick(() => {
  //   isShowNodeTipsPanel.value = true;
  // }, 0);
  // console.log(obj, e);
}
function hideNodeTips() {
  isShowNodeTipsPanel.value = false;
}
</script>
<style lang="scss" scoped>
.Mass-page {
  width: 100%;
  height: 100%;
  .box {
    height: calc(100% - 50px);
  }
  .c-node-menu-item {
    line-height: 30px;
    padding-left: 10px;
    cursor: pointer;
    color: #444444;
    font-size: 14px;
    border-top: #efefef solid 1px;
  }
  .c-node-menu-item:hover {
    background-color: rgba(66, 187, 66, 0.2);
  }
}
</style>
