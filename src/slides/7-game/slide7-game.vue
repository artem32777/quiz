<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { sleep } from '@/utils/utils.ts'
import CardsGame from '@/slides/7-game/CardsGame.vue'
import GameHeader from '@/slides/7-game/GameHeader.vue'
import GameWelcome from '@/slides/7-game/GameWelcome.vue'
import GameWin from '@/slides/7-game/GameWin.vue'
import GameLoss from '@/slides/7-game/GameLoss.vue'
import { useSlide } from '@/composables/useSlide.ts'

const { sound } = useSlide()

export type Slide7GameState = {
  welcome: boolean
  header: boolean
  game: boolean
  win: boolean
  loss: boolean
}

const state = reactive<Slide7GameState>({
  welcome: false,
  header: false,
  game: false,
  win: false,
  loss: false,
})

const startGame = () => {
  state.welcome = false
  state.header = true
  state.game = true
}

const handleWin = () => {
  state.game = false
  state.win = true
  sound.done.play()
}

const handleLoss = () => {
  state.game = false
  state.loss = true
  sound.gameOver.play()
}

const restartGame = () => {
  state.win = false
  state.loss = false
  state.game = true
}

onMounted(async () => {
  await sleep(1000)
  state.welcome = true
})
</script>

<template>
  <div class="slide">
    <CardsGame
      :is-game-started="state.game"
      @win="handleWin"
    />
    <GameWelcome
      :show="state.welcome"
      @startGame="startGame"
    />
    <GameHeader
      v-show="state.header"
      :is-game-started="state.game"
      @loss="handleLoss"
    />
    <GameWin
      :show="state.win"
      @restartGame="restartGame"
    />
    <GameLoss
      :show="state.loss"
      @restartGame="restartGame"
    />
  </div>
</template>

<style scoped lang="scss">
.slide {
  width: 100%;
  z-index: 250;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
