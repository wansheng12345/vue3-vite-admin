<template>
  <div></div>
</template>
<script setup>
// 页面刷新时 ，跳转到该页面，然后在跳转回去
import { useRoute, useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();
const { params, query } = route
const { path } = params

router.replace({ path: '/' + path, query })
</script>