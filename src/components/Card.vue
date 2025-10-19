<script setup lang="ts">
const { variant = 'default' } = defineProps<{
  variant?: 'default' | 'error'
}>()
</script>

<template>
  <div
    class="card"
    :class="`card-${variant}`"
  >
    <div class="card-inner">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 10vw;
  height: 10vw;
  padding: 0.5vw;
  background-color: #00b39d;
  &.card-error {
    background-color: #ffb39d;
  }
}

.card-inner {
  border-radius: 1vw;
  width: 100%;
  height: 100%;
  background-color: #9bd9d6;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2vw;
  text-transform: uppercase;
  font-weight: 500;
  .card-error & {
    background-color: #ffd9d6;
    color: #ff0101;
  }
}
</style>
