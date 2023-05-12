import api from '../../api/index.js'

class ImageInfo {
  $imageInfo = null
  data = null

  constructor({ $target, data }) {
    const $imageInfo = document.createElement('div')
    this.$imageInfo = $imageInfo
    this.data = data

    $imageInfo.className = 'image-info-container'
    $target.appendChild($imageInfo)

    this.render()
  }

  setState(nextData) {
    this.data = nextData
    this.render()
    this.setClose(nextData.visible)
  }

  // 이미지 세부정보
  async getImageDetail(data) {
    const detailInfo = await api.fetchCatDetail(data.image.id)

    if(detailInfo) {
      this.setState({
        visible: true,
        image: detailInfo.data
      })
    }
  }

  closeImageInfo() {
    this.setState({
      visible: false,
      image: undefined,
    });
  }

  setClose(visible) {
    if (!visible) return this.$imageInfo.style.display = 'none'
  }
  
  // 이벤트 위임
  bindOutsideEvent() {
    this.$imageInfo.addEventListener('click', (e) => {
    let targetClassNm = e.target.className
    if (
      targetClassNm.includes('image-info') ||
      targetClassNm === 'close'
    ) return this.closeImageInfo()
  })
  }
  
  // ESC키 제어
  bindKeydownEvent() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeImageInfo()
      }
    })
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image

      this.$imageInfo.innerHTML = `
        <div id="modal" class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <span class="close">x</span>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <p>성격: ${temperament}</p>
            <span>태생: ${origin}</span>
          </div>
        </div>`;
      this.$imageInfo.style.display = "block";
    } else {
      this.$imageInfo.style.display = "none";
    }

    // 모달창이 띄어진 상태에서 클릭 해야 하기 때문에 렌더함수 안에서 작성
    this.bindOutsideEvent()
    this.bindKeydownEvent()
  }
}

export default ImageInfo