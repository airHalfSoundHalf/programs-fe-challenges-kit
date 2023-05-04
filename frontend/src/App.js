console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.loading = new LoadingSpinner({ $target });

    this.toggleChx = new ThemeMode({
      $target,
      onChange: (isDarkMode) => {
        this.toggleChx.setState({
          isDarkMode
        })
      }
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: keyword => {
        this.loading.show()
        api.fetchCats(keyword).then(({ data }) => {
          try {
            this.loading.hide()
            this.setState(data)
          } catch(error) {
            // this.loading
            console.log('error:', error)
          }
        });
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: image => {
        this.imageInfo.setState({
          visible: true,
          image
        });
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
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
