<script setup lang="ts">
import text from './img/text.png'
import Image from '@/components/Image.vue'
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
  state.text = true
  await sleep(5000)
  state.btn = true
})
</script>

<template>
  <TextWrapper
    :show="state.text"
    height="70"
    class="text"
  >
    Отлично! Комбинация метформина и ситаглиптина запускает мощный двигатель, который повышает
    глюкагоноподобный пептид-1, снижает апоптоз β-клеток и постпрандиальную гликемию. Закрепи успех
    сыграв в мини-игру
  </TextWrapper>
  <BaseButton
    @click="progress.changeProgress(0, '7-game')"
    class="btn-confirm"
    :show="state.btn"
  >
    НАЧАТЬ ИГРУ <br />
    ИНКРЕТИНОВЫЙ ПАЗЛ
  </BaseButton>
</template>

<style scoped lang="scss">
.text {
  position: absolute;
  top: 5%;
}

.btn-confirm {
  font-size: 3.3vw;
  position: absolute;
  bottom: 5%;
}
</style>
