<script setup>
import { getPersonalList } from "@/api/Measuring/DataDicList";
const userList = ref([]);
const userId = ref("");
function handlePrint() {
  console.log(userId.value);
}
getPersonalList().then((res) => {
  if (res.result) {
    // userList.value = res.result;
    // res.result 有重复的jobNum找出这个jobNum
    // const duplicates = findDuplicateJobNums(res.result);
    userList.value = removeDuplicateJobNums(res.result);
  }
});
function findDuplicateJobNums(arr) {
  const jobNumCount = {}; // 用来存储每个jobNum出现的次数
  const duplicates = []; // 用来存储重复的jobNum

  // 第一次遍历，统计每个jobNum出现的次数
  arr.forEach((item) => {
    const jobNum = item.jobNum;
    jobNumCount[jobNum] = (jobNumCount[jobNum] || 0) + 1;
  });

  // 第二次遍历，找出所有出现次数大于1的jobNum
  for (const jobNum in jobNumCount) {
    if (jobNumCount[jobNum] > 1) {
      duplicates.push(jobNum);
    }
  }

  return duplicates;
}
function removeDuplicateJobNums(arr) {
  const seenJobNums = new Map(); // 使用Map来存储已经出现过的jobNum
  const uniqueJobs = []; // 用来存储没有重复jobNum的对象

  arr.forEach((item) => {
    if (!seenJobNums.has(item.jobNum)) {
      seenJobNums.set(item.jobNum, true); // 标记这个jobNum已经出现过
      uniqueJobs.push(item); // 将对象添加到结果数组中
    }
  });

  return uniqueJobs;
}
</script>
<template>
  <div>
    <el-select-v2
      v-model.lazy="userId"
      style="width: 300px"
      clearable
      filterable
      :options="userList"
      :props="{
        value: 'id',
        label: 'account',
      }"
    >
    </el-select-v2>
    <el-button @click="handlePrint">打印</el-button>
  </div>
</template>
<style lang="scss" scoped></style>
