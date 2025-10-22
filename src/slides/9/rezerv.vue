<script setup lang="ts">
import { ref, type ComponentPublicInstance, onMounted, reactive } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import areaHeart from './img/area/heart.webp'
import areaCarbon from './img/area/carbon.webp'
import areaKidneys from './img/area/kidneys.webp'
import areaWeight from './img/area/weight.webp'
import { useSlide } from '@/composables/useSlide.ts'
import { sleep } from '@/utils/utils.ts'
import TextWrapper from '@/components/TextWrapper/TextWrapper.vue'
import { type Slide9Card, slide9Cards } from '@/slides/9/cardsData.ts'
import Card from '@/components/Card.vue'

const { sound } = useSlide()

const state = reactive({
  text: false,
  game: false,
})

const areas = [
  { id: 'carbon', img: areaCarbon },
  { id: 'weight', img: areaWeight },
  { id: 'kidneys', img: areaKidneys },
  { id: 'heart', img: areaHeart },
] as const satisfies { id: string; img: string }[]

type AreaId = (typeof areas)[number]['id']

const cards = ref<Slide9Card[]>([...slide9Cards])

const draggedCardId = ref<string | null>(null)
const cardPositions = ref<Record<string, AreaId | null>>(
  Object.fromEntries(cards.value.map((card) => [card.id, null])),
)
const isChecked = ref(false)
const errorCards = ref<Set<string>>(new Set())
const hoveredArea = ref<AreaId | null>(null)
const draggedCardPosition = ref<{ x: number; y: number } | null>(null)
const areaElements = ref<Map<AreaId, HTMLElement>>(new Map())

const resetDragState = () => {
  draggedCardId.value = null
  hoveredArea.value = null
  draggedCardPosition.value = null
}

const placeDraggedTo = (areaId: AreaId) => {
  if (!draggedCardId.value) return
  cardPositions.value[draggedCardId.value] = areaId
  resetDragState()
}

const updateHoveredAreaFromPoint = (x: number, y: number) => {
  const element = document.elementFromPoint(x, y)
  hoveredArea.value = element
    ? (Array.from(areaElements.value.entries()).find(([, areaEl]) =>
        areaEl.contains(element),
      )?.[0] ?? null)
    : null
}

const startDrag = (cardId: string) => {
  draggedCardId.value = cardId
  isChecked.value = false
  errorCards.value.delete(cardId)
}

// HTML5 DnD
const handleDragStart = startDrag
const handleDragEnd = resetDragState
const handleDragOver = (event: DragEvent, areaId: AreaId) => {
  event.preventDefault()
  hoveredArea.value = areaId
}
const handleDragLeave = () => (hoveredArea.value = null)
const handleDrop = placeDraggedTo

// Touch
const handleTouchStart = (event: TouchEvent, cardId: string) => {
  const t = event.touches[0]
  if (!t) return
  startDrag(cardId)
  draggedCardPosition.value = { x: t.clientX, y: t.clientY }
}

const handleTouchMove = (event: TouchEvent) => {
  if (!draggedCardId.value) return
  event.preventDefault()
  const t = event.touches[0]
  if (!t) return
  draggedCardPosition.value = { x: t.clientX, y: t.clientY }
  updateHoveredAreaFromPoint(t.clientX, t.clientY)
}

const handleTouchEnd = (event: TouchEvent) => {
  if (!draggedCardId.value) return
  const t = event.changedTouches[0]
  if (t) {
    updateHoveredAreaFromPoint(t.clientX, t.clientY)
    if (hoveredArea.value) placeDraggedTo(hoveredArea.value)
  }
  resetDragState()
}

const setAreaRef = (el: Element | ComponentPublicInstance | null, areaId: AreaId) => {
  if (!el) return
  const htmlEl = '$el' in el && el.$el instanceof HTMLElement ? el.$el : el
  if (htmlEl instanceof HTMLElement) areaElements.value.set(areaId, htmlEl)
}

