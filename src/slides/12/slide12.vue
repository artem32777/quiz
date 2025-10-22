<script setup lang="ts">
import { type QuizOption, useProgressStore } from '@/stores/progress.ts'
import { sleep } from '@/utils/utils.ts'
import { onMounted } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import { useSlide } from '@/composables/useSlide.ts'
import TextWrapper from '@/components/TextWrapper/TextWrapper.vue'

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
  <TextWrapper
    :show="state.legend"
    type="legend"
    height="60"
  >
    единичные светящиеся β клетки = истощение клеток от избыточной стимуляции ПСМ; <br />
    тощая команда = последствия гипогликемии, уровень глюкозы плазмы 2.9 ммоль/л; <br />
    аптечка = экстренная инъекция глюкозы.
  </TextWrapper>
  <TextWrapper
    :show="state.text"
    height="70"
  >
    Терапия препаратами сульфонилмочевины часто приводит к кризису: возникновение гипогликемических
    состояний, включая тяжёлые – уровень глюкозы плазмы менее 3,0 ммоль/л. Срочно меняем курс, чтобы
    спасти β клетки!
  </TextWrapper>
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
  height: 30%;
  top: 41%;
  display: flex;
  justify-content: space-between;
  button {
    font-size: 2vw;
    width: 25vw;
    height: 8vw;
    border-radius: 2vw;
  }
}

.slide-confirm-btn {
  transform: scale(0.7);
}
</style>
