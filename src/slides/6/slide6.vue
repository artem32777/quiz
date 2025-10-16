<script setup lang="ts">
import { type QuizOption, useProgressStore } from '@/stores/progress.ts'
import legend from '@/slides/5/img/legend.png'
import text from '@/slides/5/img/text.png'
import Image from '@/components/Image.vue'
import { onMounted } from 'vue'
import { sleep } from '@/utils/utils.ts'
import BaseButton from '@/components/BaseButton.vue'
import { useSlide } from '@/composables/useSlide.ts'

const progress = useProgressStore()
const { state } = useSlide()

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
    class="text"
  />

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
.text {
  width: 90%;
  height: 90%;
}

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
