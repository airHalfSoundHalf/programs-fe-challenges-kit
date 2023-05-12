class Empty {
    $empty = null
    data = null

    constructor({ $target }) {
        const $empty = document.createElement('div')
        this.$empty = $empty

        $empty.className = 'empty-container'
        $target.appendChild($empty)

        this.data = {
          show: false,
          isEmpty: false
        }

        this.render()
    }
    
    setState(nextData) {
      this.data = nextData
      this.render()
    }

    show(data) {
        this.setState({
          show: Object.keys(data ?? []).length === 0,
          isEmpty: data === undefined
        })
      }

    render() {
      if(this.data.show) {
          if(this.data.isEmpty) {
            this.$empty.innerHTML = `<p class='empty danger'>요청이 실패했습니다.</p>`
            this.$empty.style.display = 'block'
          } else {
            this.$empty.innerHTML = `<p class='empty'>검색결과가 없습니다.</p>`
            this.$empty.style.display = 'block'
          }
      } else {
        this.$empty.innerHTML = ''
          this.$empty.style.display = 'none'
      }
    }
}

export default Empty