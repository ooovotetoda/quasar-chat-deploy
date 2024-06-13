// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

// Adds typing for Quasar Notify
import Vue from 'vue'
import { Notify } from 'quasar'

declare module 'vue/types/vue' {
  interface Vue {
    $notify: typeof Notify;
  }
}
