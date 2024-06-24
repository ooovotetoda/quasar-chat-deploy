<template>
  <div class="chat" ref="chat">
    <q-circular-progress
      v-if="isLoadingMessages"
      class="chat-loader"
      indeterminate
      rounded
      size="xl"
      :thickness="0.3"
      color="black"
    />
    <p
      v-else-if="chatIsEmpty"
      class="chat-empty"
    >Chat is empty. Send the first message!</p>
    <ul class="chat-list">
      <li v-for="message in messages" :key="message.id">
        <MessageComponent :message="message"/>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue, { PropType, defineComponent } from 'vue'
import { Message } from './models'
import MessageComponent from 'components/Message.vue'

export default defineComponent({
  name: 'ChatComponent',
  components: {
    MessageComponent: MessageComponent as unknown as Vue.ComponentOptions<Vue>
  },
  props: {
    messages: {
      type: (Array as unknown) as PropType<Message[]>,
      default: () => [] as Message[]
    },
    isLoadingMessages: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    scrollToBottom (): void {
      const chat = this.$refs.chat as HTMLElement
      if (chat) {
        chat.scrollTop = chat.scrollHeight
      }
    }
  },
  computed: {
    chatIsEmpty (): boolean {
      return this.messages.length === 0
    }
  },
  updated () {
    this.scrollToBottom()
  }
})
</script>

<style scoped>
.chat {
  position: relative;
  height: calc(100vh - 56px - 8px - 32px);
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 4px;
  font-size: 18px;
  overflow-y: auto;

  .chat-loader {
    position: absolute;
    top: 100px;
    left: 50%;
  }

  .chat-empty {
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.5;
  }

  .chat-list {
    list-style: none;
  }
}

@media (max-width: 640px) {
  .chat {
    height: calc(100vh - 64px - 56px -  48px - 8px);
  }
}
</style>
