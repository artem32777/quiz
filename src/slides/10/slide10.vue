<script setup lang="ts">
import { type QuizOption, useProgressStore } from '@/stores/progress.ts'
import legend from './img/legend.webp'
import text from './img/text.webp'
import Image from '@/components/Image.vue'
import { onMounted } from 'vue'
import { sleep } from '@/utils/utils.ts'
import BaseButton from '@/components/BaseButton.vue'
import { useSlide } from '@/composables/useSlide.ts'
import TextWrapper from '@/components/TextWrapper/TextWrapper.vue'

const progress = useProgressStore()
const { state } = useSlide()

const options: QuizOption[] = [
  {
    id: '1',
    score: 5,
    nextSlide: 9,
  },
  {
    id: '2',
    score: 10,
    nextSlide: 9,
  },
]

onMounted(async () => {
  progress.initializeOptions(options)
  await sleep(1000)
  state.legend = true
  await sleep(5000)
  state.legend = false
  await sleep(1000)
  state.text = true
  state.btn = true
})
</script>

<template>
  <TextWrapper
    :show="state.legend"
    type="legend"
    height="30"
  >
    туман = урогенитальные инфекции; <br />
    стрелки = варианты управления терапией
  </TextWrapper>

  <TextWrapper
    :show="state.text"
    height="40"
  >
    При добавлении иНГЛТ-2 появляется риск урогенитальных инфекций. Изменить или сохранить курс?
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
    class="slide-confirm-btn"
    :show="!!progress.getSelected"
  >
    ВЫБРАТЬ
  </BaseButton>
</template>

<style scoped lang="scss">
.buttons {
  button {
    position: absolute;
    bottom: 15%;
    width: 19%;
    z-index: 2;
    height: 45%;
    &.selected {
      &::before {
        backdrop-filter: hue-rotate(10deg) brightness(1.5);
      }
    }

    &::before {
      content: '';
      width: 79%;
      height: 32%;
      bottom: 4%;
      position: absolute;
      transition: backdrop-filter 0.3s ease 0s;
      border-radius: 20px;
    }

    &:nth-child(1) {
      left: 16%;
      &::before {
        left: 9%;
      }
    }
    &:nth-child(2) {
      right: 19%;
      &::before {
        width: 83%;
        left: 7%;
      }
    }

    @media (any-hover: hover) {
      &:hover {
        &::before {
          backdrop-filter: hue-rotate(10deg) brightness(1.5);
        }
      }
    }
  }
}

.slide-confirm-btn {
  position: absolute;
  padding: 2vw;
  border-radius: 1vw;
  border-width: 0.4vw;
  font-size: 2vw;
  bottom: 16%;
  right: 45%;
}
</style>
