<script setup lang="ts">
import { useProgressStore } from '@/stores/progress.ts'
import { sleep } from '@/utils/utils.ts'
import { onMounted } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import { useSlide } from '@/composables/useSlide.ts'
import TextWrapper from '@/components/TextWrapper/TextWrapper.vue'

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
  <div class="slide">
    <TextWrapper
      :show="state.text"
      height="80"
    >
      Поздравляем Вас! Вы успешно привели «корабль» в порт «Успех». Вместе с комбинацией ситаглиптин
      и метформин достигли у пациента целевых значений гликированного гемоглобина, снизили массу
      тела с высокой приверженностью к терапии. Вы одержали Победу в битве за β-клетки!»
    </TextWrapper>
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
  </div>
</template>

<style scoped lang="scss">
.slide {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 250;
  display: flex;
  align-items: center;
  justify-content: center;
}
.buttons {
  position: absolute;
  width: 100%;
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
