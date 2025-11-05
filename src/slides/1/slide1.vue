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
    height="35"
    type="legend"
  >
    <div>
      Остров = островки лангерганса <br />
      тучи = инсулиноррезистентность <br />
      светящиеся точки = живая масса <br />
      <div class="small">β</div>
      - клеток
    </div>
  </TextWrapper>
  <TextWrapper
    :show="state.text"
    @click="nextStep"
    height="60"
  >
    <div>
      Ваша миссия началась: <br />
      тучи инсулинорезистентности сгущаются над островом Панкреона, и
      <div class="small">β</div>
      - клеткам грозит апоптоз. Вам нужно восстановить баланс инкретинов и спасти секреторную
      функцию
    </div>
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
</style>
