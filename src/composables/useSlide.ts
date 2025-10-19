import { reactive } from 'vue'
import { useSound } from '@vueuse/sound'
import hover from '@/assets/sounds/hover.mp3'
import soundOn from '@/assets/sounds/click2.mp3'
import done from '@/assets/sounds/done.mp3'
import click from '@/assets/sounds/pick2.mp3'
import unclick from '@/assets/sounds/unclick.mp3'

export type AnimationState = {
  legend: boolean
  text: boolean
  btn: boolean
}

export const useSlide = <T extends AnimationState = AnimationState>() => {
  const state = reactive<T>({
    legend: false,
    text: false,
    btn: false,
  } as T)

  const sound = {
    hover: useSound(hover, { volume: 0.1 }),
    select: useSound(unclick, { volume: 0.1 }),
    unselect: useSound(soundOn, { volume: 0.075 }),
    confirm: useSound(click, { volume: 0.05 }),
    done: useSound(done, { volume: 0.05 }),
  }

  return { state, sound }
}
