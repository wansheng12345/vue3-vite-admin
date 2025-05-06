<template>
    <div id="Test" :style="style">
      <el-button @click="toggleSideBar">测试</el-button>
    </div>
  </template>
  
  <script setup>
  // import { useFullscreen } from '@vueuse/core'
  // const { isFullscreen, enter, exit, toggle } = useFullscreen();
  // import useAppStore from "@/store/modules/app";
  // const appStore = useAppStore();
  // const style=ref({})
  // function handleClick(params) {
  //   const { width, height } = document.body.getBoundingClientRect();
  //   console.log(width, height);
  //   style.value={
  //     width:width+'px',
  //     height:height+'px',
  //     position:'fixed',
  //     background:'#333333bb'
  //   }
  // }
  // function toggleSideBar() {
  //   appStore.toggleSideBar();
  //   toggle()
  // }
  </script>
  <style lang="scss" scoped>
  #Test {
    top: 0;
    left: 0;
    z-index: 9999;
  }
  </style>
  