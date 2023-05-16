<template>
  <div class="mask">
    <div id="viewer"></div>
  </div>
</template>

<script setup>
import { Viewer } from "photo-sphere-viewer"; // 引入组件
import "photo-sphere-viewer/dist/photo-sphere-viewer.css"; // 引入样式
import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers";
import "photo-sphere-viewer/dist/plugins/markers.css";
import imgUrl from "@/assets/images/1.jpg";
console.log(imgUrl);
const viewers = ref(null);
function draw() {
  viewers.value = new Viewer({
    container: document.querySelector("#viewer"),
    panorama: imgUrl,
    size: {
      width: "100%",
      height: "100%",
    },
    // navbar: [
    //   "zoom",
    //   {
    //     id: "my-button",
    //     content: "<svg...>",
    //     title: "Hello world",
    //     className: "custom-button",
    //     onClick: (viewer) => {
    //       alert("Hello from custom button");
    //     },
    //   },
    //   "caption",
    //   "fullscreen",
    // ],
    autorotateSpeed: "0.4rpm",
    autorotateIdle: true,
    autorotateDelay:500,
    defaultZoomLvl:12,
    fisheye: true,
    caption: "标题",
    plugins: [
      [
        MarkersPlugin,
        {
          markers: [
            {
              id: "circle",
              tooltip: "你看得到我？",
              circle: 20,
              svgStyle: {
                fill: "rgba(255,255,0,0.3)",
                stroke: "yellow",
                strokeWidth: "2px",
              },
              longitude: 1.5,
              latitude: 1.28,
              anchor: "center right",
            },
          ],
        },
      ],
    ],
  });
}
onMounted(() => {
  draw();
});
</script>
<style lang="scss" scoped>
.mask {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
#viewer {
  width: 1200px;
  height: 600px;
}
</style>
