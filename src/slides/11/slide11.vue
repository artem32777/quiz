<script setup lang="ts">
import { useProgressStore } from '@/stores/progress.ts'
import { onMounted, reactive } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import TextWrapper from '@/components/TextWrapper/TextWrapper.vue'
import { useSlideSteps } from '@/composables/useSlideSteps.ts'

const progress = useProgressStore()

const state = reactive({
  text: false,
  rank: false,
  btn: false,
})

const { nextStep } = useSlideSteps(state)

const gameRank = () => {
  const { score } = progress
  return score >= 90
    ? 'Хранитель β-клеток'
    : score >= 70
      ? 'Страж инкретинов'
      : score >= 50
        ? 'Защитник метаболизма'
        : 'Исследователь в поисках'
}

onMounted(() => {
  nextStep()
})
</script>

<template>
  <div class="slide">
    <TextWrapper
      :show="state.text"
      @click="nextStep"
      height="85"
    >
      Поздравляем Вас! <br />
      Вы успешно привели «корабль» в порт «Успех». Вместе с комбинацией ситаглиптин и метформин
      достигли у пациента целевых значений гликированного гемоглобина, снизили массу тела с высокой
      приверженностью к терапии. Вы одержали Победу <br />
      в битве за β-клетки!»
    </TextWrapper>
    <TextWrapper
      :show="state.rank"
      @click="nextStep"
      type="legend"
      height="20"
    >
      Ваш ранг: "{{ gameRank() }}"
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
