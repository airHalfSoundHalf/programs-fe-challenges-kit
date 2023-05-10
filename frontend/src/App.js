class App {
  $target = null
  $wrap = null
  data = []
  currentPage = 1

  constructor($target) {
    this.$target = $target

    // #App > div.wrap > $target*
    this.$wrap = document.createElement('div')
    this.$wrap.className = 'wrapper'
    $target.appendChild(this.$wrap)

    // 로딩
    this.loading = new LoadingSpinner({ $target: this.$wrap });

    // 테마모드
    this.toggleChx = new ThemeMode({
      $target: this.$wrap,
      onChange: (isDarkMode) => {
        this.toggleChx.setState({
          isDarkMode
        })
      }
    });

    // 검색창
    this.searchInput = new SearchInput({
      $target: this.$wrap,
      onSearch: keyword => {
        this.loading.show()
        api.fetchCats(keyword).then(({ data }) => {
          try {
            this.currentPage = 1
            this.setState(data)
            this.saveKeywordResult(data)
            this.keepInputResult(keyword)

            this.loading.hide()
          } catch(error) {
            console.error('error:', error)
          }
        });
      },
    });

    // 랜덤버튼
    this.randomButton = new RandomButton({
      $target: this.$wrap,
      onRandomSearch: () => {
        this.loading.show()
        api.fetchRandomCats().then(({ data }) => {
          try {
            this.setState(data)
            this.loading.hide()
          } catch(error) {
            console.error('error:', error)
          }
        })
      }
    });

    // 검색결과
    this.searchResult = new SearchResult({
      $target: this.$wrap,
      initialData: this.data,
      onClick: image => {
        this.imageInfo.getImageDetail({
          visible: true,
          image
        });
      },
      onNextPage: () => {
        this.loading.show()
        const currentPage = this.currentPage + 1
        api.fetchNextPage('cat', currentPage).then(({ data }) => {
          try {
            /* @todo: 다음페이지 이동 */
            this.currentPage = currentPage
            window.history.pushState(null, '', currentPage)

            let newData = this.data.concat(data)
            this.setState(newData)

            this.loading.hide()
          } catch(error) {
            console.error('error:', error)
          }
        })
      }
    });

    // 상세모달
    this.imageInfo = new ImageInfo({
      $target: this.$wrap,
      data: {
        visible: false,
        image: null
      },
    });

    this.init()
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  // 로컬스토리지에 검색키워드 직렬화 저장
  saveKeywordResult(value) {
    localStorage.setItem(LOCAL_STORAGE_KEY.검색결과, JSON.stringify(value ?? []))
  }

  // 최근 검색키워드 유지
  keepInputResult(value) {
    document.querySelector('.search-input').value = value
  }
  
  init() {
    // 검색된 키워드 데이터 역직렬화
    const getSearchData = localStorage.getItem(LOCAL_STORAGE_KEY.검색결과)
    const deSerialization = JSON.parse(getSearchData)
    this.setState(deSerialization)

    // 로컬스토리지에 저장된 최근키워드 접근
    const getSaveSearchData = localStorage.getItem(LOCAL_STORAGE_KEY.검색내역)
    this.keepInputResult(getSaveSearchData === null ? null : getSaveSearchData.split(',')[0])
  }
}
