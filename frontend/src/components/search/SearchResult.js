import Empty from '../common/Empty.js'

class SearchResult {
  $searchResult = null
  data = null
  onClick = null

  constructor({ $target, initialData, onClick, onNextPage }) {
    const $wrapper = document.createElement('div')
    this.$searchResult = document.createElement('ul')

    this.data = initialData
    this.onClick = onClick
    this.onNextPage = onNextPage
    this.$wrapper = $wrapper
    this.$searchResult = this.$searchResult

    this.$wrapper.className = 'search-result-container'
    this.$searchResult.className = 'content'

    $target.appendChild($wrapper)
    $wrapper.appendChild(this.$searchResult)

    this.Empty = new Empty({
      $target
    })

    this.render()
  }

  setState(nextData) {
    this.data = nextData
    this.Empty.show(nextData)
    this.render()
  }

  /**
   * 조건: 스크롤 시, 마지막 엘리먼트 요소에 접근
   * 아이템이 화면에 보일 때 마지막 요소를 찾아서 다음페이지의 데이터를 읽어온다.
   * 아이템이 화면에 보이면 img src 속성 값을 dataset src값으로 바꾼다.(스켈레톤 스크린)
   */
  listObserver = new IntersectionObserver((items, observer) => {
    items.forEach(item => {
      if(item.isIntersecting) {
        item.target.querySelector('img').src = item.target.querySelector('img').dataset.src

        const dataIdx = Number(item.target.dataset.index)
        if(dataIdx + 1 === this.data.length) {
          console.log('마지막')
          this.onNextPage()
        }
      }
    })
  })

  render() {
    if(this.data) {
    this.$searchResult.innerHTML = this.data
      .map(
        (cat, idx) => `
        <div class="item" data-index=${idx}>
        <img src='/src/assets/img/preview.png' data-src=${cat?.url || '/src/assets/img/error.png'} alt=${cat?.name || '이미지 오류'} />
      </div>
        `
      )
      .join('')
    }
    
    this.$searchResult.querySelectorAll('.item').forEach(($item, index) => {
      $item.addEventListener('click', () => {
        this.onClick(this.data[index])
      })

      this.listObserver.observe($item)
    })
  }
}

export default SearchResult