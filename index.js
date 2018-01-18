const render = require('react-dom').render
const h = require('react-hyperscript')
const configureStore = require('./lib/store')
const Root = require('./app/root.js')
const Eth = require('ethjs');
let eth;


var body = document.querySelector('body')
const container = document.createElement('div')
body.appendChild(container)

let web3Found = false
window.addEventListener('load', function() {

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {

    // Use Mist/MetaMask's provider
    web3Found = true
    eth = new Eth(web3.currentProvider)
  } else {

    // Fall back to Infura:
    web3Found = false
    eth = new Eth(new Eth.HttpProvider('https://mainnet.infura.io'))
  }

  window.eth = eth
  store.dispatch({ type: 'ETH_LOADED', value: eth })
  store.dispatch({ type: 'WEB3_FOUND', value: web3Found })

  // Now you can start your app & access web3 freely:
  startApp()
})

const store = configureStore({
  nonce: 0,
  web3Found: false,
  web3,
  loading: true,
})

function startApp(){
  render(
    h(Root, {
      store,
      className: 'root-el',
    }),
  container)
}

