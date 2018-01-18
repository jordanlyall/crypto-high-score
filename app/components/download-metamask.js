const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits
const extend = require('xtend')

module.exports = MetaMaskLink

inherits(MetaMaskLink, Component)
function MetaMaskLink () {
  Component.call(this)
}

MetaMaskLink.prototype.render = function () {
  const { style } = this.props

  return h('a', {
    href: 'https://metamask.io',
  }, [
    h('img', {
      src: 'http://www.microtick.com/images/download-metamask.png',
      style: extend(style, {
        width: '300px',
        maxWidth: '90%',
      }),
    }),
  ])
}
