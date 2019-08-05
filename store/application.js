export const state = () => ({
  darkMode: false
})

export const getters = {
  darkMode: state => state.darkMode
}

export const mutations = {
  toggleDarkMode(state, value) {
    state.darkMode = value
  }
}

export const actions = {
  toggleDarkMode({ commit }, value) {
    commit('toggleDarkMode', value)
  }
}