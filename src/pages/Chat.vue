<template>
  <q-page-container>
    <q-page>
      <div class="container">
        <div class="wrapper">
          <NavComponent />
          <div class="full-width">
            <ChatComponent :messages="messages" :is-loading-messages="isLoadingMessages"/>
            <q-form @submit.prevent="handleSubmit">
              <div class="actions flex align-center justify-between">
                <q-input
                  ref="messageInput"
                  class="actions-input"
                  v-model="msg"
                  standout
                  style="font-size: 18px"
                />
                <q-btn
                  class="col-2"
                  color="black"
                  size="18px"
                  label="Send"
                  type="submit"
                  :disable="isDisabled"
                />
              </div>
            </q-form>
          </div>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script lang="ts">
import Vue, { defineComponent } from 'vue'
import ChatComponent from 'components/Chat.vue'
import NavComponent from 'components/Nav.vue'
import { Message } from 'components/models'

interface PageChatData {
  name: string | null,
  msg: string,
  messages: Message[],
  isLoadingMessages: boolean,
  ws: WebSocket | null,
  room: string
}

export default defineComponent({
  name: 'PageChat',
  components: {
    NavComponent: NavComponent as unknown as Vue.ComponentOptions<Vue>,
    ChatComponent: ChatComponent as unknown as Vue.ComponentOptions<Vue>
  },
  mounted (): void {
    const name = sessionStorage.getItem('name')
    if (!name) {
      this.$router.push('/').catch((error) => {
        console.error('Navigation error:', error)
      })
    }

    this.room = this.$route.params?.room || '1'
    this.initWebSocket()
  },
  data (): PageChatData {
    const name: string | null = sessionStorage.getItem('name')
    return {
      name,
      msg: '',
      messages: [],
      isLoadingMessages: true,
      ws: null,
      room: '1'
    }
  },
  methods: {
    initWebSocket (): void {
      if (this.ws) {
        this.ws.close()
      }

      this.isLoadingMessages = true
      const ws = new WebSocket(`wss://ooovotetoda-golang-chat-deploy-816c.twc1.net/ws?room=${this.room}`)

      ws.onopen = () => {
        console.log('[open] Соединение установлено')
        this.isLoadingMessages = false
      }

      ws.onmessage = (event: MessageEvent) => {
        const data: Message | Message[] = JSON.parse(event.data as string) as Message | Message[]
        if (Array.isArray(data)) {
          data.forEach(message => {
            if (message.room === this.room) this.messages.push(message)
          })
        } else {
          const message: Message = data
          if (message.room === this.room) this.messages.push(message)
        }
        this.isLoadingMessages = false
      }

      ws.onclose = (event: CloseEvent) => {
        if (event.wasClean) {
          console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`)
        } else {
          console.log('[close] Соединение прервано')
        }
      }

      ws.onerror = (event: Event) => {
        const errorMessage = (event as ErrorEvent).message || 'Unknown error'
        console.log(`[error] ${errorMessage}`)
        this.isLoadingMessages = false
      }

      this.ws = ws
    },
    handleSubmit (): void {
      if (this.ws) {
        this.ws.send(JSON.stringify({ author: this.name, text: this.msg }))
        this.msg = ''
        this.$nextTick(() => {
          (this.$refs.messageInput as HTMLInputElement).focus()
        })
      }
    }
  },
  computed: {
    isDisabled (): boolean {
      return this.msg.length <= 0
    }
  },
  watch: {
    '$route.params.room': function (newRoom: string): void {
      this.room = newRoom
      this.messages = []
      this.initWebSocket()
    }
  }
})
</script>

<style scoped>
.container {
  padding-top: 16px;
}

.wrapper {
  display: flex;
  gap: 16px;
}

.actions {
  gap: 8px;

  .actions-input {
    flex: 1;
  }
}
</style>
