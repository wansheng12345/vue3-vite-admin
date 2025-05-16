<template>
  <div class="main">
    <VirtualList :items="bigList" :item-height="60" />
  </div>
</template>

<script setup>
import VirtualList from './VirtualList.vue'

// 生成测试数据
const bigList = ref(Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  content: `Item ${i + 1} - ${'Very long content '.repeat(10)}`
})))
</script>
<style lang="scss" scoped>
.main{
    height: 600px;
    width:100%;
    margin:20px;
}
</style>