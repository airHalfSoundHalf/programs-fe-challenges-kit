const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch }) {
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    
    $searchInput.className = "search-input";
    $searchInput.placeholder = "고양이를 검색해보세요.|";
    $target.appendChild($searchInput);

    $searchInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        onSearch(e.target.value);
        this.SearchHistory.onSearchAddKeyword(e.target.value)
      }
    });

    this.SearchHistory = new SearchHistory({
      $target,
      onSearch
    })

  }
  
  render() {}
}
