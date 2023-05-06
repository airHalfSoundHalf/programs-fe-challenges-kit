class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick, onNextPage }) {
    this.$searchResult = document.createElement("div");
    this.data = initialData;
    this.onClick = onClick;
    this.onNextPage = onNextPage;
    
    this.$searchResult.className = "search-result";
    $target.appendChild(this.$searchResult);

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  /**
   * IntersectionObserver 옵션
   * {once: true} : 이벤트가 한번만 실행되도록 하는 옵션
   * but, IntersectionObserver에서만 적용 가능하여, 콜백함수로 넘겨서 addEventListener 이벤트 함수로 사용하면 적용X
   */
  // 엘리먼트 노출 여부
  isElementInViewport(el, callback) {
    this.observer = new IntersectionObserver(entires => {
      entires.forEach(entry => {
        if(entry.isIntersecting) {
          return callback()
        }
      })
    })
  this.observer.observe(el)
}

/**
 * 조건: 스크롤 시, 마지막 엘리먼트 요소에 접근
 * @todo
 * 버그: 마지막 요소 접근 후 스크롤 시 1번이 아닌 여러 번 찍힘
 */
  applyEventToElement = (items) => {
    document.addEventListener('scroll', () => {
      items.forEach((el, idx) => {
        this.isElementInViewport(el, () => {
          if (items.length - 1 === idx) {
            console.log('마지막')
            this.onNextPage()
          }
        })
      })
    })
  }


  /**
   * @example 검색 키워드: qqqq(빈배열), 엔터키(undefined)
   * @todo
   * 버그: 검색 시 this.data 값이 undefined일 때는 else로 넘어가지만, 빈 배열로 받는 경우에는 if문 true로 처리되고 있음
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

    let listItems = this.$searchResult.querySelectorAll(".item")
    this.applyEventToElement(listItems)
}
}
