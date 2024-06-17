<template>
  <q-page-container>
    <q-page class="column items-center justify-center full-height">
      <h1 class="title q-mb-xl">{{ title }}</h1>
      <q-form @submit.prevent="handleLogin" class="flex column justify-center">
        <q-input
          v-model="name"
          placeholder="Name"
          size="24px"
          standout
          class="q-mb-lg"
          style="font-size: 18px"
        />
        <q-btn
          color="black"
          size="18px"
          label="Enter"
          type="submit"
        />
      </q-form>
    </q-page>
  </q-page-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface PageWelcomeData {
  title: string;
  name: string;
}

export default defineComponent({
  name: 'PageWelcome',
  data (): PageWelcomeData {
    return {
      title: '',
      name: ''
    }
  },
  methods: {
    async handleLogin () {
      if (this.name === '') {
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          message: 'Please enter your name',
          icon: 'warning',
          position: 'top',
          timeout: 5000
        })
        return
      }

      sessionStorage.setItem('name', this.name)
      await this.$router.push('/')
    }
  },
  mounted () {
    const titleText = 'Welcome to the chat!'
    let index = 0
    const printNextChar = () => {
      if (index < titleText.length) {
        this.title += titleText[index]
        index++
        setTimeout(printNextChar, 150)
      }
    }

    printNextChar()
  }
})
</script>

<style scoped>
@keyframes blink {
  50% {
    opacity: 0;
  }
}

.title {
  &::after {
    content: '|';
    margin-left: 4px;
    animation: blink 1s step-end infinite;
  }
}
</style>
