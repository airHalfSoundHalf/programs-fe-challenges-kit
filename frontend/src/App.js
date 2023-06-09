import LOCALSTORAGE_KEY from './constants/index.js'
import api from './api/index.js'

import LoadingSpinner from './components/common/LoadingSpinner.js'
import ThemeMode from './components/common/ThemeMode.js'
import SearchInput from './components/search/SearchInput.js'
import RandomButton from './components/etc/RandomButton.js'
import SearchResult from './components/search/SearchResult.js'
import ImageInfo from './components/modal/ImageInfo.js'

class App {
  $target = null
  $wrap = null
  DEFAULT_PAGE = 1
  data = {
    items: [],
    currentPage: this.DEFAULT_PAGE
  }

  constructor($target) {
    this.$target = $target

    // #App > div.wrap > $target*
    this.$wrap = document.createElement('div')
    this.$wrap.className = 'wrapper'
    $target.appendChild(this.$wrap)

    // 로딩
    this.loading = new LoadingSpinner({ $target: $target })

    // 테마모드
    this.toggleChx = new ThemeMode({
      $target: this.$wrap,
      onChange: (isDarkMode) => {
        this.toggleChx.setState({
          isDarkMode
        })
      }
    })

    // 검색창
    this.searchInput = new SearchInput({
      $target: this.$wrap,
      onSearch: (keyword, limit) => {
        this.loading.show()

        api.fetchCatsWithLimit(keyword, limit).then(({ data }) => {
          console.log('data:', data)
            this.setState({
              items: data ?? [],
              currentPage: this.DEFAULT_PAGE
            })
            this.saveKeywordResult(data)
            this.keepInputResult(keyword)

            this.loading.hide()
        })
      },
    })

    // 랜덤버튼
    this.randomButton = new RandomButton({
      $target: this.$wrap,
      onRandomSearch: () => {
        this.loading.show()
        
        api.fetchRandomCats().then(({ data }) => {
            this.setState({
              items: data,
              currentPage: this.DEFAULT_PAGE
            })
            
            this.loading.hide()
        })
      }
    })

    // 검색결과
    this.searchResult = new SearchResult({
      $target: this.$wrap,
      initialData: this.data.items,
      onClick: async image => {
        this.loading.show()
        
          await this.imageInfo.getImageDetail({
            visible: true,
            image
          })
          this.loading.hide()
      },
      onNextPage: () => {
        const currentPage = this.data.currentPage + 1
        this.loading.show()

        api.fetchNextPage('cat', currentPage).then(({ data }) => {
            /* @todo: 페이지네이션 기능 추가 */
            window.history.pushState(null, '', currentPage)
            let newData = this.data.items.concat(data)
            this.setState({
              items: newData,
              currentPage: currentPage
            })

            this.loading.hide()
        })
      }
    })

    // 상세모달
    this.imageInfo = new ImageInfo({
      $target: this.$wrap,
      data: {
        visible: false,
        image: null,
      },
    })

    this.init()
  }

  setState(nextData) {
    this.data = nextData
    this.searchResult.setState(nextData.items)
  }

  init() {
    // 검색된 키워드 데이터 역직렬화
    const getSearchedData = localStorage.getItem(LOCALSTORAGE_KEY.검색결과)
    const deSerialization = JSON.parse(getSearchedData)
    this.setState({
      items: deSerialization,
      currentPage: this.DEFAULT_PAGE
    })

    // 로컬스토리지에 저장된 최근키워드 접근
    const getSavedSearchData = localStorage.getItem(LOCALSTORAGE_KEY.검색내역)
    this.keepInputResult(getSavedSearchData === null ? null : getSavedSearchData.split(',')[0])
  }

  // 로컬스토리지에 검색키워드 직렬화 저장
  saveKeywordResult(value) {
    localStorage.setItem(LOCALSTORAGE_KEY.검색결과, JSON.stringify(value ?? []))
  }

  // 최근 검색키워드 유지
  keepInputResult(value) {
    document.querySelector('.search-input').value = value
  }
}

export default App