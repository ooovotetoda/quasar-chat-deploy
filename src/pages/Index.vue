<template>
  <q-page>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PageIndex',
  async mounted (): Promise<void> {
    try {
      const name = sessionStorage.getItem('name')
      if (!name) {
        await this.$router.push('/welcome')
      }
    } catch (error) {
      console.error('Navigation error:', error)
    }
  }
})
</script>
