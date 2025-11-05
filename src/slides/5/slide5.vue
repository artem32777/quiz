<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { type QuizOption, useProgressStore } from '@/stores/progress.ts'
import BaseButton from '@/components/BaseButton.vue'
import TextWrapper from '@/components/TextWrapper/TextWrapper.vue'
import { useSlideSteps } from '@/composables/useSlideSteps.ts'

const progress = useProgressStore()

const state = reactive({
  legend: false,
  text: false,
  btn: false,
})

const { nextStep } = useSlideSteps(state)

const options: QuizOption[] = [
  {
    id: 'Metformin',
    score: 5,
    nextSlide: 6,
  },
  {
    id: 'Sitagliptin',
    score: 10,
    nextSlide: 7,
  },
]

onMounted(() => {
  progress.initializeOptions(options)
  nextStep()
})
</script>

<template>
  <TextWrapper
    :show="state.legend"
    @click="nextStep"
    height="40"
    type="legend"
  >
    <div>
      вода = ухудшение контроля; <br />
      уровень воды = HbA₁c > 8,5 %; <br />
      насос = прием метформина, снизит уровень HbA₁c. <br />
      Жемчужины -
      <div class="small">β</div>
      -клетки.
    </div>
  </TextWrapper>
  <TextWrapper
    :show="state.text"
    @click="nextStep"
  >
    <div>
      Только изменение образа жизни через некоторое время привели к кризису. Гликированный
      гемоглобин подскочил до 8,5 %. Глюкоза, в нашем случаео ее олицетворяет «вода» в трюме,
      превышает «допустимые» уровни и скоро все затопит. Нужно срочно менять тактику, чтобы спасти
      <div class="small">β</div>
      -клетки. Выберите необходимый насос для откачки «воды».
    </div>
  </TextWrapper>
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
  <BaseButton
    @click="progress.confirmSelection"
    :show="!!progress.getSelected"
    class="confirm-btn"
  >
    ВЫБРАТЬ
  </BaseButton>
</template>

<style scoped lang="scss">
.buttons {
  button {
    position: absolute;
    width: 30%;
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
    }
    &:nth-child(1) {
      height: 45%;
      left: 10%;
      &::before {
        width: 56%;
        height: 30%;
        bottom: 2%;
        left: 30%;
      }
    }
    &:nth-child(2) {
      height: 55%;
      bottom: 2%;
      right: 15%;
      &::before {
        width: 56%;
        height: 30%;
        bottom: 2%;
        left: 13%;
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

.confirm-btn {
  font-size: 4vw;
  padding: 3vw 7vw 3vw;
}
</style>
