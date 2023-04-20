export class MyModal {
    element: HTMLElement;
    _btns: HTMLDivElement[] = [];
    constructor(
        btns: { label: string, className?: string, callback?: (label: string) => void }[] = [],
    ) {
        this.element = document.createElement('div');
        this.element.classList.add('simple-modal', 'hiden');
        this._btns = btns.map(btn => {
            const div = document.createElement('div');
            div.classList.add('simple-modal-btn', btn.className);
            div.innerHTML = `
                <span>${btn.label}</span>
            `;
            div.addEventListener('click', () => btn.callback && btn.callback(btn.label));
            return div;
        });

        this.element.innerHTML = `
            <div class="simple-modal-content">
            </div>
            <div class="simple-modal-btns"></div>
        `;

        this.element.querySelector('.simple-modal-btns').append(...this._btns);
    }

    setContent(content: string) {
        this.element.querySelector('.simple-modal-content').innerHTML = content;
    }

    show(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.element.classList.remove('hide', 'hiden', 'showen');
            this.element.addEventListener('animationend', () => {
                this.element.classList.remove('show');
                this.element.classList.add('showen');
                resolve();
            }, { once: true });
            this.element.classList.add('show');
        });
    }

    hide(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.element.classList.remove('showen', 'show', 'hiden');
            
            this.element.addEventListener('animationend', () => {
                console.log('animationend');
                this.element.classList.remove('hide');
                this.element.classList.add('hiden');
                resolve();
            }, { once: true });
            this.element.classList.add('hide');
        });
    }
}