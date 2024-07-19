<!-- Index.vue -->

<template>
  <div class="map">
    <div class="container">
      <div class="item" ref="cardRef1"></div>
      <div class="item" ref="cardRef2"></div>
      <div class="item" ref="cardRef3"></div>
      <div class="item" ref="cardRef4"></div>
    </div>
  </div>
</template>

<script setup>
import { useLightCard } from "@/hooks/use-light-card";
const { cardRef: cardRef1 } = useLightCard();
const { cardRef: cardRef2 } = useLightCard({
  light: {
    color: "#ffffff",
    width: 100,
  },
});
const { cardRef: cardRef3 } = useLightCard({
  light: {
    color: "yellow",
  },
});
const { cardRef: cardRef4 } = useLightCard({
  light: {
    color: "green",
    width: 100,
  },
});
</script>

<style scoped lang="scss">
.map {
  width: 100%;
  height: 100%;
  background: black;
}
.container {
  width: 100%;
  padding: 50px 150px;
  display: flex;
  justify-content: space-between;

  .item {
    position: relative;
    width: 165px;
    height: 165px;
    background: #1c1c1f;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
}
</style>
