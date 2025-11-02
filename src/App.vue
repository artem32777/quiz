<script setup lang="ts">
import '@/assets/style/index.scss'
import BackgroundImages from '@/components/layout/default/BackgroundImages.vue'
import Info from '@/components/layout/default/Info.vue'
import Score from '@/components/layout/default/Score.vue'
import TextWrapper from '@/components/TextWrapper/TextWrapper.vue'
</script>

<template>
  <div class="app">
    <BackgroundImages />
    <Info />
    <Score />
    <RouterView />
  </div>
  <div class="prerender">
    <TextWrapper></TextWrapper>
    <TextWrapper type="legend"></TextWrapper>
    <TextWrapper type="prompt"></TextWrapper>
  </div>
</template>

<style lang="scss">
.app {
  height: 100vh;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.prerender {
  top: 0;
  position: absolute;
  left: -1000%;
  pointer-events: none;
  height: 100%;
  overflow: hidden;
}
</style>
