import { sleep } from '@/utils/utils.ts'
import { useSlide } from '@/composables/useSlide.ts'

export const useSlideSteps = (state: Record<string, boolean>) => {
  const { sound } = useSlide()
  const keys = Object.keys(state)
  let currentIndex = -1

  async function nextStep() {
    if (currentIndex >= 0 && currentIndex < keys.length) {
      state[keys[currentIndex] as string] = false
    }

    sound.confirm.play()
    await sleep(1000)
    currentIndex++

    if (currentIndex < keys.length) {
      state[keys[currentIndex] as string] = true
    }
  }

  return {
    nextStep,
  }
}
