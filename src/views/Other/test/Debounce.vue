<script setup>
import { useDebounceThrottle } from "@/hooks/useDebounceThrottle.js"; // 引入自定义的 hook
// 防抖示例
const debounceTrigger = useDebounceThrottle(
  () => {
    console.log("Debounce triggered",i);
  },
  1000,
  "debounce"
);

// 模拟频繁触发防抖操作
for (let i = 0; i < 10; i++) {
  debounceTrigger(i);
}

// 节流示例
const throttleTrigger = useDebounceThrottle(
  () => {
    console.log("Throttle triggered");
  },
  2000,
  "throttle"
);

// 模拟频繁触发节流操作
for (let i = 0; i < 10; i++) {
  throttleTrigger();
}
</script>
<template>
  <div>
    <h1>useDebounceThrottle</h1>
  </div>
</template>
<style lang="scss" scoped></style>
