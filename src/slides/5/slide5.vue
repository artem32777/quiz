<script setup lang="ts">
import legend from './img/legend.png'
import text from './img/text.png'
import Image from '@/components/Image.vue'
import { onMounted } from 'vue'
import { type QuizOption, useProgressStore } from '@/stores/progress.ts'
import BaseButton from '@/components/BaseButton.vue'
import { sleep } from '@/utils/utils.ts'
import { useSlide } from '@/composables/useSlide.ts'

const progress = useProgressStore()
const { state } = useSlide()

const options: QuizOption[] = [
  {
    id: 'Metformin',
    score: 5,
    nextSlide: 6,
  },
  {
    id: 'Sitagliptin',
    score: 10,
    nextSlide: 7,
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
  await sleep(5000)
  state.text = false
  state.btn = true
})
</script>

<template>
  <Image
    :img-src="legend"
    :is-visible="state.legend"
  />
  <Image
    :img-src="text"
    :is-visible="state.text"
  />
  <div
    v-if="state.btn"
    class="buttons"
  >
    <button
      v-for="option in options"
      :key="option.id"
      @click="progress.selectOption(option.id)"
      :class="{
        selected: progress.getSelected?.id === option.id,
      }"
    />
  </div>
  <BaseButton
    @click="progress.confirmSelection"
    :show="!!progress.getSelected"
    class="confirm-btn"
  >
    ВЫБРАТЬ
  </BaseButton>
</template>

<style scoped lang="scss">
.buttons {
  button {
    position: absolute;
    width: 30%;
    z-index: 2;
    &.selected {
      &::before {
        backdrop-filter: brightness(2);
      }
    }

    &::before {
      content: '';
      position: absolute;
      transition: backdrop-filter 0.5s ease 0s;
    }
    &:nth-child(1) {
      height: 45%;
      left: 10%;
      &::before {
        width: 56%;
        height: 30%;
        bottom: 2%;
        left: 30%;
      }
    }
    &:nth-child(2) {
      height: 55%;
      bottom: 2%;
      right: 15%;
      &::before {
        width: 56%;
        height: 30%;
        bottom: 2%;
        left: 13%;
      }
    }

    @media (any-hover: hover) {
      &:hover {
        &::before {
          backdrop-filter: brightness(2);
        }
      }
    }
  }
}

.confirm-btn {
  font-size: 4vw;
  padding: 3vw 7vw 3vw;
}
</style>
