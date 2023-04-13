import { DisplayConfigInterface } from './display-config-interface';

export class DisplayComponent {

    element: HTMLElement;

    _wordsCounts: number[] = [];
    _wordHighlightOffset: number = 0;
    _pagesElements: HTMLElement[] = [];
    _wordsElements: HTMLElement[] = [];
    _showenPage: number = -1;

    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('display-panel');
    }

    //设置显示区域内容
    setContent(config: DisplayConfigInterface) {
        this.element.innerHTML = '';
        this._showenPage = -1;
        config.pages.forEach((page) => {
            const pageElement = document.createElement('div');
            pageElement.classList.add('page');
            page.rows.forEach((row) => {
                const rowElement = document.createElement('div');
                rowElement.classList.add('row');
                row.words.split('').forEach((word) => {
                    const wordElement = document.createElement('span');
                    wordElement.classList.add('word');
                    wordElement.innerHTML = word;
                    rowElement.appendChild(wordElement);
                });
                pageElement.appendChild(rowElement);

            });
            this.element.appendChild(pageElement);
        });

        //设置字体大小
        this.element.style.fontSize = `${config.size}px`;

        //初始化变量
        this._pagesElements = Array.from(this.element.querySelectorAll('.page'));
        this._wordsElements = Array.from(this.element.querySelectorAll('.word'));
        this._wordHighlightOffset = 0;
        //记录每一页的word数量
        this._wordsCounts = config.pages.map((page) => {
            return page.rows.reduce((acc, row) => {
                return acc + row.words.length;
            }, 0);
        });

        this._setPageActive(0);
    }

    //设置某页可见
    _setPageActive(page: number) {
        if(page === this._showenPage || page < 0 || page > this._pagesElements.length - 1) return;
        this._pagesElements.forEach((pageElement) => {
            pageElement.classList.remove('active');
        });
        console.log(this._pagesElements[page])
        this._pagesElements[page] && this._pagesElements[page].classList.add('active');
        this._showenPage = page;
    }

    //获取某个offset对应的页码
    _getPageNumberByOffset(offset: number): number {
        let page = 0;
        let acc = 0;
        while(acc < offset) {
            acc += this._wordsCounts[page];
            page++;
        }
        return page - 1;
    }
    
    //设置到某个word为止高亮
    set wordHighlightOffset(offset: number) {

        if(offset < 0 || offset > this._wordsElements.length) return;

        if(offset > this._wordHighlightOffset) {
            for(let i = this._wordHighlightOffset; i < offset; i++) {
                this._wordsElements[i].classList.add('highlight');
            }
        } else {
            for(let i = this._wordHighlightOffset - 1; i >= offset; i--) {
                this._wordsElements[i].classList.remove('highlight');
            }
        }
        this._wordHighlightOffset = offset;

        this._setPageActive(this._getPageNumberByOffset(offset + 1));
    }

    //获取当前高亮的word的offset
    get wordHighlightOffset(): number {
        return this._wordHighlightOffset;
    }
}