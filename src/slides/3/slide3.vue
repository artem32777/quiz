<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { type QuizOption, useProgressStore } from '@/stores/progress.ts'
import Slide3Confirm from '@/slides/3/Slide3Confirm.vue'
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
    id: 'Только изменение образа жизни: диета, увеличение физической активности',
    score: 0,
    nextSlide: 5,
  },
  {
    id: 'начать прием метформина и ситаглиптина + ЗОЖ',
    score: 5,
    nextSlide: 6,
  },
  {
    id: 'начать прием метформина <br> + ЗОЖ',
    score: 10,
    nextSlide: 6,
  },
  {
    id: 'начать прием сульфо-нилмочевины + ЗОЖ',
    score: 5,
    nextSlide: 12,
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
    height="30"
    type="legend"
  >
    каждое направление = стратегия лечения <br />
    значок = тип вмешательства <br />
    ЗОЖ - здоровый образ жизни
  </TextWrapper>
  <TextWrapper
    :show="state.text"
    @click="nextStep"
  >
    <div>
      Перед вами навигационная схема: <br />
      куда направить «корабль» для максимальной защиты
      <div class="small">β</div>
      - клеток? Выберите одно из направлений. При нажатии на значок направления появится его
      описание и так можно переключаться между ними. Когда определитесь с направлением – нажмите
      кнопку «выбрать» в нужном Вам направлении.
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
  <Slide3Confirm />
</template>

<style scoped lang="scss">
.buttons {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
      border-radius: 1.5vw;
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
    &:active {
      &::before {
        backdrop-filter: brightness(2);
      }
    }
  }
}
</style>
