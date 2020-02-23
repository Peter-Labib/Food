class ArrowScroll {
    constructor () {
        this.arrow= document.querySelector ('.header__arrow')
        this.arrow.addEventListener('click', this.ArrowScroll.bind(this))
    }

    ArrowScroll() {
        const header = document.querySelector('.header')
        const headerHeight = header.offsetHeight
        window.scrollTo(0,headerHeight)
    }
}

new ArrowScroll()