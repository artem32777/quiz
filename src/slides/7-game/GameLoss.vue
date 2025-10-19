<script setup lang="ts">
import TextWrapper from '@/components/TextWrapper/TextWrapper.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useProgressStore } from '@/stores/progress.ts'
import { onMounted } from 'vue'
import { useSound } from '@vueuse/sound'
import hover from '@/assets/sounds/hover.mp3'

defineProps<{
  show?: boolean
}>()

const emits = defineEmits<{
  restartGame: [void]
}>()

const progress = useProgressStore()
</script>

<template>
  <Transition name="scale">
    <div
      v-show="show"
      class="wrapper"
    >
      <TextWrapper
        height="40"
        class="text"
      >
        Время вышло! Попробуйте еще раз — Вы на верном пути к экспертному уровню
      </TextWrapper>
      <div
        class="buttons"
        :class="{ show }"
      >
        <BaseButton
          @click="progress.changeProgress(0, 9)"
          class="btn"
        >
          Дальше
        </BaseButton>
        <BaseButton
          @click="emits('restartGame')"
          class="btn"
        >
          Пройти игру <br />
          ещё раз
        </BaseButton>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
}

.text {
  position: absolute;
  width: 95%;
  z-index: 1;
  top: 20%;
}

.buttons {
  position: absolute;
  z-index: 2;
  bottom: 7%;
  height: 15%;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 15%;
  opacity: 0;
  pointer-events: none;
  transform: translateY(5%);
  &.show {
    animation: showButtons 0.5s ease 1s forwards;
  }

  @keyframes showButtons {
    to {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }
  }
}

.btn {
  font-size: 1.8vw;
  width: 25%;
  padding: 1vw;
  border-radius: 2vw;
  border-width: 0.5vw;
}
</style>
