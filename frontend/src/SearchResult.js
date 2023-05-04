class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  /**
   * @todo
   * @example 검색 키워드: qqqq(빈배열), 엔터키(undefined)
   * 검색 시 this.data 값이 undefined일 때는 else로 넘어가지만,
   * [] 배열로 받는 경우에는 if문 true로 처리
   * if문에 !== 조건을 넣을 시 첫 렌더링때 else로 넘어가기 때문에 다른방안 체크
   */  
  render() {
    if(this.data) {
    this.$searchResult.innerHTML = this.data
      .map(
        cat => `
        <div class="item">
        <img src=${cat.url} alt=${cat.name} />
      </div>
        `
      )
      .join("");
    } else {
      this.$searchResult.innerHTML = `<p class='empty'>검색결과가 없습니다.</p>`
    }
    
    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });
    });

}
}
