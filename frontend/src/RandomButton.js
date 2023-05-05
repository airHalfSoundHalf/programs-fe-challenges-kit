class RandomButton {
  constructor({ $target, onRandomSearch }) {
    const $wrapper = document.createElement('div')
    const $randomButton = document.createElement("button")

    this.$wrapper = $wrapper
    this.$randomButton = $randomButton

    $wrapper.className = 'btn-container'
    $randomButton.className = 'random-button'
    $randomButton.textContent = '랜덤 버튼'
    $target.appendChild($wrapper)
    $wrapper.appendChild($randomButton)

    $randomButton.addEventListener("click", e => {
        onRandomSearch('귀여운고양이')
    })

    console.log("SearchInput created.", this)
  }
  render() {}
}
