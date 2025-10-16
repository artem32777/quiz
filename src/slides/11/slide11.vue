<script setup lang="ts">
import { useProgressStore } from '@/stores/progress.ts'
import text from '@/slides/11/img/text.webp'
import Image from '@/components/Image.vue'
import { sleep } from '@/utils/utils.ts'
import { onMounted } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import { useSlide } from '@/composables/useSlide.ts'

const progress = useProgressStore()
const { state } = useSlide()

onMounted(async () => {
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
    :img-src="text"
    :is-visible="state.text"
    class="text"
  />

  <div class="buttons">
    <BaseButton
      :show="state.btn"
      @click="progress.finishQuiz"
    >
      ЗАВЕРШИТЬ
    </BaseButton>
    <BaseButton
      :show="state.btn"
      @click="progress.finishQuiz"
    >
      НАЧАТЬ КВЕСТ <br />
      ЗАНОВО
    </BaseButton>
  </div>
</template>

<style scoped lang="scss">
.buttons {
  position: absolute;
  width: 80%;
  top: 35%;

  button {
    height: 7vw;
    width: 20vw;
    border-radius: 2vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5vw;
    position: absolute;

    &:nth-child(1) {
      left: 10%;
    }
    &:nth-child(2) {
      right: 10%;
    }
  }
}
</style>
