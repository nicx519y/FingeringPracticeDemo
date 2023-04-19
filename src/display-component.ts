import {  DisplayConfig, DisplayViewModel } from './display-config';
import { AnimationIterator } from './animation-Iterator';

export class DisplayComponent {

    element: HTMLElement;

    _wordsCounts: number[] = [];
    _wordOffset: number = 0;
    _pagesElements: HTMLElement[] = [];
    _wordsElements: HTMLElement[] = [];
    _showenPage: number = -1;
    _effectDuration: number = 800;

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
            page.rows.forEach((row, rowIdx) => {
                const rowElement = document.createElement('div');
                rowElement.setAttribute('data-row-index', rowIdx.toString());
                rowElement.classList.add('row');
                row.words.split('').forEach((word, wordIdx) => {
                    const wordElement = document.createElement('span');
                    wordElement.setAttribute('data-word-index', wordIdx.toString());
                    wordElement.classList.add('word');
                    wordElement.setAttribute('data-word', word);
                    rowElement.appendChild(wordElement);
                });

                pageElement.appendChild(rowElement);

            });
            this.element.appendChild(pageElement);
        });

        //设置字体大小
        this.element.style.fontSize = `${model.size}em`;

        //初始化变量
        this._pagesElements = Array.from(this.element.querySelectorAll('.page'));
        this._wordsElements = Array.from(this.element.querySelectorAll('.word'));
        this._wordOffset = 0;
        //记录每一页的word数量
        this._wordsCounts = config.getWordsCountAllPage();

        this._setPageActive(0);
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
        ele.setAttribute('data-wrong-word', word);

        ele.classList.remove('wrong-word');
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => ele.classList.add('wrong-word'));
        });
    }

    //设置某页可见
    _setPageActive(page: number) {
        if(page === this._showenPage || page < 0 || page > this._pagesElements.length - 1) return;

        let oldIterator: AnimationIterator;
        let newIterator: AnimationIterator;

        if(this._showenPage >= 0 && this._showenPage < this._pagesElements.length) {
            const pageElementOld = this._pagesElements[this._showenPage];

            pageElementOld.classList.remove('active', 'show');
            pageElementOld.classList.add('complete', 'hide');

            oldIterator = new AnimationIterator(
                pageElementOld.querySelectorAll('.word'), 
                this._effectDuration,
                );
        }

        const pageElementNew = this._pagesElements[page];
        pageElementNew.classList.add('active', 'show');
        pageElementNew.classList.remove('complete', 'hide');

        newIterator = new AnimationIterator(
            pageElementNew.querySelectorAll('.word'), 
            this._effectDuration,
            );
        
        if(oldIterator) {
            oldIterator.run((ele, idx) => {
                ele.classList.remove('complete', 'active', 'show', 'showen', 'hiden');
                ele.classList.add('hide');
            }, (ele, idx) => {
                ele.classList.remove('hide');
                ele.classList.add('hiden');
            }
            ).then(() => {
                newIterator.run(
                    (ele, idx) => {
                        ele.classList.remove('showen', 'hide', 'hiden');
                        ele.classList.add('show')
                    },
                    (ele, idx) => {
                        ele.classList.remove('show');
                        ele.classList.add('showen');
                    }
                    )
            });
        } else {
            newIterator.run((ele, idx) => {
                ele.classList.remove('showen', 'hide', 'hiden');
                ele.classList.add('show');
            },(ele, idx) => {
                ele.classList.remove('show');
                ele.classList.add('showen');
            })
        }

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
    
    

}