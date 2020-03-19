import defaultState from '@/assets/defaultState'
const defaultNewOrder = JSON.stringify(defaultState.newOrder)

const host = 'http://127.0.0.1:3000/'
const getOp = {
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
  },
}
const postOp = {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
}

const FETCH_GET = async (route, commit, cmd) => {
  try {
    const _res = await fetch(host + route, getOp)
    if (_res.status === 200) {
      const _json = await _res.json()
      console.log(`FETCH_GET ${route} response json: `, _json)
      commit(cmd, _json)
    } else if (_res.status === 204) {
      console.log(_res.status)
    } else console.error(_res.status)
  } catch (e) {
    console.error(e)
  }
}

export const FETCH_NEW_ORDER = async ({ state, commit }) => {
  const _newOrder = { ...state.newOrder }
  _newOrder._id = _newOrder.shortTitle.toLowerCase().replace(/\s/g, '')
  if (state.filmOrdersList.some(fo => fo._id === _newOrder._id)) {
    commit('SET_STATE', { state: 'fetchOrderStatus', value: { message: _newOrder._id + ' Existed', severity: 'error' } })
  } else {
    _newOrder.shortTitle = _newOrder.shortTitle.toProperCase()
    _newOrder.foreignTitle = _newOrder.foreignTitle.toProperCase()
    _newOrder.vietnameseTitle = _newOrder.vietnameseTitle.toProperCase()
    _newOrder.createdAt = Date.now()
    _newOrder.premiereDate = _newOrder.premiereDate ? _newOrder.premiereDate.getTime() : null
    _newOrder.endAt = _newOrder.endAt ? _newOrder.endAt.getTime() : null
    _newOrder.status = 'Created'

    postOp.body = JSON.stringify(_newOrder)
    console.log('body', postOp.body)
    state.filmOrdersListLoading = true
    try {
      const _res = await fetch(host + 'film/orders/', postOp)
      if (_res.status === 200) {
        const _json = await _res.json()
        console.log(`FETCH_POST 'film/orders/' response json: `, _json)
        if (_json.id === _newOrder._id) {
          _newOrder._rev = _json.rev
          commit('PUSH', { state: 'filmOrdersList', data: _newOrder })
          commit('SORT', { state: 'filmOrdersList', key: 'shortTitle' })
          commit('SET_STATE', { state: 'newOrder', value: JSON.parse(defaultNewOrder) })
          commit('SET_STATE', { state: 'fetchOrderStatus', value: { message: 'Create New Order Successfully', severity: 'success' } })
          setTimeout(() => {
            commit('SET_STATE', { state: 'createNewOrder', value: false })
            commit('SET_STATE', { state: 'fetchOrderStatus', value: { message: '', severity: '' } })
          }, 1000)
        } else commit('SET_STATE', { state: 'fetchOrderStatus', value: { message: 'Response ID Error', severity: 'error' } })
      } else if (_res.status === 204) {
        console.log(_res.status)
      } else if (_res.status === 409) {
        console.log(_res.status)
        commit('SET_STATE', { state: 'fetchOrderStatus', value: { message: 'Film Title Existed', severity: 'error' } })
      } else console.error(_res.status)
    } catch (e) {
      console.error(e)
    }
    state.filmOrdersListLoading = false
  }
}

export const FETCH_GET_LIST = async ({ state, commit }, payload) => {
  state[payload.loading] = true
  await FETCH_GET(payload.route, commit, 'LIST')
  state[payload.loading] = false
}

export const FETCH_GET_DOC = async ({ state, commit }, payload) => {
  state[payload.loading] = true
  try {
    const _res = await fetch(host + payload.route, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (_res.status === 200) {
      const _json = await _res.json()
      console.log(_json)
      commit('PUSH', _json)
    } else console.err(_res.status)
  } catch (e) {
    console.error(e)
  }
  state[payload.loading] = false
}
