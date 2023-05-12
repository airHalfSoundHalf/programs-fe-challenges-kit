class ScrollNextPage {
    constructor({ $target, currentPage, totalPages, onClick }) {
        this.$target = $target
        this.currentPage = currentPage
        this.totalPages = totalPages
        this.onClick = onClick

        const $nextButton = document.createElement('div')
        this.$nextButton = $nextButton

        $nextButton.className = 'next-button'
        $target.appendChild($nextButton);

        this.render()
    }

    setState(nextcurrentPage, nextTotalPage) {
        this.currentPage = nextcurrentPage
        this.totalPages = nextTotalPage
        this.render()
    }

    
    render() {
        function setUrl(value) {
            window.history.pushState(null, '', value)
        }

        this.$nextButton.addEventListener('click', () => {
            console.log('this.currentPage:', this.currentPage)
            console.log('this.totalPages:', this.totalPages)
            if(this.currentPage < this.totalPages) {
                this.onClick(this.currentPage + 1)
                setUrl(this.currentPage + 1)
            }
        })
        
    }
}

export default ScrollNextPage