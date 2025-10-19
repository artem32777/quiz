import { reactive } from 'vue'
import { useSound } from '@vueuse/sound'
import hover from '@/assets/sounds/hover.mp3'
import soundOn from '@/assets/sounds/click2.mp3'
import done from '@/assets/sounds/done.mp3'
import click from '@/assets/sounds/pick2.mp3'
import unclick from '@/assets/sounds/unclick.mp3'
import gameOverSound from '@/assets/sounds/gameOver.mp3'

export const useSlide = () => {
  const state = reactive({
    legend: false,
    text: false,
    btn: false,
  })

  const sound = {
    hover: useSound(hover, { volume: 0.1 }),
    select: useSound(unclick, { volume: 0.1 }),
    unselect: useSound(soundOn, { volume: 0.075 }),
    confirm: useSound(click, { volume: 0.05 }),
    done: useSound(done, { volume: 0.05 }),
    gameOver: useSound(gameOverSound, { volume: 0.05 }),
  }

  return { state, sound }
}
