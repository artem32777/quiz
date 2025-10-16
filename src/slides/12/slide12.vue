<script setup lang="ts">
import { type QuizOption, useProgressStore } from '@/stores/progress.ts'
import text from '@/slides/11/img/text.webp'
import Image from '@/components/Image.vue'
import { sleep } from '@/utils/utils.ts'
import { onMounted } from 'vue'
import legend from '@/slides/5/img/legend.png'
import BaseButton from '@/components/BaseButton.vue'
import { useSlide } from '@/composables/useSlide.ts'

const progress = useProgressStore()
const { state } = useSlide()

const options: QuizOption[] = [
  {
    id: 'ЗАМЕНИТЬ ПСМ НА СИТАГЛИПТИН',
    score: 10,
    nextSlide: 7,
  },
  {
    id: 'УБРАТЬ ПСМ',
    score: 0,
    nextSlide: 8,
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
  await sleep(1000)
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

  <div class="buttons">
    <BaseButton
      v-for="option in options"
      :key="option.id"
      :show="state.btn"
      @click="progress.selectOption(option.id)"
      :class="{ selected: progress.getSelected?.id === option.id }"
    >
      {{ option.id }}
    </BaseButton>
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
  position: absolute;
  width: 80%;
  top: 43%;
  button {
    font-size: 2vw;
    width: 25vw;
    height: 8vw;
    position: absolute;
    border-radius: 2vw;
    &:nth-child(1) {
    }
    &:nth-child(2) {
      right: 8%;
    }
  }
}

.slide-confirm-btn {
  transform: translate(-12%, 6%) scale(0.7);
}
</style>
