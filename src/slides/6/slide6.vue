<script setup lang="ts">
import { type QuizOption, useProgressStore } from '@/stores/progress.ts'
import { onMounted, reactive } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import TextWrapper from '@/components/TextWrapper/TextWrapper.vue'
import { useSlideSteps } from '@/composables/useSlideSteps.ts'

const progress = useProgressStore()

const state = reactive({
  text: false,
  btn: false,
})

const { nextStep } = useSlideSteps(state)

const options: QuizOption[] = [
  {
    id: 'metformin',
    score: 5,
    nextSlide: 8,
  },
  {
    id: 'sitagliptin',
    score: 10,
    nextSlide: 7,
  },
  {
    id: 'none',
    score: 0,
    nextSlide: 8,
  },
  {
    id: 'psm',
    score: -5,
    nextSlide: 12,
  },
]

onMounted(() => {
  progress.initializeOptions(options)
  nextStep()
})
</script>

<template>
  <TextWrapper
    :show="state.text"
    @click="nextStep"
    height="65"
  >
    <div>
      Монотерапия метформином дала положительный результат, но дисфункция
      <p class="small">β</p>
      -клеток прогрессирует! Требуется интенсификация терапии для надежной защиты
      <p class="small">β</p>
      - клеток. Выбирайте скорее, коллега!
    </div>
  </TextWrapper>
  <div
    v-if="state.btn"
    class="buttons"
  >
    <button
      v-for="option in options"
      :key="option.id"
      @click="progress.selectOption(option.id)"
      :class="{ selected: progress.getSelected?.id === option.id }"
    />
  </div>
  <BaseButton
    @click="progress.confirmSelection"
    class="confirm-btn"
    :show="!!progress.getSelected"
  >
    ВЫБРАТЬ
  </BaseButton>
</template>

<style scoped lang="scss">
.buttons {
  button {
    position: absolute;
    bottom: 2%;
    width: 21%;
    z-index: 2;
    height: 60%;
    &.selected {
      &::before {
        backdrop-filter: hue-rotate(20deg) brightness(1.8);
      }
    }
    &::before {
      content: '';
      width: 91%;
      height: 40%;
      bottom: 2%;
      position: absolute;
      transition: backdrop-filter 0.3s ease 0s;
      border-radius: 20px;
    }

    &:nth-child(1) {
      left: 4%;
      &::before {
        left: 4%;
      }
    }
    &:nth-child(2) {
      left: 28%;
      &::before {
        left: 8%;
      }
    }
    &:nth-child(3) {
      left: 51%;
      &::before {
        left: 7%;
      }
    }
    &:nth-child(4) {
      left: 75%;
      &::before {
        left: 2%;
      }
    }

    @media (any-hover: hover) {
      &:hover {
        &::before {
          backdrop-filter: hue-rotate(20deg) brightness(1.8);
        }
      }
    }
  }
}
</style>
