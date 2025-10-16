<script setup lang="ts">
import { useProgressStore } from '@/stores/progress.ts'
import BaseButton from '@/components/BaseButton.vue'

const progress = useProgressStore()
</script>

<template>
  <div
    class="wrapper"
    :class="{ show: progress.getSelected }"
  >
    <img
      v-if="progress.getSelected"
      :src="progress.getSelected.img"
      alt="Подсказка"
      class="option-image"
    />
    <BaseButton
      class="btn"
      @click="progress.confirmSelection()"
    >
      ВЫБРАТЬ
    </BaseButton>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 30%;
  height: 70%;
  opacity: 0;
  pointer-events: none;
  overflow: visible;
  position: relative;
  &.show {
    opacity: 1;
    pointer-events: auto;
  }
}

.btn {
  position: absolute;
  bottom: 0;
  left: 15%;
  width: 70%;
  font-size: 2.5vw;
  padding: 2vw 1vw 2vw;
}
</style>
