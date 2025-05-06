<script setup name="SafetyStock-Approval">
// 判断点击鼠标点击了元素的外部
const boxRef=ref(null)
onMounted(()=>{
  document.addEventListener('click',handleClick)
})
onUnmounted(()=>{
  document.removeEventListener('click',handleClick)
})
function handleClick(e){
  if(boxRef.value.contains(e.target)){
    console.log('点击的元素内部');
  }else{
    console.log('点击的元素外部');
  }
}
const boxRef2=ref(null)
const pageRef=ref(null)
function handleClickBox(e){
  console.log(document.body.contains(e.target));
  console.log(boxRef2.value.contains(e.target));
}
</script>
<template>
  <div class="test-page" ref="pageRef">
   <div class="box" ref="boxRef" @click="handleClickBox">
    <p>点击我</p>
   </div>
   <div class="box2" ref="boxRef2"></div>
  </div>
</template>
<style lang="scss" scoped>
.test-page{
  display:flex;
  align-items:center;
  justify-content:center;
  width:100%;
  height:100%;
  .box{
    width:300px;
    height:300px;
    background:#05683b;
  }
}
</style>