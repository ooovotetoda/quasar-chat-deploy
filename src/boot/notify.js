import { Notify } from 'quasar'

export default ({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$notify = Notify
}
