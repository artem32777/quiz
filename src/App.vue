<script setup lang="ts">
import '@/assets/style/index.scss'
import BackgroundImages from '@/components/layout/default/BackgroundImages.vue'
import Info from '@/components/layout/default/Info.vue'
import Score from '@/components/layout/default/Score.vue'
</script>

<template>
  <BackgroundImages />
  <Info />
  <Score />
  <RouterView />
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
</style>
