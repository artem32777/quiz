<script setup lang="ts">
import { useSound } from '@vueuse/sound'
import { ref, useTemplateRef } from 'vue'
import click from '@/assets/sounds/click.mp3'
import { onClickOutside } from '@vueuse/core'

const isInfoVisible = ref(false)
const clickSound = useSound(click, { volume: 0.2 })

const changeInfoVisibility = () => {
  if (!isInfoVisible.value) {
    clickSound.play()
  }
  isInfoVisible.value = !isInfoVisible.value
}

const target = useTemplateRef<HTMLElement>('target')

onClickOutside(target, (e) => {
  if (!isInfoVisible.value) {
    return
  }
  if (e.target) {
    const target = e.target as HTMLElement
    if (!target.classList.contains('info')) {
      changeInfoVisibility()
    }
  }
})
</script>

<template>
  <button
    @click="changeInfoVisibility"
    class="info-btn"
    title="Информация"
    ref="target"
  />
  <img
    src="./info.webp"
    alt="Информация"
    class="info"
    :class="{ show: isInfoVisible }"
  />
</template>

<style scoped lang="scss">
.wrapper {
  position: fixed;
}

.info-btn {
  position: fixed;
  left: 2.3%;
  top: 4%;
  width: 4.5%;
  height: 8%;
  z-index: 100;
  @media (any-hover: hover) {
    &:hover {
      backdrop-filter: saturate(380%);
    }
  }
}

.info {
  position: fixed;
  z-index: 50;
  transform: scale(0.95);
  opacity: 0;
  width: 45%;
  transition: all 0.5s ease 0s;
  pointer-events: none;
  &.show {
    pointer-events: auto;
    opacity: 1;
    transform: translate(0px, 0px) scale(1);
  }
}
</style>
