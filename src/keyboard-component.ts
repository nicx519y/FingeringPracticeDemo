import { KeyComponent } from './key-component';

export class KeyboardComponent {

    _config = [
        [
            { key: '`', subKey: '~', hasSubKey: true },
            { key: '1', subKey: '!', hasSubKey: true },
            { key: '2', subKey: '@', hasSubKey: true },
            { key: '3', subKey: '#', hasSubKey: true },
            { key: '4', subKey: '$', hasSubKey: true },
            { key: '5', subKey: '%', hasSubKey: true },
            { key: '6', subKey: '^', hasSubKey: true },
            { key: '7', subKey: '&', hasSubKey: true },
            { key: '8', subKey: '*', hasSubKey: true },
            { key: '9', subKey: '(', hasSubKey: true },
            { key: '0', subKey: ')', hasSubKey: true },
            { key: '-', subKey: '_', hasSubKey: true },
            { key: '=', subKey: '+', hasSubKey: true },
            { key: 'Backspace', subKey: '', hasSubKey: false }
        ],
        [
            { key: 'Tab', subKey: '', hasSubKey: false },
            { key: 'q', subKey: '', hasSubKey: false },
            { key: 'w', subKey: '', hasSubKey: false },
            { key: 'e', subKey: '', hasSubKey: false },
            { key: 'r', subKey: '', hasSubKey: false },
            { key: 't', subKey: '', hasSubKey: false },
            { key: 'y', subKey: '', hasSubKey: false },
            { key: 'u', subKey: '', hasSubKey: false },
            { key: 'i', subKey: '', hasSubKey: false },
            { key: 'o', subKey: '', hasSubKey: false },
            { key: 'p', subKey: '', hasSubKey: false },
            { key: '[', subKey: '{', hasSubKey: true },
            { key: ']', subKey: '}', hasSubKey: true },
            { key: '\\', subKey: '|', hasSubKey: true }
        ],
        [
            { key: 'CapsLock', subKey: '', hasSubKey: false },
            { key: 'a', subKey: '', hasSubKey: false },
            { key: 's', subKey: '', hasSubKey: false },
            { key: 'd', subKey: '', hasSubKey: false },
            { key: 'f', subKey: '', hasSubKey: false },
            { key: 'g', subKey: '', hasSubKey: false },
            { key: 'h', subKey: '', hasSubKey: false },
            { key: 'j', subKey: '', hasSubKey: false },
            { key: 'k', subKey: '', hasSubKey: false },
            { key: 'l', subKey: '', hasSubKey: false },
            { key: ';', subKey: ':', hasSubKey: true },
            { key: '\'', subKey: '"', hasSubKey: true },
            { key: 'Enter', subKey: '', hasSubKey: false }
        ],
        [
            { key: 'Shift', subKey: '', hasSubKey: false },
            { key: 'z', subKey: '', hasSubKey: false },
            { key: 'x', subKey: '', hasSubKey: false },
            { key: 'c', subKey: '', hasSubKey: false },
            { key: 'v', subKey: '', hasSubKey: false },
            { key: 'b', subKey: '', hasSubKey: false },
            { key: 'n', subKey: '', hasSubKey: false },
            { key: 'm', subKey: '', hasSubKey: false },
            { key: ',', subKey: '<', hasSubKey: true },
            { key: '.', subKey: '>', hasSubKey: true },
            { key: '/', subKey: '?', hasSubKey: true },
            { key: 'Shift', subKey: '', hasSubKey: false }
        ],
        [
            { key: 'Ctrl', subKey: '', hasSubKey: false },
            { key: 'Alt', subKey: '', hasSubKey: false },
            { key: ' ', subKey: '', hasSubKey: false },
            { key: 'Alt', subKey: '', hasSubKey: false },
            { key: 'Ctrl', subKey: '', hasSubKey: false }
        ]
    ];
    element: HTMLElement;
    keysList: Map<string, KeyComponent[]> = new Map();
    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('keyboard');
        this._config.forEach((row) => {
            const rowElement = document.createElement('div');
            rowElement.classList.add('row');
            row.forEach((keyConfig) => {
                const key = new KeyComponent(keyConfig.key, keyConfig.subKey, keyConfig.hasSubKey);
                rowElement.appendChild(key.element);

                if(!this.keysList.has(keyConfig.key)) {
                    this.keysList.set(keyConfig.key, [key]);
                    if(keyConfig.hasSubKey) {
                        this.keysList.set(keyConfig.subKey, [key]);
                    }
                } else {
                    this.keysList.get(keyConfig.key).push(key);
                }
            });
            this.element.appendChild(rowElement);
        });
    }

    highlightKey(key: string, keyLocation: number = 0, isHighlight: boolean = true) {
        const keyComponents = this.keysList.get(key);
        if(!keyComponents || keyComponents.length === 0) return;
        if(keyLocation === 0) {
            keyComponents[0].highlight = isHighlight;
        } else {
            keyComponents[keyLocation - 1].highlight = isHighlight;
        }
    }
}