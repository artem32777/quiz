<script setup lang="ts">
import BaseButton from '../../components/BaseButton.vue'
import { onMounted } from 'vue'
import { sleep } from '@/utils/utils.ts'
import { useProgressStore } from '@/stores/progress.ts'
import { useSlide } from '@/composables/useSlide.ts'
import TextWrapper from '@/components/TextWrapper/TextWrapper.vue'

const progress = useProgressStore()
const { state } = useSlide()

onMounted(async () => {
  // await sleep(1000)
  // state.legend = true
  // await sleep(3000)
  // state.legend = false
  // await sleep(1000)
  // state.text = true
  // await sleep(3000)
  // state.text = false
  // await sleep(1000)
  // state.btn = true
})
</script>

<template>
  <TextWrapper
    :show="state.legend"
    height="30"
    type="legend"
  >
    Остров = островки лангерганса <br />
    тучи = инсулиноррезистентность <br />
    светящиеся точки = живая масса β-клеток <br />
  </TextWrapper>
  <TextWrapper
    :show="state.text"
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
</style>
