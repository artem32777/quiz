<script setup lang="ts">
import { type QuizOption, useProgressStore } from '@/stores/progress.ts'
import legend from '@/slides/8/img/legend.webp'
import textLeft from '@/slides/8/img/text-left.webp'
import textRight from '@/slides/8/img/text-right.webp'
import text from '@/slides/8/img/text.webp'
import btn1 from '@/slides/8/img/btn-1.webp'
import btn2 from '@/slides/8/img/btn-2.webp'
import btn3 from '@/slides/8/img/btn-3.webp'
import Image from '@/components/Image.vue'
import { onMounted } from 'vue'
import { sleep } from '@/utils/utils.ts'
import BaseButton from '@/components/BaseButton.vue'
import { useSlide } from '@/composables/useSlide.ts'

const progress = useProgressStore()
const { state } = useSlide()

const options: QuizOption[] = [
  {
    id: 'МЕТФОРМИН+ СИТАГЛИПТИН',
    score: 10,
    nextSlide: 7,
    img: btn1,
  },
  {
    id: 'МЕТФОРМИН + ИНГЛТ-2',
    score: 5,
    nextSlide: 10,
    img: btn2,
  },
  {
    id: 'СУЛЬФОНИЛ-МОЧЕВИНА',
    score: 0,
    nextSlide: 12,
    img: btn3,
  },
]

onMounted(async () => {
  progress.initializeOptions(options)
  await sleep(1000)
  state.legend = true
  await sleep(5000)
  state.legend = false
  await sleep(1000)
  state.textLeft = true
  await sleep(3000)
  state.textRight = true
  await sleep(3000)
  state.textLeft = false
  await sleep(1000)
  state.textRight = false
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
  <img
    :src="textLeft"
    class="bg-text text-left"
    :class="{ show: state.textLeft }"
    alt="Описание"
  />
  <img
    :src="textRight"
    class="bg-text text-right"
    :class="{ show: state.textRight }"
    alt="Описание"
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
      :selected="progress.getSelected?.id === option.id"
      @click="progress.selectOption(option.id)"
      class="slide-btn"
    >
      {{ option.id }}
    </BaseButton>
  </div>

  <BaseButton
    @click="progress.confirmSelection"
    :show="!!progress.getSelected"
    class="slide-confirm-btn"
  >
    ВЫБРАТЬ
  </BaseButton>
</template>

<style scoped lang="scss">
.bg-text {
  position: absolute;
  pointer-events: none;
  width: 30%;
  height: 30%;
  opacity: 0;
  transition: all 1s ease 0s;
  &.show {
    opacity: 1;
    transform: translate(0px, 0px);
  }
}

.text-left {
  left: 10%;
  bottom: 7%;
  transform: translate(0px, 10px);
}

.text-right {
  right: 10%;
  top: 7%;
  transform: translate(0px, -10px);
}

.text {
  width: 70%;
  height: 40%;
}

.buttons {
  position: absolute;
  bottom: 5%;
  display: flex;
  justify-content: center;
  column-gap: 3vw;
}

.slide-btn {
  font-size: 2.3vw;
  max-width: 25%;
}

.slide-confirm-btn {
  font-size: 5vw;
}
</style>
