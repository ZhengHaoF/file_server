export class LogWebSocket {
  constructor(options = {}) {
    this.url = options.url || `ws://${window.location.host}/api/admin/logs/stream`
    this.token = options.token || localStorage.getItem('adminToken')
    this.onMessage = options.onMessage || (() => {})
    this.onError = options.onError || (() => {})
    this.onClose = options.onClose || (() => {})
    this.onOpen = options.onOpen || (() => {})
    
    this.ws = null
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
    this.reconnectDelay = 1000
    this.isConnecting = false
  }

  connect() {
    if (this.isConnecting || (this.ws && this.ws.readyState === WebSocket.OPEN)) {
      return
    }

    this.isConnecting = true
    const wsUrl = `${this.url}?token=${encodeURIComponent(this.token)}`

    try {
      this.ws = new WebSocket(wsUrl)

      this.ws.onopen = () => {
        this.isConnecting = false
        this.reconnectAttempts = 0
        this.onOpen()
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          this.onMessage(data)
        } catch (e) {
          console.error('Failed to parse WebSocket message:', e)
        }
      }

      this.ws.onerror = (error) => {
        this.isConnecting = false
        this.onError(error)
      }

      this.ws.onclose = (event) => {
        this.isConnecting = false
        this.onClose(event)

        // 自动重连
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++
          setTimeout(() => {
            this.connect()
          }, this.reconnectDelay * this.reconnectAttempts)
        }
      }
    } catch (e) {
      this.isConnecting = false
      this.onError(e)
    }
  }

  disconnect() {
    if (this.ws) {
      this.reconnectAttempts = this.maxReconnectAttempts // 阻止自动重连
      this.ws.close()
      this.ws = null
    }
  }

  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    }
  }

  filter(level) {
    this.send({ action: 'filter', level })
  }

  isConnected() {
    return this.ws && this.ws.readyState === WebSocket.OPEN
  }
}
