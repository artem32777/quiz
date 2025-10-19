<script setup lang="ts">
import { onMounted } from 'vue'
import { sleep } from '@/utils/utils.ts'
import { useProgressStore } from '@/stores/progress.ts'
import BaseButton from '@/components/BaseButton.vue'
import { useSlide } from '@/composables/useSlide.ts'
import TextWrapper from '@/components/TextWrapper/TextWrapper.vue'

const progress = useProgressStore()
const { state } = useSlide()

onMounted(async () => {
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
    height="30"
    type="legend"
  >
    парус ИМТ = ожирение <br />
    парус АД = уровень кровяного давления <br />
    другие паруса = лабораторные показатели.
  </TextWrapper>
  <TextWrapper
    :show="state.text"
    height="70"
  >
    Корабль — это наш пациент. Паруса говорят о рисках надвигающегося шторма: наличие ожирения,
    артериальной гипертензии, гипергликемии. Нам с Вами необходимо выбрать кораблю в правильное
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
