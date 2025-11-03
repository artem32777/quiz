<script setup lang="ts">
import TextWrapper from '@/components/TextWrapper/TextWrapper.vue'
import BaseButton from '@/components/BaseButton.vue'

const { show } = defineProps<{
  show?: boolean
}>()

const emits = defineEmits<{
  startGame: [void]
}>()
</script>

<template>
  <TextWrapper
    :show="show"
    height="55"
    class="text"
  >
    Добро пожаловать в мини-игру <br />
    “Инкретиновый пазл!” <br />
    Ваша задача — за 60 секунд <br />
    упорядочить ключевые эффекты ситаглиптина. Готовы?
  </TextWrapper>
  <div
    class="btn-wrapper"
    :class="{ show }"
  >
    <BaseButton
      @click="emits('startGame')"
      class="btn"
      >НАЧАТЬ ИГРУ</BaseButton
    >
  </div>
</template>

<style scoped lang="scss">
.text {
  position: absolute;
  top: 14%;
  cursor: default;
  pointer-events: none;
}

.btn-wrapper {
  position: absolute;
  bottom: 5%;
  opacity: 0;
  pointer-events: none;
  transform: translateY(5%);
  &.show {
    transition: all 0.5s ease 2s;
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }
}

.btn {
  font-size: 3.3vw;
}
</style>
