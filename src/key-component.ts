export interface KeyConfigInterface {
    key: string;
    keyLabel: string;
    subKey: string;
    subKeyLabel: string;
    hasSubKey: boolean;
}

export class KeyComponent {

    element: HTMLElement;
    key: string;
    subKey: string;
    _isHighlighted: boolean = false;

    constructor(config: KeyConfigInterface) {
        this.key = config.key;
        this.subKey = config.subKey;
        this.element = document.createElement('div');
        this.element.classList.add('key');
        if(this.key !== ' ') {
            this.element.classList.add('key-' + this.key.toLowerCase().replace(' ', '-'));
        } else {
            this.element.classList.add('key-space');
        }

        if(['ctrl', 'fn', 'alt', 'shift', ' ', 'backspace', 'capslock', 'enter', 'tab'].indexOf(this.key.toLowerCase()) !== -1) {
            this.element.classList.add('key-special');
        }

        this.element.innerHTML = `
            <div class="key-container">
                <div class="key-label" 
                    data-key="${config.key}" 
                    data-key-label="${config.keyLabel}" 
                    data-subkey="${config.subKey}" 
                    data-subkey-label="${config.subKeyLabel}" 
                    ></div>
            </div>
        `;
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