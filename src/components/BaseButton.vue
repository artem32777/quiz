<script setup lang="ts">
import { useSlide } from '@/composables/useSlide.ts'

const { show = true } = defineProps<{
  show?: boolean
  selected?: boolean
}>()

const { sound } = useSlide()
</script>

<template>
  <Transition
    name="scale"
    :duration="{ enter: 500, leave: 0 }"
  >
    <button
      v-if="show"
      class="button"
      :class="{
        selected: selected,
      }"
    >
      <slot />
    </button>
  </Transition>
</template>

<style scoped lang="scss">
.button {
  background-color: #ffc102;
  color: #7c3d00;
  border: 0.7vw solid #d86a00;
  box-shadow: 0.5vw 0.5vw 0.5vw rgba(0, 0, 0, 0.55);
  border-radius: 3vw;
  font-size: 4vw;
  font-weight: 500;
  padding: 2.5vw;
  position: relative;
  z-index: 30;
  transition: filter 0.5s ease 0s;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  &.selected {
    filter: brightness(1.2);
  }
  @media (any-hover: hover) {
    &:hover {
      filter: brightness(1.2);
    }
  }
}
</style>
