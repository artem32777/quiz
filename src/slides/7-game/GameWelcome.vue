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
  <BaseButton
    @click="emits('startGame')"
    class="start-btn"
    :class="{ show }"
  >
    НАЧАТЬ ИГРУ
  </BaseButton>
</template>

<style scoped lang="scss">
.text {
  position: absolute;
  top: 14%;
}

.start-btn {
  font-size: 3.3vw;
  position: absolute;
  bottom: 5%;
  opacity: 0;
  pointer-events: none;
  transform: translateY(5%);
  &.show {
    transition: all 0.5s ease 3s;
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }
}
</style>
