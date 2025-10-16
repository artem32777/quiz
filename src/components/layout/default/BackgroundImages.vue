<script setup lang="ts">
import slide1Bg from '@/slides/1/img/bg.webp'
import slide2Bg from '@/slides/2/img/bg.webp'
import slide3Bg from '@/slides/3/img/bg.webp'
import slide5Bg from '@/slides/5/img/bg.webp'
import slide6Bg from '@/slides/6/img/bg.webp'
import slide7Bg from '@/slides/7/img/bg.webp'
import slide8Bg from '@/slides/8/img/bg.webp'
import slide10Bg from '@/slides/10/img/bg.webp'
import slide11Bg from '@/slides/11/img/bg.webp'
import slide12Bg from '@/slides/12/img/bg.webp'
import { useRoute } from 'vue-router'

const bgImages: { slide: string; src: string }[] = [
  { slide: '2', src: slide2Bg },
  { slide: '3', src: slide3Bg },
  { slide: '5', src: slide5Bg },
  { slide: '6', src: slide6Bg },
  { slide: '7', src: slide7Bg },
  { slide: '8', src: slide8Bg },
  { slide: '10', src: slide10Bg },
  { slide: '11', src: slide11Bg },
  { slide: '12', src: slide12Bg },
]

const route = useRoute()
</script>

<template>
  <img
    :src="slide1Bg"
    alt="Задний фон"
    loading="eager"
    fetchpriority="high"
    :class="{ show: route.path === '/' }"
    class="background"
  />
  <img
    v-for="image in bgImages"
    :key="image.slide"
    :src="image.src"
    loading="lazy"
    fetchpriority="low"
    alt="Задний фон"
    :class="{ show: route.name == image.slide }"
    class="background"
  />
</template>

<style scoped lang="scss">
.background {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0;
  &.show {
    opacity: 1;
  }
}
</style>
