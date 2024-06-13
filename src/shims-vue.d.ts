// Mocks all files ending in `.vue` showing them as plain Vue instances
import Vue from 'vue'

declare module '*.vue' {
  export default Vue
}

// Adds typing for Quasar Notify
import { Notify } from 'quasar'

declare module 'vue/types/vue' {
  interface Vue {
    $notify: typeof Notify;
  }
}
