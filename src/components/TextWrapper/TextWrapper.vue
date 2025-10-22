<script setup lang="ts">
import textImg from './roll.webp'
import legendImg from './legend.webp'
import promptImg from './prompt.webp'
import { computed } from 'vue'

const {
  show = true,
  height = 95,
  type = 'roll',
  img,
} = defineProps<{
  show?: boolean
  height?: number | string
  type?: 'roll' | 'legend' | 'prompt'
  img?: string
}>()

const innerStyles = computed(() => {
  const styleMap = {
    roll: {
      bg: textImg,
      style: {
        color: '#805308',
        inset: '15%',
      },
    },
    legend: {
      bg: legendImg,
      style: {
        color: '#000',
        inset: '0',
      },
    },
    prompt: {
      bg: promptImg,
      style: {
        color: '#000',
        inset: '0',
      },
    },
  }

  return styleMap[type]
})
</script>

<template>
  <Transition name="scale">
    <div
      v-if="show"
      :style="{ height: height + 'vh' }"
      class="wrapper"
    >
      <div
        :style="innerStyles"
        class="text-inner"
      >
        <slot />
      </div>
      <img
        :src="img || innerStyles.bg"
        class="img"
        alt="Описание"
      />
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.wrapper {
  width: 85%;
  position: relative;
  height: v-bind(height + 'vh');
}

.img {
  height: 100%;
  width: 100%;
  filter: drop-shadow(0.5vw 0.5vw 0.5vw rgba(0, 0, 0, 0.55));
}

.text-inner {
  position: absolute;
  inset: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  font-size: 2.4vw;
  line-height: 1.3;
  text-align: center;
  font-weight: 500;
  text-transform: uppercase;
}
</style>
