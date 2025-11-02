import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useSlide } from '@/composables/useSlide.ts'

export type QuizOption = {
  id: string
  score: number
  nextSlide: number
} & {
  [key: string]: string | number
}

export const useProgressStore = defineStore('progress', () => {
  const router = useRouter()
  const { sound } = useSlide()

  const score = ref(0)

  const options = ref<QuizOption[]>([])
  const selectedOption = ref<QuizOption['id']>()

  const getSelected = computed(() => options.value.find((opt) => opt.id === selectedOption.value))

  const initializeOptions = (quizOptions: QuizOption[]) => {
    options.value = quizOptions
    selectedOption.value = undefined
  }

  const selectOption = (optionName: string) => {
    if (selectedOption.value === optionName) {
      selectedOption.value = undefined
      sound.unselect.play()
    } else {
      sound.select.play()
      selectedOption.value = optionName
    }
  }

  const confirmSelection = async () => {
    if (getSelected.value) {
      changeProgress(getSelected.value.score, getSelected.value.nextSlide)
    }
  }

  const changeProgress = (points: number, nextSlide: number | string) => {
    score.value += points
    sound.done.play()
    void router.push(`/${nextSlide}`)
  }

  const finishQuiz = () => {
    score.value = 0
    sound.done.play()
    void router.push('/')
  }

  return {
    score: computed(() => score.value),
    getSelected,
    initializeOptions,
    selectOption,
    confirmSelection,
    changeProgress,
    finishQuiz,
  }
})
