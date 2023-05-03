class Toggle {
    constructor({ $target, onClick }) {
      const $toggleChx = document.createElement('input');
      $toggleChx.type = 'checkbox'
      $toggleChx.id = 'toggleChk'
      this.$toggleChx = $toggleChx      
      $target.appendChild($toggleChx)

      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      // 진입 시 다크모드 감지
      if (isDarkMode) $toggleChx.checked = true

      const toggleScheme = () => {
        if (isDarkMode) {
          document.body.classList.toggle('light-mode');
        } else {
          document.body.classList.toggle('dark-mode');
        }
      }
      
      const query = window.matchMedia('(prefers-color-scheme: dark)')

      // matches 감지
      query.addEventListener('change', (e) => {
        console.log('e', e.matches)
      });

      $toggleChx.addEventListener('change', (e) => {
        toggleScheme()
        // onClick(e.target.value)
      });

      console.log("SearchInput created.", this);
    }
    
    render() {}
  }
  