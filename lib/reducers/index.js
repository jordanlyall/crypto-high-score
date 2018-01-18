const extend = require('xtend')

module.exports = function(state, action) {

  switch (action.type) {

    case 'SHOW_ERROR':
      return extend(state, {
        error: action.value,
      })

    case 'SHOW_LOADING':
      return extend(state, {
        loading: true,
      })

    case 'HIDE_LOADING':
      return extend(state, {
        loading: false,
      })

    case 'ETH_LOADED':
      return extend(state, {
        eth: action.value,
        loading: false,
      })

    case 'WEB3_FOUND':
      return extend(state, {
        web3Found: action.value,
      })

    case 'INCREMENT_NONCE':
      return extend(state, {
        nonce: state.nonce + 1,
      })
      break
  }


  return extend(state)
}
