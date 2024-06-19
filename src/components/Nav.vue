<template>
  <div class="nav">
    <ul>
      <li v-for="room in rooms" :key="room">
        <router-link :to="`/chat/${room}`">
          <div class="nav-item" :class="{ 'nav-item_active': isActiveRoom(room) }">
            <h5>Chat room {{ room }}</h5>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
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
      currentRoom: '1',
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
ul {
  list-style-type: none;
}

.nav {
  width: 300px;
  border-radius: 4px;

  .nav-item {
    padding: 16px;
    border-radius: 4px;
    transition: all 0.1s ease-in-out;

    &:hover {
      background-color: rgba(0,0,0, 0.2);
      color: #FFFFFF;
    }
  }

  .nav-item_active {
    background-color: #000000;
    color: #FFFFFF;
  }

  .nav-item_active:hover {
    background-color: #000000;
  }
}
</style>
