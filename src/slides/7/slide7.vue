<script setup lang="ts">
import text from './img/text.png'
import Image from '@/components/Image.vue'
import { onMounted } from 'vue'
import { sleep } from '@/utils/utils.ts'
import { useProgressStore } from '@/stores/progress.ts'
import BaseButton from '@/components/BaseButton.vue'
import { useSlide } from '@/composables/useSlide.ts'

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
  <Image
    :img-src="text"
    :is-visible="state.text"
    class="text"
  />
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
  width: 90%;
  height: 100%;
}

.btn-confirm {
  font-size: 3.3vw;
  position: absolute;
  bottom: 5%;
}
</style>
