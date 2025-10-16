<script setup lang="ts">
import legend from './img/legend.png'
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
  <Image
    :img-src="legend"
    :is-visible="state.legend"
  />
  <Image
    :img-src="text"
    :is-visible="state.text"
    class="text"
  />
  <BaseButton
    :show="state.btn"
    class="btn-confirm"
    @click="progress.changeProgress(0, 2)"
  >
    НАЧАТЬ ЭКСПЕДИЦИЮ
  </BaseButton>
</template>

<style scoped lang="scss">
.text {
  width: 100%;
  height: 70%;
}

.btn-confirm {
  width: 40%;
}
</style>
