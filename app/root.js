const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect
const Eth = require('ethjs');

const MetaMaskLink = require('./components/download-metamask')

module.exports = connect(mapStateToProps)(AppRoot)

function mapStateToProps (state) {
  return state
}

inherits(AppRoot, Component)
function AppRoot () {
  Component.call(this)
}

AppRoot.prototype.render = function () {
  const props = this.props
  const { eth, loading, nonce, error, web3Found } = props
  console.dir(props)

  return (
    h('.pay',  [
      !web3Found ?

        h('#nomask', [
          h('You should get MetaMask for the full experience!'),

          h(MetaMaskLink, { style: { width: '250px' } }),
        ])
        : loading ? h('span', 'Loading...') : h('button.button-primary', {
          style: {
            color: 'white',
            margin: '10px 0 0 0',
          },
          onClick: () => this.sendTip(),
        }, 'Submit'),

      h('br'),
      nonce > 0 ? h('span #thanks', ``) : null,
      h('br'),
      error ? h('span', { style: { color: '#fff' } }, error) : null,

    ])
  )
}

AppRoot.prototype.sendTip = function() {
  const { eth } = this.props

  let qty = document.querySelector('#amount').value;
  let name = document.querySelector('#name').value;
  let site = document.querySelector('#site').value;
  let namesite = name + '|' + site;
  let hexed = a2hex(namesite);

  this.props.dispatch({ type: 'SHOW_LOADING' })
  $("#oops").hide();
  eth.sendTransaction({
    from: web3.eth.accounts[0],
    value: Eth.toWei(qty, 'ether'),
    to: address,
    data: hexed,
  })

  .then((result) => {
    this.props.dispatch({ type: 'HIDE_LOADING' })
    $("#formArea").hide();
    $(".button-primary").hide();

    var shortHash = result.substring(0, 20);

    $("#oops").show().empty().append("<br>Transaction sent! " + shortHash + "... <a href='https://etherscan.io/tx/" + result + "' target='_blank'> verify</a>");
    this.props.dispatch({
      type: 'INCREMENT_NONCE',
    })
  })
  .catch(() => {
    this.props.dispatch({ type: 'HIDE_LOADING' })
    $("#oops").show();


  })

}
