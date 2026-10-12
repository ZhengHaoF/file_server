import { ref } from 'vue'

// One shared ticking clock (1s) so relative timestamps stay honest without per-component timers.
const now = ref(Date.now())
let timer = null
let users = 0

export function useClock() {
  users++
  if (!timer && typeof window !== 'undefined') timer = setInterval(() => { now.value = Date.now() }, 1000)
  return { now, release() { users = Math.max(0, users - 1); if (!users && timer) { clearInterval(timer); timer = null } } }
}
