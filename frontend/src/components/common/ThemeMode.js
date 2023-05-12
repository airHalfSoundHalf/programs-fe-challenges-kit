class ThemeMode {
  isDarkMode = null
  
    constructor({ $target, onChange }) {
      const $wrapper = document.createElement('div')
      const $toggleChx = document.createElement('input')

      /**
       * this로 선언하는 이유?
       * 1. 초기화
       * 2. 참조
       * 3. input 요소를 인스턴스의 데이터 속성으로 추가하고, 상태가 변경되면 자동으로 화면을 업데이트한다.
       */
       this.$wrapper = $wrapper    
       this.$toggleChx = $toggleChx 

      $wrapper.className = 'theme-container'
      $toggleChx.type = 'checkbox'
      $toggleChx.id = 'toggleChk'
      
      // 자식노드 추가
      $target.appendChild($wrapper)
      $wrapper.appendChild($toggleChx)

      // props
      $toggleChx.addEventListener('change', (e) => {
        onChange(e.target.checked)
      })

      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

      // 참조하여 선언
      this.bindHandler()
      this.setTheme()
    }

    setState(nextData) {
      this.data = nextData
      this.setThemeMode(this.data.isDarkMode)
    }
    
    // 첫 렌더링 시 앱 테마모드 감지
    bindHandler() {
      document.addEventListener('DOMContentLoaded', () => {
        if(!this.isDarkMode) return;

        this.$toggleChx.checked = true
        document.body.setAttribute('data-theme', 'dark')
      })
    }

    setTheme(theme) {
      if(!window.matchMedia) return;

      // 바인딩
      theme = this.isDarkMode ? 'dark ': 'light'
      document.body.dataset.theme = theme

      this.setThemeMode(this.isDarkMode)
    }

    setThemeMode(isDarkMode) {
      document.body.setAttribute(
        'data-theme',
        isDarkMode ? 'dark' : 'light'
      )
    }
    
    render() {}
  }

  export default ThemeMode