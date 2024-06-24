<template>
  <nav class="nav">
    <ul class="nav-list">
      <li v-for="room in rooms" :key="room">
        <router-link :to="`/chat/${room}`">
          <div class="nav-item" :class="{ 'nav-item_active': isActiveRoom(room) }">
            <h5><span class="nav-item__text">Chat room</span> {{ room }}</h5>
          </div>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface NavComponentData {
  currentRoom: string,
  rooms: string[]
}

export default defineComponent({
  name: 'NavComponent',
  data (): NavComponentData {
    return {
      currentRoom: this.$route.params?.room || '1',
      rooms: ['1', '2', '3', '4', '5']
    }
  },
  computed: {
    isActiveRoom (): (room: string) => boolean {
      return (room: string): boolean => {
        return this.currentRoom === room
      }
    }
  },
  watch: {
    '$route.params.room': function (newRoom: string): void {
      this.currentRoom = newRoom
    }
  }
})
</script>

<style scoped>
.nav {
  width: 300px;
  border-radius: 4px;

  .nav-item {
    padding: 16px;
    margin-bottom: 4px;
    border-radius: 4px;
    transition: all 0.1s ease-in-out;

    &:hover {
      background-color: rgba(0,0,0, 0.2);
      color: #FFFFFF;
    }
  }

  .nav-item_active {
    background-color: #000000 !important;
    color: #FFFFFF;

    &:hover {
      background-color: #000000;
    }
  }
}

@media (max-width: 640px) {
  .nav {
    display: flex;
    justify-content: center;
    width: 100%;

    .nav-list {
      display: flex;
      align-items: center;

      .nav-item {
        width: 64px;
        text-align: center;

        .nav-item__text {
          display: none;
        }
      }
    }
  }
}
</style>
