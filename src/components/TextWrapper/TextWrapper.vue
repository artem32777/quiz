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

const wrapperBgImage = computed(() => {
  const image = {
    roll: textImg,
    legend: legendImg,
    prompt: promptImg,
  }
  return image[type]
})
</script>

<template>
  <Transition name="scale">
    <div
      v-if="show"
      :style="{ height: height + 'vh' }"
      class="wrapper"
      :class="`wrapper-${type}`"
    >
      <div class="text-inner">
        <slot />
      </div>
      <img
        :src="img || wrapperBgImage"
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
  cursor: pointer;
}

.img {
  height: 100%;
  width: 100%;
  filter: drop-shadow(0.5vw 0.5vw 0.5vw rgba(0, 0, 0, 0.55));
  transition: all 1s ease 0s;
  @media (any-hover: hover) {
    &:hover {
      transform: scaleX(1.05);
      filter: drop-shadow(1vw 1vw 1vw rgba(0, 0, 0, 0.7)) brightness(1.1);
    }
  }
  &:active {
    transform: scaleX(1.05);
    filter: drop-shadow(1vw 1vw 1vw rgba(0, 0, 0, 0.7)) brightness(1.1);
  }
  .wrapper-prompt & {
    transform: scaleX(1);
  }
}

.text-inner {
  position: absolute;
  inset: 15%;
  max-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  font-size: 2.4vw;
  line-height: 1.3;
  text-align: center;
  font-weight: 500;
  text-transform: uppercase;
  pointer-events: none;
  .wrapper-roll & {
    color: #805308;
    inset: 15%;
  }
  .wrapper-legend & {
  }
  .wrapper-prompt & {
  }
}
</style>
