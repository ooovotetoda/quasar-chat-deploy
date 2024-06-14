<template>
  <div class="message flex align-start no-wrap">
    <div class="message-image">
      <q-avatar color="black" text-color="white" icon="person"/>
    </div>
    <div class="message-text">
      <div class="message-text__author">{{ message.author }}</div>
      <div class="message-text__text">{{ message.text }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Message } from './models'

export default defineComponent({
  name: 'MessageComponent',
  props: {
    message: {
      type: (Object as unknown) as PropType<Message>,
      required: true
    }
  }
})

</script>

<style scoped>
.message {
  gap: 8px;
  margin-bottom: 16px;

  .message-text {
    .message-text__author {
      font-weight: bold;
    }
    .message-text__text {
      word-break: break-all;
    }
  }
}
</style>
