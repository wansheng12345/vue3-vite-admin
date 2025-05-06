<template>
    <!-- 使用 v-if 判断是否插入到 body 中 -->
    <!-- 创建一个容器，支持拖拽，使用 ref 引用该容器 -->
    <div
      ref="draggableContainer"
      class="draggable-container"
      @mousedown="startDrag"
      :style="containerStyle"
    >
      <!-- 插槽，用户可以将其他内容插入到这个容器中 -->
      <slot></slot>
  
      <!-- 创建缩放控制点，每个控制点代表一个边角，使用 v-for 循环渲染 -->
      <span
        v-for="type in resizeTypes"
        :key="type"
        :class="`${type}-resize`"
        @mousedown="startResize($event, type)"
      ></span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      zIndex: { type: Number, default: 1 }, // 层级，控制显示顺序
      left: { type: Number, default: 0 }, // 容器的初始 X 位置
      top: { type: Number, default: 0 }, // 容器的初始 Y 位置
      width: { type: Number, default: 300 }, // 容器的初始宽度
      height: { type: Number, default: 300 }, // 容器的初始高度
      minWidth: { type: Number, default: 100 }, // 容器的最小宽度
      minHeight: { type: Number, default: 100 }, // 容器的最小高度
    },
    data() {
      return {
        // 定义可缩放的边和角的类型
        resizeTypes: ["lt", "t", "rt", "r", "rb", "b", "lb", "l"],
        // 定义容器位置和大小的响应式数据
        position: { x: this.left, y: this.top }, // 容器的位置
        size: { width: this.width, height: this.height }, // 容器的尺寸
        originMouseX: 0, // 鼠标初始 X 坐标
        originMouseY: 0, // 鼠标初始 Y 坐标
        originContainX: 0, // 容器初始 X 坐标
        originContainY: 0, // 容器初始 Y 坐标
        originWidth: 0, // 容器初始宽度
        originHeight: 0, // 容器初始高度
        resizeType: "", // 当前缩放类型
      };
    },
    computed: {
      // 计算容器的样式
      containerStyle() {
        return {
          top: `${this.position.y}px`, // 设置容器的 top 样式
          left: `${this.position.x}px`, // 设置容器的 left 样式
          width: `${this.size.width}px`, // 设置容器的宽度
          height: `${this.size.height}px`, // 设置容器的高度
          zIndex: this.zIndex, // 设置容器的层级
        };
      },
    },
    methods: {
      /**
       * 拖拽逻辑
       */
      startDrag(event) {
        // 记录鼠标初始位置
        this.originMouseX = event.clientX;
        this.originMouseY = event.clientY;
  
        // 记录容器初始位置
        this.originContainX = this.position.x;
        this.originContainY = this.position.y;
  
        // 添加鼠标移动和鼠标松开事件监听
        document.addEventListener("mousemove", this.handleDrag);
        document.addEventListener("mouseup", this.stopDrag);
      },
  
      handleDrag(event) {
        this.position.x = this.originContainX + event.clientX - this.originMouseX;
        this.position.y = this.originContainY + event.clientY - this.originMouseY;
      },
  
      /**
       * 缩放逻辑
       */
      startResize(event, type) {
        this.resizeType = type; // 记录拖拽的边角的类型
  
        // 记录鼠标初始位置
        this.originMouseX = event.clientX;
        this.originMouseY = event.clientY;
  
        // 记录容器初始宽高
        this.originWidth = this.size.width;
        this.originHeight = this.size.height;
  
        // 记录容器初始位置
        this.originContainX = this.position.x;
        this.originContainY = this.position.y;
        
  
        event.stopPropagation(); // 阻止事件传播，防止触发拖拽
  
        // 添加鼠标移动和鼠标松开事件监听
        document.addEventListener("mousemove", this.handleResize);
        document.addEventListener("mouseup", this.stopDrag);
      },
  
      handleResize(event) {
        const deltaX = event.clientX - this.originMouseX; // 计算鼠标的横向位移
        const deltaY = event.clientY - this.originMouseY; // 计算鼠标的纵向位移
  
        let newWidth = this.originWidth;
        let newHeight = this.originHeight;
  
        // 根据缩放类型计算新的容器尺寸
        switch (this.resizeType) {
          case "lt": // 左上角
            newWidth = this.originWidth - deltaX;
            newHeight = this.originHeight - deltaY;
            if (newWidth >= this.minWidth) {
              this.position.x = this.originContainX + deltaX;
              this.size.width = newWidth;
            }
            if (newHeight >= this.minHeight) {
              this.position.y = this.originContainY + deltaY;
              this.size.height = newHeight;
            }
            break;
          case "t": // 上边
            newHeight = this.originHeight - deltaY;
            if (newHeight >= this.minHeight) {
              this.position.y = this.originContainY + deltaY;
              this.size.height = newHeight;
            }
            break;
          case "rt": // 右上角
            newWidth = this.originWidth + deltaX;
            newHeight = this.originHeight - deltaY;
            if (newWidth >= this.minWidth) {
              this.size.width = newWidth;
            }
            if (newHeight >= this.minHeight) {
              this.position.y = this.originContainY + deltaY;
              this.size.height = newHeight;
            }
            break;
          case "r": // 右边
            newWidth = this.originWidth + deltaX;
            if (newWidth >= this.minWidth) {
              this.size.width = newWidth;
            }
            break;
          case "rb": // 右下角
            newWidth = this.originWidth + deltaX;
            newHeight = this.originHeight + deltaY;
            if (newWidth >= this.minWidth) {
              this.size.width = newWidth;
            }
            if (newHeight >= this.minHeight) {
              this.size.height = newHeight;
            }
            break;
          case "b": // 下边
            newHeight = this.originHeight + deltaY;
            if (newHeight >= this.minHeight) {
              this.size.height = newHeight;
            }
            break;
          case "lb": // 左下角
            newWidth = this.originWidth - deltaX;
            newHeight = this.originHeight + deltaY;
            if (newWidth >= this.minWidth) {
              this.position.x = this.originContainX + deltaX;
              this.size.width = newWidth;
            }
            if (newHeight >= this.minHeight) {
              this.size.height = newHeight;
            }
            break;
          case "l": // 左边
            newWidth = this.originWidth - deltaX;
            if (newWidth >= this.minWidth) {
              this.position.x = this.originContainX + deltaX;
              this.size.width = newWidth;
            }
            break;
        }
      },
  
      /**
       * 停止拖拽或缩放
       * 清除事件监听器
       */
      stopDrag() {
        document.removeEventListener("mousemove", this.handleDrag);
        document.removeEventListener("mousemove", this.handleResize);
        document.removeEventListener("mouseup", this.stopDrag);
      },
    },
  
    // 组件销毁时移除事件监听
    beforeDestroy() {
      this.stopDrag();
    },
  };
  </script>
  <style lang="scss" scoped>
  $lineOffset: -6px;
  $cornerOffset: -8px;
  /* 拖拽容器的样式 */
  .draggable-container {
    position: fixed; /* 绝对定位 */
    cursor: move; /* 鼠标移动时显示抓手指针 */
    user-select: none; /* 禁止选中文本 */
    background-color: #33333369;
    span {
      position: absolute;
      display: block;
    }
    /* 左边和右边 */
    .l-resize,
    .r-resize {
      width: 8px;
      height: 100%;
      top: 0;
      cursor: w-resize;
    }
    .l-resize {
      left: $lineOffset;
    }
    .r-resize {
      right: $lineOffset;
    }
  
    /* 上边和下边 */
    .t-resize,
    .b-resize {
      width: 100%;
      height: 8px;
      left: 0;
      cursor: s-resize;
    }
    .t-resize {
      top: $lineOffset;
    }
    .b-resize {
      bottom: $lineOffset;
    }
    /* 四个角 */
    .lt-resize,
    .rt-resize,
    .rb-resize,
    .lb-resize {
      width: 15px;
      height: 15px;
      z-index: 10;
    }
    .lt-resize,
    .lb-resize {
      left: $cornerOffset;
    }
    .lt-resize,
    .rt-resize {
      top: $cornerOffset;
    }
    .rt-resize,
    .rb-resize {
      right: $cornerOffset;
    }
    .rb-resize,
    .lb-resize {
      bottom: $cornerOffset;
    }
  
    .lt-resize,
    .rb-resize {
      cursor: se-resize;
    }
    .rt-resize,
    .lb-resize {
      cursor: sw-resize;
    }
  }
  </style>
  