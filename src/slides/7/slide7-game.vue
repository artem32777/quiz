<script setup lang="ts">
import { ref, computed } from 'vue'
import bgImg from '@/slides/7/img/game/bg.webp'
import Image from '@/components/Image.vue'

// Простая игра: перетащите карточки A–D в соответствующие слоты A–D
type CardId = 'A' | 'B' | 'C' | 'D'

type Card = {
  id: CardId
  img: string
  label: string
}

const cards = ref<Card[]>([
  { id: 'A', img: new URL('./img/A.png', import.meta.url).href, label: 'A' },
  { id: 'B', img: new URL('./img/B.png', import.meta.url).href, label: 'B' },
  { id: 'C', img: new URL('./img/C.png', import.meta.url).href, label: 'C' },
  { id: 'D', img: new URL('./img/D.png', import.meta.url).href, label: 'D' },
])

const placed = ref<Record<CardId, CardId | null>>({
  A: null,
  B: null,
  C: null,
  D: null,
})

const dragging = ref<CardId | null>(null)
const message = ref<string>('Перетащите карточки в соответствующие слоты')

// Источники данных для отображения
const remaining = computed(() =>
  cards.value.filter((c) => !Object.values(placed.value).includes(c.id)),
)
const isComplete = computed(() =>
  (['A', 'B', 'C', 'D'] as CardId[]).every((slot) => placed.value[slot] === slot),
)

// DnD обработчики
function onDragStart(e: DragEvent, id: CardId) {
  dragging.value = id
  e.dataTransfer?.setData('text/plain', id)
  const ghost = createGhost(id)
  if (ghost) {
    const r = ghost.getBoundingClientRect()
    e.dataTransfer?.setDragImage(ghost, r.width / 2, r.height / 2)
  }
}

function onDragEnd() {
  dragging.value = null
}

function onDragOver(e: DragEvent) {
  e.preventDefault()
}

function onDrop(e: DragEvent, slot: CardId) {
  e.preventDefault()
  const id = (e.dataTransfer?.getData('text/plain') || dragging.value) as CardId | null
  if (!id) return
  // Разрешаем перекладывать: снимаем прошлое размещение этой карточки (если было)
  for (const k of Object.keys(placed.value) as CardId[]) {
    if (placed.value[k] === id) placed.value[k] = null
  }
  placed.value[slot] = id

  if (id === slot) {
    message.value = `Верно: карточка ${id} в слоте ${slot}`
  } else {
    message.value = `Пока нет: карточка ${id} должна быть в слоте ${id}`
  }
}

function resetGame() {
  ;(['A', 'B', 'C', 'D'] as CardId[]).forEach((k) => (placed.value[k] = null))
  message.value = 'Игра сброшена. Поехали!'
}

// Кастомный drag-образ: копируем плитку с изображением
function createGhost(id: CardId) {
  const el = document.querySelector<HTMLElement>(`[data-card-id="${id}"]`)
  if (!el) return null
  const clone = el.cloneNode(true) as HTMLElement
  const cs = getComputedStyle(el)
  clone.style.cssText = `
    position: fixed;
    top: -1000px;
    left: -1000px;
    z-index: 2147483647;
    pointer-events: none;
    width: ${cs.width};
    height: ${cs.height};
    border-radius: ${cs.borderRadius};
    background: ${cs.background};
    box-shadow: ${cs.boxShadow};
  `
  document.body.appendChild(clone)
  requestAnimationFrame(() => clone.remove())
  return clone
}
</script>

<template>
  <Image
    :is-visible="true"
    :img-src="bgImg"
    class="bg"
  />
  <main class="slide">
    <div class="pool">
      <h2>Карточки</h2>
      <div class="cards">
        <button
          v-for="c in remaining"
          :key="c.id"
          class="card"
          :data-card-id="c.id"
          draggable="true"
          @dragstart="onDragStart($event, c.id)"
          @dragend="onDragEnd"
          title="Перетащите в подходящий слот"
        >
          <img
            :src="c.img"
            :alt="c.label"
          />
          <span class="badge">{{ c.label }}</span>
        </button>
        <p
          v-if="remaining.length === 0"
          class="hint"
        >
          Все карточки размещены
        </p>
      </div>
    </div>

    <div class="slots">
      <div
        v-for="slot in ['A', 'B', 'C', 'D']"
        :key="slot"
        class="slot"
        :data-active="dragging ? '1' : '0'"
        @dragover="onDragOver"
        @drop="onDrop($event, slot as CardId)"
      >
        <div class="slot-head">
          <span class="slot-label">Слот {{ slot }}</span>
        </div>

        <div
          class="slot-body"
          :data-filled="placed[slot as CardId] ? '1' : '0'"
        >
          <template v-if="placed[slot as CardId]">
            <div class="placed">
              <img
                :src="cards.find((c) => c.id === placed[slot as CardId])?.img"
                :alt="placed[slot as CardId] as string"
              />
              <span class="badge">{{ placed[slot as CardId] }}</span>
            </div>
          </template>
          <template v-else>
            <span class="placeholder">Перетащите сюда</span>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.bg {
  max-width: 100%;
  z-index: -1;
}

.board {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.pool {
  border-radius: 10px;
  padding: 12px;

  h2 {
    margin: 0 0 8px;
    font-size: 16px;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
  }

  .card {
    display: grid;
    grid-template-rows: auto 24px;
    align-items: center;
    justify-items: center;
    padding: 8px;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    background: #fff;
    cursor: grab;
    user-select: none;
    transition: transform 0.08s ease;
    outline: none;
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.06);

    &:active {
      transform: none; // не меняем визуал во время dnd
      cursor: grabbing;
    }

    img {
      width: 100%;
      height: 90px;
      object-fit: contain;
      border-radius: 8px;
      pointer-events: none;
    }

    .badge {
      font-size: 12px;
      font-weight: 700;
      color: #111827;
      background: #f3f4f6;
      border-radius: 999px;
      padding: 2px 8px;
      pointer-events: none;
    }
  }

  .hint {
    color: #6b7280;
    font-size: 13px;
  }
}

.slots {
  display: grid;
  gap: 12px;
}

.slot {
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  padding: 10px;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &[data-active='1'] {
    background: #f8fafc;
    border-color: #94a3b8;
  }

  .slot-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;

    .slot-label {
      font-size: 14px;
      font-weight: 700;
      color: #374151;
    }
  }

  .slot-body {
    min-height: 120px;
    display: grid;
    place-items: center;
    background: #ffffff;
    border-radius: 10px;

    &[data-filled='0'] {
      box-shadow: inset 0 0 0 2px #f3f4f6;
    }
  }

  .placeholder {
    color: #9ca3af;
    font-size: 13px;
  }

  .placed {
    display: grid;
    grid-template-rows: auto 24px;
    justify-items: center;

    img {
      width: 160px;
      height: 100px;
      object-fit: contain;
      border-radius: 8px;
      pointer-events: none;
      box-shadow: 0 1px 2px rgba(16, 24, 40, 0.06);
    }

    .badge {
      margin-top: 4px;
      font-size: 12px;
      font-weight: 700;
      color: #111827;
      background: #e5e7eb;
      border-radius: 999px;
      padding: 2px 8px;
      pointer-events: none;
    }
  }
}
</style>
