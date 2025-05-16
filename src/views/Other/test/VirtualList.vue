<template>
  <div
    ref="scrollContainer"
    class="virtual-scroller"
    @scroll.passive="handleScroll"
  >
    <!-- 占位层 (模拟总高度) -->
    <div :style="{ height: totalHeight + 'px' }"></div>

    <!-- 可视区域内容 -->
    <div
      class="visible-items"
      :style="{ transform: `translateY(${offset}px)` }"
    >
      <div
        v-for="item in visibleItems"
        :key="item.id"
        class="list-item"
        :data-index="item.id"
        :style="{ height: itemHeight + 'px' }"
      >
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, required: true },     // 数据源
  itemHeight: { type: Number, default: 50 },  // 每项高度
  buffer: { type: Number, default: 5 }        // 缓冲项数量
})

const scrollContainer = ref(null)
const scrollTop = ref(0)
const containerHeight = ref(0)

// 计算可见项范围
const startIndex = computed(() => {
  return Math.max(0, Math.floor(scrollTop.value / props.itemHeight) - props.buffer)
})

const endIndex = computed(() => {
  return Math.min(
    props.items.length,
    startIndex.value + Math.ceil(containerHeight.value / props.itemHeight) + props.buffer * 2
  )
})

// 计算总高度
const totalHeight = computed(() => props.items.length * props.itemHeight)

// 计算偏移量
const offset = computed(() => startIndex.value * props.itemHeight)

// 当前可见项数据
const visibleItems = computed(() => {
    console.log(startIndex.value, endIndex.value);
  return props.items.slice(startIndex.value, endIndex.value)
})

// 处理滚动事件
const handleScroll = (e) => {
  scrollTop.value = e.target.scrollTop
}

// 初始化容器高度
onMounted(() => {
  containerHeight.value = scrollContainer.value.clientHeight
})
</script>

<style scoped>
.virtual-scroller {
  height:100%;
  overflow-y: auto;
  position: relative;
}

.visible-items {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.list-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}
</style>