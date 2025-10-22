import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useSlide } from '@/composables/useSlide.ts'

export interface QuizOption {
  id: string
  score: number
  nextSlide: number
  img?: string
}

export const useProgressStore = defineStore('progress', () => {
  const router = useRouter()
  const { sound } = useSlide()

  const score = ref(50)

  const options = ref<QuizOption[]>([])
  const selectedOption = ref<QuizOption['id']>()

  const getSelected = computed(() => {
    return options.value.find((opt) => opt.id === selectedOption.value)
  })

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
    const selected = options.value.find((opt: QuizOption) => opt.id === selectedOption.value)
    if (selected) {
      changeProgress(selected.score, selected.nextSlide)
    }
  }

  const changeProgress = (points: number, nextSlide: number | string) => {
    score.value += points
    sound.done.play()
    void router.push(`/${nextSlide}`)
  }

  const finishQuiz = () => {
    score.value = 50
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
