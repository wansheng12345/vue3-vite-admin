<script setup>
const receiveTime = ref("");
const disabledDate = (time) => {
  return time.getTime() < Date.now() - 8.64e7;
};
const disabledHours= () => {
  // 禁用当前时间小时之前的
  const hoursArr = Array.from({ length: 24 }, (_, i) => i);
  return hoursArr.slice(0,new Date().getHours())
};
const disabledMinutes= () => {
  const minutesArr = Array.from({ length: 60 }, (_, i) => i);
  return minutesArr.slice(0,new Date().getMinutes())
};
const currentHour = new Date().getHours();
const pickerOptions = {
  selectableRange: [
    `${currentHour}:00:00 - 23:59:59`
  ]
};
</script>
<template>
  <div class="test-page">
    <el-date-picker
      v-model="receiveTime"
      type="datetime"
      :disabled-date="disabledDate"
      :disabled-hours="disabledHours"
      :disabled-minutes="disabledMinutes"
      placeholder="请选择计划领用时间"
      value-format="YYYY-MM-DD HH:mm:ss"
      :picker-options="pickerOptions"
      clearable
    ></el-date-picker>
  </div>
</template>
<style lang="scss" scoped>
.test-page {
  width: 100%;
  height: 100%;
}
</style>
