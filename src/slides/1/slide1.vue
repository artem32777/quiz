<script setup lang="ts">
import BaseButton from '../../components/BaseButton.vue'
import { onMounted, reactive } from 'vue'
import { useProgressStore } from '@/stores/progress.ts'
import TextWrapper from '@/components/TextWrapper/TextWrapper.vue'
import { useSlideSteps } from '@/composables/useSlideSteps.ts'
import { sleep } from '@/utils/utils.ts'

const progress = useProgressStore()

const state = reactive({
  legend: false,
  text: false,
  btn: false,
})

const { nextStep } = useSlideSteps(state)

onMounted(async () => {
  await sleep(1000)
  void nextStep()
})
</script>

<template>
  <TextWrapper
    :show="state.legend"
    @click="nextStep"
    height="30"
    type="legend"
  >
    Остров = островки лангерганса <br />
    тучи = инсулиноррезистентность <br />
    светящиеся точки = живая масса β-клеток <br />
  </TextWrapper>
  <TextWrapper
    :show="state.text"
    @click="nextStep"
    height="60"
  >
    Ваша миссия началась: <br />
    тучи инсулинорезистентности сгущаются над островом Панкреона, и β-клеткам грозит апоптоз. Вам
    нужно восстановить баланс инкретинов и спасти секреторную функцию
  </TextWrapper>
  <BaseButton
    :show="state.btn"
    class="btn-confirm"
    @click="progress.changeProgress(0, 2)"
  >
    НАЧАТЬ ЭКСПЕДИЦИЮ
  </BaseButton>
</template>

<style scoped lang="scss">
.btn-confirm {
  width: 40%;
}

.test {
  font-size: 50px;
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
}
</style>
