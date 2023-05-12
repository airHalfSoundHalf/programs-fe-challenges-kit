import LOCALSTORAGE_KEY from '../../constants/index.js'
import SearchHistory from './SearchHistory.js'

class SearchInput {
  constructor({ $target, onSearch }) {
    const $wrapper = document.createElement('div');
    const $searchInput = document.createElement("input")

    this.$wrapper = $wrapper
    this.$searchInput = $searchInput
    
    $wrapper.className = "search-input-container"
    $searchInput.className = "search-input"
    $searchInput.placeholder = "고양이를 검색해보세요.|"

    $target.appendChild($wrapper)
    $wrapper.appendChild($searchInput)

    $searchInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        // 입력값 유효성 처리
        if(e.target.value === '') return window.alert('검색어를 입력해주세요.');
        if(e.target.value.match(/^\s/g)) return window.alert('첫 글자에 공백을 입력할 수 없습니다.');
        const prevSearchValue = localStorage.getItem(LOCALSTORAGE_KEY.검색내역).split(',')[0]
        if(prevSearchValue === e.target.value) return window.alert('동일한 검색어입니다. 다른 키워드를 입력해주세요.')

        onSearch(e.target.value, this.$limitCount.value)
        this.SearchHistory.onSearchAddKeyword(e.target.value)
      }
    })

    // 옵션 셀렉트
    const $limitCount = document.createElement('select')
    this.$limitCount = $limitCount
    this.$limitCount.className = 'limit-count'

    let SELECT_OPTIONS = [10, 25, 50]
    SELECT_OPTIONS.map((option) => {
      const $selectOption = document.createElement('option')

      $selectOption.value = option
      $selectOption.textContent = `${option}개`
      
      $limitCount.appendChild($selectOption)
    })

    $wrapper.append($limitCount)

    this.SearchHistory = new SearchHistory({
      $target,
      onSearch,
    })

  }
  
  render() {}
}

export default SearchInput