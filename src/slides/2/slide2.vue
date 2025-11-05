<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useProgressStore } from '@/stores/progress.ts'
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

onMounted(() => {
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
    парус ИМТ = ожирение <br />
    парус АД = уровень кровяного давления <br />
    другие паруса = лабораторные показатели.
  </TextWrapper>
  <TextWrapper
    :show="state.text"
    @click="nextStep"
    height="70"
  >
    Корабль — это наш пациент. Паруса говорят о рисках надвигающегося шторма: наличие ожирения,
    артериальной гипертензии, гипергликемии. Нам с Вами необходимо выбрать кораблю правильное
    направление.
  </TextWrapper>
  <BaseButton
    :show="state.btn"
    @click="progress.changeProgress(0, 3)"
    class="slide-btn"
  >
    ВЫБРАТЬ ПУТЬ
  </BaseButton>
</template>

<style scoped lang="scss">
.slide-btn {
  font-size: 3.3vw;
  position: absolute;
  bottom: 3%;
}
</style>
