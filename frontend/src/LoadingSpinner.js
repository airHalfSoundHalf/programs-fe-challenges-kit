class LoadingSpinner {
    $loading = null;
    state = { show: false }

    constructor({ $target }) {
        const $loading = document.createElement('div')
        this.$loading = $loading
        
        $target.appendChild($loading)

        this.render()
    }

    show() {
        this.setState({
          show: true,
        });
      }
    
      hide() {
        this.setState({
          show: false,
        });
      }

    setState(nextData) {
        this.state = nextData
        this.render()
    }

  render() {
    if(this.state.show) {
        this.$loading.innerHTML = `<div class='loading'><div class='loading-icon'></div></div>`;
        this.$loading.style.display = 'block';
    } else {
        this.$loading.style.display = 'none';
    }
  }
}