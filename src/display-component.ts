import {  DisplayConfig, DisplayViewModel } from './display-config';

export class DisplayComponent {

    element: HTMLElement;

    _wordsCounts: number[] = [];
    _wordOffset: number = 0;
    _pagesElements: HTMLElement[] = [];
    _wordsElements: HTMLElement[] = [];
    _showenPage: number = -1;

    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('display-panel');
    }

    //设置显示区域内容
    setContent(config: DisplayConfig) {
        this.element.innerHTML = '';
        this._showenPage = -1;

        const model: DisplayViewModel = config.parseToViewModel();
        model.pages.forEach((page) => {
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
        this.element.style.fontSize = `${model.size}px`;

        //初始化变量
        this._pagesElements = Array.from(this.element.querySelectorAll('.page'));
        this._wordsElements = Array.from(this.element.querySelectorAll('.word'));
        this._wordOffset = 0;
        //记录每一页的word数量
        this._wordsCounts = config.getWordsCountAllPage();

        this._setPageActive(0);
    }

    //设置某页可见
    _setPageActive(page: number) {
        if(page === this._showenPage || page < 0 || page > this._pagesElements.length - 1) return;
        this._pagesElements.forEach((pageElement) => {
            pageElement.classList.remove('active');
        });
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
    set wordOffset(offset: number) {

        if(offset < 0 || offset > this._wordsElements.length) return;

        if(this._wordOffset < this._wordsElements.length && this._wordOffset >= 0) {
            this._wordsElements[this._wordOffset].classList.remove('active');
            this._wordsElements[this._wordOffset].classList.remove('wrong-word');
        }

        if(offset > this._wordOffset) {
            for(let i = this._wordOffset; i < offset; i++) {
                this._wordsElements[i].classList.add('complete');
            }
        } else {
            for(let i = this._wordOffset - 1; i >= offset; i--) {
                this._wordsElements[i].classList.remove('complete');
            }
        }

        this._wordOffset = offset;

        if(this._wordOffset < this._wordsElements.length && this._wordOffset >= 0) {
            this._wordsElements[this._wordOffset].classList.add('active');
        }

        this._setPageActive(this._getPageNumberByOffset(offset + 1));
    }

    //获取当前高亮的word的offset
    get wordOffset(): number {
        return this._wordOffset;
    }

    //高亮闪烁active的word
    wrongNotice(word: string = '') {
        const ele = this._wordsElements[this._wordOffset];
        //出错内容
        ele.setAttribute('data-word', word);

        ele.classList.remove('wrong-word');
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => ele.classList.add('wrong-word'));
        });
    }

}