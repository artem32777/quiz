<script setup lang="ts">
import { useSound } from '@vueuse/sound'
import { ref, useTemplateRef } from 'vue'
import click from '@/assets/sounds/click.mp3'
import { onClickOutside } from '@vueuse/core'

const isInfoVisible = ref(false)
const clickSound = useSound(click, { volume: 0.2 })

const changeInfoVisibility = () => {
  if (!isInfoVisible.value) {
    clickSound.play()
  }
  isInfoVisible.value = !isInfoVisible.value
}

const target = useTemplateRef<HTMLElement>('target')

onClickOutside(target, (e) => {
  if (!isInfoVisible.value) {
    return
  }
  if (e.target) {
    const target = e.target as HTMLElement
    if (!target.classList.contains('info')) {
      changeInfoVisibility()
    }
  }
})
</script>

<template>
  <button
    @click="changeInfoVisibility"
    class="info-btn"
    title="Информация"
    ref="target"
  />
  <div
    class="info"
    :class="{ show: isInfoVisible }"
  >
    <img
      src="./bg.webp"
      alt="Информация"
      class="img"
    />
    <p class="text">
      • <span>β</span> клетки — <span>β</span> клетки островков Лангерганса <br />
      • ИР — инсулинорезистентность <br />
      • ИМТ — индекс массы тела <br />
      • АД — артериальное давление <br />
      • СД 2 типа — сахарный диабет 2 типа <br />
      • H<span>b</span>A₁c — гликированный гемоглобин <br />
      • ЛПНП — липопротеины низкой плотности <br />
      • ТГ — триглицериды <br />
      • ОТ — окружность талии <br />
      • СКФ — скорость клубочковой фильтрации <br />
      • вчСРБ — высокочувствительный С реактивный белок <br />
      • ИОЖ — изменение образа жизни <br />
      • МФ — метформин <br />
      • ДПП 4 — дипептидилпептидаза 4 <br />
      • ГПП 1 — глюкагоноподобный пептид 1 <br />
      • аГПП 1 — агонист рецептора <br />
      глюкагоноподобного пептида 1 <br />
      • иНГЛТ-2 — ингибитор натрий глюкозного котранспортёра-2 <br />
      • ССЗ — сердечно сосудистые заболевания <br />
    </p>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  position: fixed;
}

.info-btn {
  position: fixed;
  left: 2.3%;
  top: 4%;
  width: 4.5%;
  height: 8%;
  z-index: 100;
  @media (any-hover: hover) {
    &:hover {
      backdrop-filter: saturate(380%);
    }
  }
}

.info {
  position: fixed;
  z-index: 50;
  opacity: 0;
  transition: all 0.5s ease 0s;
  pointer-events: none;
  cursor: pointer;
  &.show {
    pointer-events: auto;
    opacity: 1;
    transform: translate(0px, 0px) scale(1);
  }
}

.img {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
}
.text {
  padding: 3vw;
  line-height: 1.3;
  text-align: center;
  font-size: 1.5vw;
  font-weight: 500;
  text-transform: uppercase;
  span {
    text-transform: lowercase;
  }
}
</style>
