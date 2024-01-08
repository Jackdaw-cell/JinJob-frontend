<template>
  <div
    class="cover"
    :style="{ width: width + 'px', height: height ? height + 'px' : 'auto' }"
  >
    <img
      :src="proxy.globalInfo.adminImageUrl + cover"
      v-if="cover"
      style="object-fit: contain"
    />
    <div class="bg-color" :style="{ background: bgColor }" v-if="bgColor">
      {{ title }}
    </div>
    <img
      src="../assets/default_cover.png"
      v-if="cover == '' && bgColor == ''"
    />
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive } from "vue";

const props = defineProps({
  cover: {
    type: String,
  },
  bgColor: {
    type: String,
  },
  title: {
    type: String,
  },
  width: {
    type: Number,
    default: 100,
  },
  height: {
    type: Number,
  },
});
const { proxy } = getCurrentInstance();
</script>
<style lang="scss">
.cover {
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  img {
    width: 100%;
  }
  .bg-color {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
}
</style>