const checkResult = () => {
  isChecked.value = true
  errorCards.value = new Set(
    cards.value.filter((card) => cardPositions.value[card.id] !== card.area).map((card) => card.id),
  )
}

const getCardVariant = (cardId: string) =>
  isChecked.value && errorCards.value.has(cardId) ? 'error' : 'default'

const isCardPlaced = (cardId: string) => cardPositions.value[cardId] !== null
const shouldBeTransparent = (cardId: string) => isCardPlaced(cardId) && !isChecked.value
const isBeingDragged = (cardId: string) =>
  draggedCardId.value === cardId && draggedCardPosition.value !== null

onMounted(async () => {
  await sleep(1000)
  state.text = true
  await sleep(5000)
  state.text = false
  state.game = true
})
</script>

<template>
  <div class="slide">
    <TextWrapper
      height="70"
      class="text"
      :show="state.text"
    >
      Цель игры правильно распределить перетаскиванием карточки с утверждениями из левой колонки по
      4 системам организма в правой колонке. После распределения всех карточек для завершения игры
      необходимо нажать кнопку – «Проверить результат».
    </TextWrapper>
    <TextWrapper
      height="70"
      class="text"
      :show="state.text"
    >
      Для получения подсказки нажмите поочередно на карточки, окрашенные красным
    </TextWrapper>
    <div class="cards">
      <Card
        v-for="card in cards"
        :key="card.id"
        :variant="getCardVariant(card.id)"
        class="card"
        :class="{
          'card-placed': shouldBeTransparent(card.id),
          'card-dragging': isBeingDragged(card.id),
        }"
        draggable="true"
        @dragstart="handleDragStart(card.id)"
        @dragend="handleDragEnd"
        @touchstart.passive="handleTouchStart($event, card.id)"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        {{ card.id }}
      </Card>
    </div>

    <Teleport to="body">
      <div
        v-if="draggedCardId && draggedCardPosition"
        class="dragged-card-clone"
        :style="{ left: `${draggedCardPosition.x}px`, top: `${draggedCardPosition.y}px` }"
      >
        <Card :variant="getCardVariant(draggedCardId)">
          {{ draggedCardId }}
        </Card>
      </div>
    </Teleport>

    <div class="areas">
      <div
        v-for="area in areas"
        :key="area.id"
        :ref="(el) => setAreaRef(el, area.id)"
        class="area"
        :class="{ 'area-hovered': hoveredArea === area.id }"
        @dragover="handleDragOver($event, area.id)"
        @dragleave="handleDragLeave"
        @drop="handleDrop(area.id)"
      >
        <img
          :src="area.img"
          :alt="area.id"
        />
      </div>
    </div>

    <BaseButton
      :show="state.game"
      class="check-result"
      @click="checkResult"
    >
      Проверить <br />
      результат
    </BaseButton>
  </div>
</template>

<style scoped lang="scss">
.text {
  position: absolute;
  top: 10%;
  z-index: 10;
}

.slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  z-index: 250;
}

.cards {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1vw;
  padding: 1vw 0;
  justify-content: center;
  align-items: center;
}

.card {
  cursor: grab;
  touch-action: none;
  user-select: none;
  transition: opacity 0.2s ease;
}

.card-placed {
  opacity: 0.3;
  pointer-events: none;
}

.card-dragging {
  opacity: 0.3;
}

.dragged-card-clone {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  opacity: 0.9;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
}

.areas {
  position: absolute;
  top: 0;
  right: 0;
  width: 15%;
  height: 100%;
  padding: 0.5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.area {
  transition: transform 0.2s ease;
  width: 75%;
  &.area-hovered {
    transform: scale(1.1);
  }
}

.check-result {
  position: absolute;
  top: 1%;
  left: 0.5%;
  height: 1vw;
  font-size: 1vw;
  border-width: 0.2vw;
  border-radius: 1vw;
  padding: 1.5vw;
}
</style>
