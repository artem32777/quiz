import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import slide1 from '@/slides/1/slide1.vue'
import slide2 from '@/slides/2/slide2.vue'
import slide3 from '@/slides/3/slide3.vue'
import slide4 from '@/slides/4/slide4.vue'
import slide5 from '@/slides/5/slide5.vue'
import slide6 from '@/slides/6/slide6.vue'
import slide7 from '@/slides/7/slide7.vue'
import slid7Game from '@/slides/7/slide7-game.vue'
import slide8 from '@/slides/8/slide8.vue'
import slide9 from '@/slides/9/slide9.vue'
import slide10 from '@/slides/10/slide10.vue'
import slide11 from '@/slides/11/slide11.vue'
import slide12 from '@/slides/12/slide12.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: '1', component: slide1 },
    { path: '/2', name: '2', component: slide2 },
    { path: '/3', name: '3', component: slide3 },
    { path: '/4', name: '4', component: slide4 },
    { path: '/5', name: '5', component: slide5 },
    { path: '/6', name: '6', component: slide6 },
    { path: '/7', name: '7', component: slide7 },
    { path: '/8', name: '8', component: slide8 },
    { path: '/9', name: '9', component: slide9 },
    { path: '/10', name: '10', component: slide10 },
    { path: '/11', name: '11', component: slide11 },
    { path: '/12', name: '12', component: slide12 },
  ],
})

export default router
