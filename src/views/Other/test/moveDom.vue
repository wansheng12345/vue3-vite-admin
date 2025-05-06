<template>
  <div class="box" ref="box">
    <div class="left">
      <!--左侧div内容-->
    </div>
    <div class="resize">
      ⋮
    </div>
    <div class="mid">
      <!--右侧div内容-->
    </div>
  </div>
</template>

<script setup>
function dragControllerDiv() {
  var resize = document.getElementsByClassName('resize');
  var left = document.getElementsByClassName('left');
  var mid = document.getElementsByClassName('mid');
  var box = document.getElementsByClassName('box');
  for (let i = 0; i < resize.length; i++) {
    // 鼠标按下事件
    resize[i].onmousedown = function (e) {
      //颜色改变提醒
      resize[i].style.background = '#818181';
      resize[i].style.color = '#fff';
      var startX = e.clientX;
      resize[i].left = resize[i].offsetLeft;
      // 鼠标拖动事件
      document.onmousemove = function (e) {
        var endX = e.clientX;
        var moveLen = resize[i].left + (endX - startX); // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
        var maxT = box[i].clientWidth - resize[i].offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度

        // if (moveLen < 32) moveLen = 32; // 左边区域的最小宽度为32px
        // if (moveLen > maxT - 150) moveLen = maxT - 150; //右边区域最小宽度为150px
        /* 左边最小值 20% */
        if (moveLen < box[i].clientWidth * .2) moveLen = box[i].clientWidth * .2;
        /* 左边最大值 80% */
        let leftMaxWith = box[i].clientWidth * .8;
        if (moveLen > leftMaxWith) moveLen = leftMaxWith;

        resize[i].style.left = moveLen; // 设置左侧区域的宽度

        for (let j = 0; j < left.length; j++) {
          left[j].style.width = moveLen + 'px';
          mid[j].style.width = (box[i].clientWidth - moveLen - 10) + 'px';
        }
      };
      // 鼠标松开事件
      document.onmouseup = function (evt) {
        //颜色恢复
        resize[i].style.background = '#d6d6d6';
        document.onmousemove = null;
        document.onmouseup = null;
        resize[i].releaseCapture && resize[i].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
      };
      resize[i].setCapture && resize[i].setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
      return false;
    };
  }
}
onMounted(() => {
  dragControllerDiv()
})
</script>

<style lang="scss" scoped>
/* 拖拽相关样式 */
/*包围div样式*/
.box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  // box-shadow: -1px 9px 10px 3px rgba(0, 0, 0, 0.11);

  /*左侧div样式*/
  .left {
    width: calc(32% - 15px);
    /*左侧初始化宽度*/
    height: 100%;
    background: #FFFFFF;
    box-shadow: -1px 9px 10px 3px rgba(0, 0, 0, 0.11);
  }

  /*拖拽区div样式*/
  .resize {
    cursor: col-resize;
    position: relative;
    z-index: 1;
    top: 45%;
    left: -3px;
    background-color: #d6d6d6;
    border-radius: 5px;
    margin-top: -10px;
    width: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 32px;
    color: #fff;
  }

  /*拖拽区鼠标悬停样式*/
  .resize:hover {
    color: #666666;
  }

  /*右侧div'样式*/
  .mid {
    border: 1px solid #e5e5e5;
    width: 68%;
    /*右侧初始化宽度*/
    height: 100%;
    background: #fff;
    // box-shadow: -1px 4px 5px 3px rgba(0, 0, 0, 0.11);
  }

}
</style>