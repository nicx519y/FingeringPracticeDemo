import { DelegatedEventTarget } from './delegated-event-target';

export interface KeyConfigInterface {
    key: string;
    keyLabel: string;
    subKey: string;
    subKeyLabel: string;
    hasSubKey: boolean;
    location: number;
}

export class KeyComponent extends DelegatedEventTarget {

    element: HTMLElement;
    key: string;
    subKey: string;
    location: number;
    _isHighlighted: boolean = false;

    static TOUCH_START_EVENT = 'touchstart';
    static TOUCH_END_EVENT = 'touchend';

    constructor(config: KeyConfigInterface) {
        super();
        this.key = config.key;
        this.subKey = config.subKey;
        this.location = config.location;
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

        this.element.addEventListener('touchstart', this._touchHandler);
        this.element.addEventListener('touchend', this._touchHandler);
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

    _touchHandler = (evt: TouchEvent) => {

        console.log('touch', evt.type, this.key, this.subKey, this.location);

        evt.preventDefault();
        const detail = {
            key: this.key,
            subKey: this.subKey,
            location: this.location,
        };
        if(evt.type === 'touchstart') {
            this.dispatchEvent(new CustomEvent(KeyComponent.TOUCH_START_EVENT, { detail: detail }));
        } else {
            this.dispatchEvent(new CustomEvent(KeyComponent.TOUCH_END_EVENT, { detail: detail }));
        }
    }
}