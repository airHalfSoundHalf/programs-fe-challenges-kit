import LOCALSTORAGE_KEY from '../../constants/index.js'
import uniqueArray from '../../utils/uniqueArray.js'

class SearchHistory {
    $searchHistory = null
    data = null

    constructor({ $target, onSearch, onAdd }) {
        const $wrapper = document.createElement('div')
        const $searchHistory = document.createElement('ol')

        this.$wrapper = $wrapper
        this.$searchHistory = $searchHistory
        this.onSearch = onSearch
        this.onAdd = onAdd
        
        $wrapper.className = 'search-history-container'
        $target.appendChild(this.$wrapper)
        $wrapper.appendChild(this.$searchHistory)

        this.init()
        this.render()
    }

    /**
     * 초기 렌더링 시 초기화 작업
     * @method constructor: 객체의 프로퍼티를 초기화하거나 메소드를 정의하는 작업 수행  
     * @method init: 객체 생성 후, 외부에서 객체를 초기화하는 작업 수행  
     * 
     * @readonly 차이점은 호출 시점이다.  
     * 객체 생성될 때, 객체 생성 이후 외부의 추가 작업이 필요할 때  
     * 
     * @readonly 초기화 해주는 이유는 객체가 안정적으로 동작하도록 보장하기 위해서다.  
     * 일부 값들은 객체 생성 후에도 변경될 수 있는 값이 존재하기 때문
     */
    init() {
        const getSearchData = localStorage.getItem(LOCALSTORAGE_KEY.검색내역)
        let condition = getSearchData === null ? [] : getSearchData.split(',')
        condition = uniqueArray(condition)

        this.setState(condition)
    }
    
    // 검색 시 이전 검색키워드 포함하여 저장
    onSearchAddKeyword(newValue) {
        const getSearchData = localStorage.getItem(LOCALSTORAGE_KEY.검색내역)

        let condition = getSearchData === null ? [] : getSearchData.split(',')
        condition = uniqueArray(condition)
        const currentHistories = [newValue, ...condition].slice(0, 5).join(',')
        localStorage.setItem(LOCALSTORAGE_KEY.검색내역, currentHistories)

        this.init()
    }
    

    setState(nextData) {
        this.data = nextData
        this.render()
    }

    render() {
        this.$searchHistory.innerHTML = this.data
        .map(keyword => `
        <li><button>${keyword}</button></li>
        `
        ).join('')

        this.$searchHistory.querySelectorAll('li button').forEach(($item, idx) => {
            $item.addEventListener('click', () => {
                this.onSearch(this.data[idx])
                this.onSearchAddKeyword(this.data[idx])
            })
        })
    }
}

export default SearchHistory