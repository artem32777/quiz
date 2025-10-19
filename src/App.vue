<script setup lang="ts">
import '@/assets/style/index.scss'
import BackgroundImages from '@/components/layout/default/BackgroundImages.vue'
import Info from '@/components/layout/default/Info.vue'
import Score from '@/components/layout/default/Score.vue'
import TextWrapper from '@/components/TextWrapper/TextWrapper.vue'
</script>

<template>
  <BackgroundImages />
  <Info />
  <Score />
  <RouterView />
  <TextWrapper class="prerender-element">1</TextWrapper>
  <TextWrapper
    type="legend"
    class="prerender-element"
  >
    2
  </TextWrapper>
</template>

<style lang="scss">
#app {
  height: 100vh;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.prerender-element {
  position: absolute;
  top: -100vh;
  opacity: 0;
  pointer-events: none;
}
</style>
