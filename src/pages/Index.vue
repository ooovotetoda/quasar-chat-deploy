<template>
  <q-page-container>
    <q-page>
      <div class="container">
        <ChatComponent :messages="messages"/>
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
    </q-page>
  </q-page-container>
</template>

<script lang="ts">
import Vue, { defineComponent } from 'vue'
import ChatComponent from 'components/Chat.vue'
import { Message } from 'components/models'

interface PageIndexData {
  name: string | null,
  msg: string,
  messages: Message[],
  ws: WebSocket | null
}

export default defineComponent({
  name: 'PageIndex',
  components: {
    ChatComponent: ChatComponent as unknown as Vue.ComponentOptions<Vue>
  },
  mounted (): void {
    const name = sessionStorage.getItem('name')
    if (!name) {
      this.$router.push('/welcome').catch((error) => {
        console.error('Navigation error:', error)
      })
    }

    const ws = new WebSocket('wss://ooovotetoda-golang-chat-deploy-816c.twc1.net/ws')

    ws.onopen = () => {
      console.log('[open] Соединение установлено')
    }

    ws.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data as string) as Message
      this.messages.push(message)
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
    }

    this.ws = ws
  },
  data (): PageIndexData {
    const name: string | null = sessionStorage.getItem('name')
    return {
      name,
      msg: '',
      messages: [],
      ws: null
    }
  },
  methods: {
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
  }
})
</script>

<style scoped>
.actions {
  gap: 8px;

  .actions-input {
    flex: 1;
  }
}
</style>
