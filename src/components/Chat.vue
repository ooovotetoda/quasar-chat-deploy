<template>
  <div class="chat">
    <ul class="chat-list">
      <!--  TODO: unique keys   -->
      <li v-for="message in messages" :key="message.text">
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
    }
  },
  data (): { clickCount: number } {
    return {
      clickCount: 0
    }
  },
  methods: {
    increment (): void {
      this.clickCount += 1
    }
  },
  computed: {
    messagesCount (): number {
      return this.messages.length
    }
  }
})

</script>

<style scoped>
.chat {
  height: calc(100vh - 56px - 8px - 32px);
  padding: 12px;
  margin: 16px 0 8px 0;
  border-radius: 4px;
  font-size: 18px;
  overflow: scroll;

  .chat-list {
    list-style: none;
  }
}
</style>
