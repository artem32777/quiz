<script setup lang="ts">
import { type QuizOption, useProgressStore } from '@/stores/progress.ts'
import { onMounted, reactive } from 'vue'
import { sleep } from '@/utils/utils.ts'
import BaseButton from '@/components/BaseButton.vue'
import TextWrapper from '@/components/TextWrapper/TextWrapper.vue'

const progress = useProgressStore()

const state = reactive({
  legend: false,
  textLeft: false,
  textRight: false,
  text: false,
  btn: false,
})

const options: QuizOption[] = [
  {
    id: 'МЕТФОРМИН+ СИТАГЛИПТИН',
    score: 10,
    nextSlide: 7,
  },
  {
    id: 'МЕТФОРМИН + ИНГЛТ-2',
    score: 5,
    nextSlide: 10,
  },
  {
    id: 'СУЛЬФОНИЛ-МОЧЕВИНА',
    score: 0,
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
  <TextWrapper
    :show="state.legend"
    type="legend"
    height="30"
  >
    заполненность трюма = <br />
    результат монотерапии метформином; <br />
    вода = прогрессирующая дисфункция в-клеток.
  </TextWrapper>
  <p
    class="bg-text text-left"
    :class="{ show: state.textLeft }"
  >
    Монотерапия метформином с трудом удерживает судно на плаву, но в-клетки продолжают погибать. Как
    спасти команду?!?
  </p>
  <p
    class="bg-text text-right"
    :class="{ show: state.textRight }"
  >
    Комбинация метформина и ситаглиптина «высушила бы трюм» и сбалансировала бы корабль».
  </p>

  <TextWrapper
    :show="state.text"
    height="50"
    class="text"
  >
    Мы видим результаты двух тактик лечения. Вам необходимо выбрать: «Что делать дальше?»
  </TextWrapper>

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
  color: white;
  font-size: 2vw;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  line-height: 1.2;
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
  top: 10%;
  transform: translate(0px, -10px);
}

.text {
  position: absolute;
  top: 7%;
  width: 80%;
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
  top: 5%;
  font-size: 3vw;
}
</style>
