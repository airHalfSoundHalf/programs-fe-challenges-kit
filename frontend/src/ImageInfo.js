class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    this.$imageInfo = $imageInfo;
    this.data = data;

    $imageInfo.className = "image-info";
    $target.appendChild($imageInfo);

    this.render();
  }

  // 이미지 세부정보
  async getImageDetail(data) {
    const detail = await api.fetchCatDetail(data.image.id)
    if(detail) {
      this.setState({
        visible: true,
        image: detail.data
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
    if (!visible) this.$imageInfo.style.display = 'none'
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
    this.setClose(nextData.visible);
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;
      console.log('this.data.image:', this.data.image)
      
      this.$imageInfo.innerHTML = `
        <div id="modal" class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      this.$imageInfo.style.display = "block";
    } else {
      this.$imageInfo.style.display = "none";
    }

    /**
     * 모달창이 띄어진 상태에서 클릭 해야 하기 때문에 렌더함수 안에서 작성
     */
    this.$imageInfo.addEventListener('click', (e) => {
      let targetClassNm = e.target.className
      if (
        targetClassNm.includes('image-info') ||
        targetClassNm === 'close'
      ) {
        this.closeImageInfo()
      }
    });

    // ESC키 제어
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeImageInfo()
      }
    })
  }
}