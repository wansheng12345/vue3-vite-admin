import { ref, watchEffect, onUnmounted } from 'vue';

/**
 * 防抖和节流的 Hook 函数
 * @param {Function} callback - 要执行的回调函数
 * @param {number} delay - 防抖或节流的延迟时间（毫秒）
 * @param {string} type - 'debounce' 或 'throttle'，表示防抖或节流
 * @returns {Function} - 触发防抖或节流操作的函数
 */
export function  useDebounceThrottle(callback, delay = 500, type = 'debounce') {
  // 标志是否正在等待延迟执行
  let timer;
  // 标志节流的上次执行时间
  let lastExecuted;

  // 触发防抖或节流的函数
  function trigger() {
    // 根据类型进行不同的处理
    if (type === 'debounce') {
      // 防抖：清除之前的定时器
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback();
      }, delay);
    } else if (type === 'throttle') {
      // 节流：如果距离上次执行超过延迟时间，则执行回调
      const now = Date.now();
      if (!lastExecuted || now - lastExecuted >= delay) {
        callback();
        lastExecuted = now;
      }
    }
  }

  // 组件卸载时清除定时器
  onUnmounted(() => {
    clearTimeout(timer);
  });

  // 返回触发函数
  return trigger;
}
