<template>
  <q-page-container>
    <q-page>
      <div class="container">
        <ChatComponent :messages="messages"/>
        <q-form @submit.prevent="handleSubmit">
          <div class="actions flex align-center justify-between">
            <q-input
              class="actions-input"
              v-model="msg"
              standout
              style="font-size: 18px"
            />
            <q-btn
              class="col-2"
              color="black"
              size="18px"
              label="Enter"
              type="submit"
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
  messages: Message[]
}

const messages: Message[] = [
  { author: 'Dima', text: 'Hi!' },
  { author: 'Dima', text: 'loremipsumasdmf aslkdmfok;maslkdmflkasdmlkfmasl;kdfmkl;asmdkl;fmaslkdmflk;asmdlkfmlk;asdmlk;fmalksdmfkl;amsdklmfklasdmklfalksdmkflaskldmfklmasdklfmklasdklfasldkfmklasdkfmaskldmflkmlksa !' },
  { author: 'Dima', text: 'loremipsumasdmf aslkdmfok;maslkdmflkasdmlkfmasl;kdfmkl;asmdkl;fmaslkdmflk;asmdlkfmlk;asdmlk;fmalksdmfkl;amsdklmfklasdmklfalksdmkflaskldmfklmasdklfmklasdklfasldkfmklasdkfmaskldmflkmlksa !' },
  { author: 'Dima', text: 'loremipsumasdmf aslkdmfok;maslkdmflkasdmlkfmasl;kdfmkl;asmdkl;fmaslkdmflk;asmdlkfmlk;asdmlk;fmalksdmfkl;amsdklmfklasdmklfalksdmkflaskldmfklmasdklfmklasdklfasldkfmklasdkfmaskldmflkmlksa !' },
  { author: 'Dima', text: 'loremipsumasdmf aslkdmfok;maslkdmflkasdmlkfmasl;kdfmkl;asmdkl;fmaslkdmflk;asmdlkfmlk;asdmlk;fmalksdmfkl;amsdklmfklasdmklfalksdmkflaskldmfklmasdklfmklasdklfasldkfmklasdkfmaskldmflkmlksa !' },
  { author: 'Dima', text: 'loremipsumasdmf aslkdmfok;maslkdmflkasdmlkfmasl;kdfmkl;asmdkl;fmaslkdmflk;asmdlkfmlk;asdmlk;fmalksdmfkl;amsdklmfklasdmklfalksdmkflaskldmfklmasdklfmklasdklfasldkfmklasdkfmaskldmflkmlksa !' },
  { author: 'Dima', text: 'loremipsumasdmf aslkdmfok;maslkdmflkasdmlkfmasl;kdfmkl;asmdkl;fmaslkdmflk;asmdlkfmlk;asdmlk;fmalksdmfkl;amsdklmfklasdmklfalksdmkflaskldmfklmasdklfmklasdklfasldkfmklasdkfmaskldmflkmlksa !' },
  { author: 'Dima', text: 'loremipsumasdmf aslkdmfok;maslkdmflkasdmlkfmasl;kdfmkl;asmdkl;fmaslkdmflk;asmdlkfmlk;asdmlk;fmalksdmfkl;amsdklmfklasdmklfalksdmkflaskldmfklmasdklfmklasdklfasldkfmklasdkfmaskldmflkmlksa !' },
  { author: 'Dima', text: 'loremipsumasdmf aslkdmfok;maslkdmflkasdmlkfmasl;kdfmkl;asmdkl;fmaslkdmflk;asmdlkfmlk;asdmlk;fmalksdmfkl;amsdklmfklasdmklfalksdmkflaskldmfklmasdklfmklasdklfasldkfmklasdkfmaskldmflkmlksa !' },
  { author: 'Dima', text: 'loremipsumasdmf aslkdmfok;maslkdmflkasdmlkfmasl;kdfmkl;asmdkl;fmaslkdmflk;asmdlkfmlk;asdmlk;fmalksdmfkl;amsdklmfklasdmklfalksdmkflaskldmfklmasdklfmklasdklfasldkfmklasdkfmaskldmflkmlksa !' },
  { author: 'Dima', text: 'loremipsumasdmf aslkdmfok;maslkdmflkasdmlkfmasl;kdfmkl;asmdkl;fmaslkdmflk;asmdlkfmlk;asdmlk;fmalksdmfkl;amsdklmfklasdmklfalksdmkflaskldmfklmasdklfmklasdklfasldkfmklasdkfmaskldmflkmlksa !' }
]

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
  },
  data (): PageIndexData {
    const name: string | null = sessionStorage.getItem('name')
    return {
      name,
      msg: '',
      messages
    }
  },
  methods: {
    handleSubmit (): void {
      console.log('submit')
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
