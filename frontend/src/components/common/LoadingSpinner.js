class LoadingSpinner {
    $loading = null
    state = { show: false }

    constructor({ $target }) {
        const $loading = document.createElement('div')
        this.$loading = $loading

        $loading.className = 'loading-container'
        $target.appendChild($loading)

        this.render()
    }

    setState(nextData) {
      this.state = nextData
      this.render()
    }

    show() {
      this.setState({
        show: true,
      })
    }

    hide() {
      this.setState({
        show: false,
      })
    }

  render() {
    if(this.state.show) {
        this.$loading.innerHTML = `<div class='loading'><span class='loading-icon'></span></div>`
        this.$loading.style.display = 'block'
    } else {
        this.$loading.style.display = 'none'
    }
  }
}

export default LoadingSpinner