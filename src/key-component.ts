export class KeyComponent {

    element: HTMLElement;
    key: string;
    subKey: string;
    _isHighlighted: boolean = false;

    constructor(key: string, subKey: string = '', hasSubKey: boolean = false) {
        this.key = key;
        this.subKey = subKey;
        this.element = document.createElement('div');
        this.element.classList.add('key');
        if(key !== ' ') {
            this.element.classList.add('key-' + key.toLowerCase().replace(' ', '-'));
        } else {
            this.element.classList.add('key-space');
        }

        if(['ctrl', 'fn', 'alt', 'shift', ' ', 'backspace', 'capslock', 'enter', 'tab'].indexOf(key.toLowerCase()) !== -1) {
            this.element.classList.add('key-special');
        }

        if(hasSubKey) {
            this.element.innerHTML = `
                <div class="sub-key-label" >${subKey}</div>
                <div class="key-label">${key}</div>
            `;
        } else {
            this.element.innerHTML = `
                <div class="key-label">${key}</div>
            `;
        }
    }

    set highlight(isHighlighted: boolean) {
        if(this._isHighlighted !== isHighlighted) {
            if(isHighlighted) {
                this.element.classList.add('highlight');
            } else {
                this.element.classList.remove('highlight');
            }
            this._isHighlighted = isHighlighted;
        }
    }
}