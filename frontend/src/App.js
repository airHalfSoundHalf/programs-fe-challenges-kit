console.log("app is running!");

class App {
  $target = null;
  $wrap = null;
  data = [];

  constructor($target) {
    this.$target = $target

    // #App > div.wrap > $target*
    this.$wrap = document.createElement('div')
    this.$wrap.className = 'wrap'
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
            this.setState(data)
            this.loading.hide()
          } catch(error) {
            console.log('error:', error)
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
            console.log('error:', error)
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
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
