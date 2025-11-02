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
    <div class="card">
      <div
        class="card-inner"
        v-html="progress.getSelected?.id"
      />
    </div>
    <BaseButton
      class="btn"
      @click="progress.confirmSelection"
    >
      ВЫБРАТЬ
    </BaseButton>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  opacity: 0;
  pointer-events: none;
  overflow: visible;
  position: absolute;
  &.show {
    opacity: 1;
    pointer-events: auto;
  }
}

.card {
  width: 35vw;
  height: 35vw;
  box-shadow: 0.5vw 0.5vw 0.5vw rgba(0, 0, 0, 0.55);
  padding: 1vw;
  background-color: #00b39d;
}

.card-inner {
  border-radius: 1vw;
  width: 100%;
  height: 100%;
  background-color: #9bd9d6;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5vw;
  text-align: center;
  text-wrap: pretty;
  overflow-wrap: break-word;
  word-break: normal;
  text-transform: uppercase;
  font-weight: 500;
}

.btn {
  position: absolute;
  bottom: -2vw;
  left: 15%;
  width: 70%;
  font-size: 2.5vw;
  padding: 2vw 1vw 2vw;
}
</style>
