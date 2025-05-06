<template>
  <div class="pro-active">
    <el-steps :active="activeStep" finish-status="success" class="pro-step" align-center>
      <el-step v-for="(item, index) in stepList" :key="index" :title="item.name" @click="handleClick(index)"
        @mouseenter="showButtons(index)" @mouseleave="hideButtons(index)">
        <template #description v-if="index != 0 && index != stepList.length - 1">
          <div class="step-buttons" v-show="showButton[index]">
            <el-button size="large" plain type="primary" circle icon="Edit"></el-button>
            <el-button size="large" plain type="warning" circle icon="CirclePlus"></el-button>
            <el-button size="large" plain type="danger" circle icon="Remove"></el-button>
          </div>
        </template>
      </el-step>
    </el-steps>
  </div>
</template>
<script setup>
const showButton = ref([])
const activeStep = ref(1)
const stepList = ref([
  {
    name: '开始',
  },
  {
    name: '变更信息接收及传递'
  },
  {
    name: '可行性评估'
  },
  {
    name: '试生产验证'
  },
  {
    name: '结束',
  }
])
function handleClick() {

}
const timer = ref();
function showButtons(index) {
  clearTimeout(timer.value)
  showButton.value[index] = true;
}
function hideButtons(index) {
  timer.value = setTimeout(() => {
    showButton.value[index] = false
  }, 500);
}
</script>
<style lang="scss" scoped>
.pro-active {
  .pro-step {
    margin-top: 150px;
  }

  .step-buttons {
    position: absolute;
    top: -50px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.5s;
  }

  .el-step:hover .step-buttons {
    opacity: 1;
  }

  .el-step__title {
    font-size: 10px !important;
  }
}
</style>
