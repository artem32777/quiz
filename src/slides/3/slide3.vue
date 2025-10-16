<script setup lang="ts">
import legend from './img/legend.png'
import text from './img/text.png'
import zoj from './img/zoj.webp'
import metformin from './img/metformin.webp'
import idpp from './img/idpp.webp'
import psm from './img/psm.webp'
import Image from '@/components/Image.vue'
import { onMounted } from 'vue'
import { type QuizOption, useProgressStore } from '@/stores/progress.ts'
import Slide3Confirm from '@/slides/3/Slide3Confirm.vue'
import { sleep } from '@/utils/utils.ts'
import { useSlide } from '@/composables/useSlide.ts'

const progress = useProgressStore()
const { state } = useSlide()

const options: QuizOption[] = [
  {
    id: 'ZOJ',
    img: zoj,
    score: 0,
    nextSlide: 5,
  },
  {
    id: 'Metformin',
    img: metformin,
    score: 5,
    nextSlide: 6,
  },
  {
    id: 'IDPP',
    img: idpp,
    score: 10,
    nextSlide: 7,
  },
  {
    id: 'PSM',
    img: psm,
    score: 5,
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
  <Slide3Confirm
    @confirm="progress.confirmSelection"
    class="confirm"
  />
</template>

<style scoped lang="scss">
.buttons {
  button {
    position: absolute;
    width: 22%;
    height: 45%;
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
      border-radius: 30px;
    }
    &:nth-child(1) {
      top: 4%;
      left: 10%;
      &::before {
        bottom: 1%;
        left: 6%;
        width: 84%;
        height: 27%;
      }
    }
    &:nth-child(2) {
      bottom: 3%;
      left: 10%;
      &::before {
        bottom: 3%;
        left: 3%;
        width: 87%;
        height: 30%;
      }
    }
    &:nth-child(3) {
      top: 3%;
      right: 11%;
      &::before {
        bottom: -2%;
        right: 9%;
        width: 84%;
        height: 28%;
      }
    }
    &:nth-child(4) {
      bottom: 3%;
      right: 11%;
      &::before {
        bottom: 5%;
        right: 8%;
        width: 84%;
        height: 28%;
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
</style>
