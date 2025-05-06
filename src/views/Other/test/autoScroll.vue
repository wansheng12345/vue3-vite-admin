<template>
    <div class="test-page">
      <div class="header">
        <span>供应商名称</span>
        <span>融资金额(元)</span>
        <span>所属银行</span>
      </div>
      <div
        class="resultList"
        id="resultList"
        @mouseenter="stopScroll"
        @mouseleave="startScroll"
      >
        <div class="resultBox" ref="resultBox">
          <div
            v-for="(item, index) in resultItems"
            :key="index"
            class="resultItem"
            :data-i="index"
          >
            <div class="inner">
              <span>{{ item.name }}</span>
              <span class="money">{{ item.amount }}</span>
              <span>{{ item.bank }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from "vue";
  
  const resultItems = ref([
    { name: "福建厦门公司", amount: "649.000.00", bank: "中国农业银行" },
    { name: "福建福州公司", amount: "649.000.00", bank: "工商银行" },
    { name: "福建漳州公司", amount: "649.000.00", bank: "建设银行" },
    { name: "福建龙岩公司", amount: "649.000.00", bank: "新业银行" },
    { name: "福建南平公司", amount: "649.000.00", bank: "农村信用社" },
    { name: "福建松溪公司", amount: "649.000.00", bank: "建设银行" },
    { name: "江苏徐州公司", amount: "649.000.00", bank: "邮政储蓄" },
    { name: "浙江宁波公司", amount: "649.000.00", bank: "招商银行" },
    { name: "四川成都公司", amount: "649.000.00", bank: "浦发银行" },
    { name: "湖北武汉公司", amount: "649.000.00", bank: "花旗银行" },
  ]);
  
  const resultBox = ref(null);
  let timeAnimate = null;
  let time = null;
  let step = 0;
  
  const nodeHeight = ref(0);// 单个item 节点的高度
  
  const setTime = () => {
    if (time) clearTimeout(time);
    time = setTimeout(() => {
      scroll();
    }, 1000);
  };
  
  const scroll = () => {
    cancelAnimationFrame(timeAnimate);
    timeAnimate = requestAnimationFrame(function fn() {
      if (Math.abs(step) >= nodeHeight.value) {
        cancelAnimationFrame(timeAnimate);
        step = 0;
        resultBox.value.style.transform = `translate3d(0px, ${0}px,  0px)`;
        resultBox.value.appendChild(resultBox.value.firstElementChild);
        setTime();
      } else {
        step -= 1;
        resultBox.value.style.transform = `translate3d(0px, ${step}px,  0px)`;
        timeAnimate = requestAnimationFrame(fn);
      }
    });
  };
  
  const startScroll = () => {
    setTime();
  };
  
  const stopScroll = () => {
    clearTimeout(time);
    cancelAnimationFrame(timeAnimate);
  };
  
  onMounted(() => {
    nodeHeight.value = resultBox.value.firstElementChild.offsetHeight;
    setTime();
  });
  
  onBeforeUnmount(() => {
    clearTimeout(time);
    cancelAnimationFrame(timeAnimate);
  });
  </script>
  
  <style lang="scss" scoped>
  .test-page {
    background-color: #556a75;
    width:100%;
    height:100%;
    padding: 100px;
  }
  
  .header {
    margin:0px auto;
    width: 500px;
    display: flex;
    padding: 0 9px;
    align-items: center;
    height: 36px;
    background-color: rgba(33, 231, 209, 0.3);
  
    span {
      width: 33%;
      color: #21e7d1;
      font-size: 14px;
      font-weight: bold;
    }
  }
  
  .resultList {
    position: relative;
    margin: 0 auto;
    width: 500px;
    height: 320px;
    overflow: hidden;
    .resultItem {
      padding-top: 10px;
  
      .inner {
        display: flex;
        padding: 0 9px;
        align-items: center;
        height: 36px;
        background-color: rgba(33, 231, 209, 0.15);
        border: 1px solid rgba(33, 231, 209, 0.15);
        color: white;
        font-size: 14px;
        overflow: hidden;
  
        .money {
          color: #21e7d1;
          font-weight: bold;
        }
  
        span {
          width: 33%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  </style>
  