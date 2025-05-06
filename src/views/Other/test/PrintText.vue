<template>
  <main>
    <p class="text" v-html="displayedString"></p>
    <el-button @click="startPrinting">点击开启动态效果</el-button>
    <el-button @click="stopPrinting">停止动态效果</el-button>
  </main>
</template>

<script setup>
import { ref } from "vue";

const stringB = ref(
  "苏子曰：“客亦知夫水与月乎？逝者如斯，而未尝往也；盈虚者如彼，而卒莫消长也。盖将自其变者而观之，则天地曾不能以一瞬；自其不变者而观之，则物与我皆无尽也，而又何羡乎!且夫天地之间，物各有主,苟非吾之所有，虽一毫而莫取。惟江上之清风，与山间之明月，耳得之而为声，目遇之而成色，取之无禁，用之不竭，是造物者之无尽藏也，而吾与子之所共适。”"
);
const displayedString = ref("");

let index = 0;
let intervalId = null;

function startPrinting() {
  index = 0;
  displayedString.value = "";
  intervalId = setInterval(() => {
    if (index < stringB.value.length) {
      displayedString.value += stringB.value.charAt(index);
      index++;
    } else {
      clearInterval(intervalId);
    }
  }, 50);
}

function stopPrinting() {
  clearInterval(intervalId);
}
</script>

<style scoped>
.text {
  font-size:16px;
  white-space: pre-wrap; /* 保持空格和换行 */
}
</style>
<!-- 
   
  <script setup>
import { ref } from 'vue';

const stringA = ref('');
const stringB = ref('苏子曰：“客亦知夫水与月乎？逝者如斯，而未尝往也；盈虚者如彼，而卒莫消长也。盖将自其变者而观之，则天地曾不能以一瞬；自其不变者而观之，则物与我皆无尽也，而又何羡乎!且夫天地之间，物各有主,苟非吾之所有，虽一毫而莫取。惟江上之清风，与山间之明月，耳得之而为声，目遇之而成色，取之无禁，用之不竭，是造物者之无尽藏也，而吾与子之所共适。”');

let intervalId = null;

function startPrinting() {
  if (intervalId) return; // 防止重复启动

  intervalId = setInterval(() => {
    if (stringA.value.length < stringB.value.length) {
      stringA.value += stringB.value.charAt(stringA.value.length);
    } else {
      clearInterval(intervalId); // 完成后清除定时器
      intervalId = null; // 重置 intervalId
    }
  }, 50);
}

function stopPrinting() {
  clearInterval(intervalId);
  intervalId = null; // 重置 intervalId
}

</script>

<template>
  <main>
    <p class="text">{{ stringA }}</p>
    <el-button @click="startPrinting">点击开启动态效果</el-button>
    <el-button @click="stopPrinting">停止动态效果</el-button>
  </main>
</template>

<style scoped>
.text {
  font-size:16px;
}
</style>
  -->
