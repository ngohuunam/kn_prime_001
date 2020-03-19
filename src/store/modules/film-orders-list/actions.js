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

export const newOrder = async ({ state, commit }) => {
  const _newOrder = { ...state.newOrder }
  _newOrder._id = _newOrder.shortTitle.toLowerCase().replace(/\s/g, '')
  console.log('_newOrder', _newOrder)
  if (state.list.some(fo => fo._id === _newOrder._id)) {
    commit('setMess', { text: _newOrder._id + ' Existed', severity: 'error' })
  } else {
    state.loading = true
    _newOrder.shortTitle = _newOrder.shortTitle.toProperCase()
    _newOrder.foreignTitle = _newOrder.foreignTitle.toProperCase()
    _newOrder.vietnameseTitle = _newOrder.vietnameseTitle.toProperCase()
    _newOrder.createdAt = Date.now()
    _newOrder.premiereDate = _newOrder.premiereDate ? _newOrder.premiereDate.getTime() : null
    _newOrder.endAt = _newOrder.endAt ? _newOrder.endAt.getTime() : null
    _newOrder.status = 'Created'

    postOp.body = JSON.stringify(_newOrder)
    console.log('body', postOp.body)
    try {
      const _res = await fetch(host + 'film/orders/', postOp)
      if (_res.status === 200) {
        const _json = await _res.json()
        console.log(`FETCH_POST 'film/orders/' response json: `, _json)
        if (_json.id === _newOrder._id) {
          _newOrder._rev = _json.rev
          commit('push', { state: 'list', data: _newOrder })
          commit('sort', { state: 'list', key: 'shortTitle' })
          commit('setStates', { states: ['newOrder', 'message'], values: [JSON.parse(defaultNewOrder), { text: 'Create New Order Successfully', severity: 'success' }] })
          setTimeout(() => {
            commit('setStates', { states: ['createNewOrder', 'message'], values: [false, { text: '', severity: '' }] })
          }, 1000)
        } else commit('setMess', { text: 'Response ID Error', severity: 'error' })
      } else if (_res.status === 409) {
        commit('setMess', { message: 'Film Title Existed', severity: 'error' })
      } else console.error(_res.status)
    } catch (e) {
      console.error(e)
    }
    state.loading = false
  }
}

export const getList = async ({ state, commit }) => {
  state.loading = true
  const _route = host + 'film/orders/list/' + state.seq || '1'
  try {
    const _res = await fetch(_route, getOp)
    if (_res.status === 200) {
      const _json = await _res.json()
      console.log(`FETCH_GET film/orders/list/ response json: `, _json)
      commit('setStates', { states: ['list', 'seq'], values: [_json.list, _json.seq] })
    } else if (_res.status === 204) {
      console.log(_res.status)
    } else console.error(_res.status)
  } catch (e) {
    console.error(e)
  }
  state.loading = false
}
