import createPersistedState from 'vuex-persistedstate'
// https://github.com/robinvdvleuten/vuex-persistedstate
export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
        key: 'store',
    })(store)
  })
}