import { reactive } from 'vue'

/**
 * Promise-based confirmation dialog service (replaces window.confirm).
 * Rendered once by <ConfirmHost/> in App.vue.
 */
export const confirmState = reactive({
  open: false,
  title: '',
  message: '',
  details: null, // optional array of { label, before, after, note }
  confirmText: '确认',
  cancelText: '取消',
  tone: 'default', // 'default' | 'danger'
  requireText: '', // if set, user must type this text to enable confirm
  resolve: null
})

export function confirm(options) {
  if (confirmState.open && confirmState.resolve) confirmState.resolve(false)
  return new Promise((resolve) => {
    Object.assign(confirmState, {
      title: '请确认', message: '', details: null, confirmText: '确认', cancelText: '取消',
      tone: 'default', requireText: '', ...options, open: true, resolve
    })
  })
}

export function settleConfirm(result) {
  const resolve = confirmState.resolve
  confirmState.open = false
  confirmState.resolve = null
  resolve?.(result)
}
