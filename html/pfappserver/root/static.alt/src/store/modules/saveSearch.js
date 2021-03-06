/**
* "saveSearch" store module
*/
import Vue from 'vue'
import store from '@/store' // required for 'preferences'
import i18n from '@/utils/locale'

const IDENTIFIER_PREFIX = 'saveSearch::' // transparently prefix all identifiers - avoid key collisions

const types = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
}

// Default values
const initialState = () => {
  return {
    cache: {}, // all searches, organized by `namespace`
    message: '',
    requestStatus: ''
  }
}

const getters = {
  cache: state => state.cache,
  isLoading: state => state.requestStatus === types.LOADING
}

const actions = {
  sync: ({ state, commit }, namespace) => {
    commit('SAVED_SEARCH_REQUEST')
    return store.dispatch('preferences/get', `${IDENTIFIER_PREFIX}${namespace}`).then(response => { // exists
      const { data } = JSON.parse(response.value)
      commit('SAVED_SEARCH_REPLACED', { namespace, data })
      commit('SAVED_SEARCH_SUCCESS')
      return state.cache[namespace]
    }).catch(() => { // not exists
      commit('SAVED_SEARCH_REPLACED', { namespace, data: [] })
      commit('SAVED_SEARCH_SUCCESS')
      return state.cache[namespace]
    })
  },
  get: ({ state, commit, dispatch }, namespace) => {
    commit('SAVED_SEARCH_REQUEST')
    if (namespace in state.cache) { // get by `namespace`
      commit('SAVED_SEARCH_SUCCESS')
      return Promise.resolve(state.cache[namespace])
    }
    return dispatch('sync', namespace).then(response => {
      return state.cache[namespace] // get all `namespace`s
    })
  },
  set: ({ state, commit, dispatch }, data) => {
    const { namespace = 'default', search: { name = null, route = null } = {} } = data
    if (!name) throw new Error(i18n.t('Saved search `name` required.'))
    return dispatch('sync', namespace).then(response => {
      let exists = state.cache[namespace].filter(search => JSON.stringify(search.route) === JSON.stringify(route))
      if (exists.length > 0) { // exists, prevent duplicates
        store.dispatch('notification/info', { message: i18n.t('Search already exists as <code>{name}</code>.', { name: exists[0].name }) })
        return state.cache[namespace]
      }
      let stateCacheCopy = [ ...state.cache[namespace].filter(search => search.name !== name) ]
      stateCacheCopy.push({ name, route, meta: { created_at: (new Date()).getTime(), version: store.getters['system/version'] } })
      return store.dispatch('preferences/set', { id: `${IDENTIFIER_PREFIX}${namespace}`, data: stateCacheCopy }).then(response => {
        commit('SAVED_SEARCH_REPLACED', { namespace, data: stateCacheCopy })
        store.dispatch('notification/info', { message: i18n.t('Search <code>{name}</code> saved.', { name }) })
        return state.cache[namespace]
      })
    })
  },
  remove: ({ state, commit, dispatch }, data) => {
    const { namespace = 'default', search: { name = null } = {} } = data
    if (!name) throw new Error(i18n.t('Saved search `name` required.'))
    return dispatch('sync', namespace).then(response => {
      let stateCacheCopy = [ ...state.cache[namespace].filter(search => search.name !== name) ]
      return store.dispatch('preferences/set', { id: `${IDENTIFIER_PREFIX}${namespace}`, data: stateCacheCopy }).then(response => {
        commit('SAVED_SEARCH_REPLACED', { namespace, data: stateCacheCopy })
        store.dispatch('notification/info', { message: i18n.t('Saved search <code>{name}</code> removed.', { name }) })
        if (state.cache[namespace].length === 0) { // truncate preference
          return store.dispatch('preferences/remove', `${IDENTIFIER_PREFIX}${namespace}`).then(response => {
            commit('SAVED_SEARCH_TRUNCATED', namespace)
            commit('SAVED_SEARCH_SUCCESS')
            return null
          })
        }
        return state.cache[namespace]
      })
    })
  },
  truncate: ({ state, commit, dispatch }, namespace) => {
    if (namespace in state.cache) { // get by `namespace`
      commit('SAVED_SEARCH_REQUEST')
      return store.dispatch('preferences/remove', `${IDENTIFIER_PREFIX}${namespace}`).then(response => {
        commit('SAVED_SEARCH_TRUNCATED', namespace)
        commit('SAVED_SEARCH_SUCCESS')
        store.dispatch('notification/info', { message: i18n.t('Saved searches for <code>{namespace}</code> truncated.', { namespace }) })
        return null
      })
    }
    return undefined
  }
}

const mutations = {
  SAVED_SEARCH_REQUEST: (state, namespace) => {
    state.requestStatus = types.LOADING
    state.message = ''
  },
  SAVED_SEARCH_REPLACED: (state, _data) => {
    const { namespace, data } = _data
    Vue.set(state.cache, namespace, data)
  },
  SAVED_SEARCH_TRUNCATED: (state, namespace) => {
    Vue.delete(state.cache, namespace)
  },
  SAVED_SEARCH_SUCCESS: (state) => {
    state.requestStatus = types.SUCCESS
    state.message = ''
  },
  $RESET: (state) => {
    state = initialState()
  }
}

export default {
  namespaced: true,
  state: initialState(),
  getters,
  actions,
  mutations
}
