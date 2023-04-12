import { KeyComponent } from './key-component';

const KEYBOARD_CONFIG = [
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

interface KeyboardAction {
    key: string;
    shift: boolean;
    location: number;
    keyResult?: string;
}

const KEYBOARD_ACTIONS: Map<string, KeyboardAction> = new Map([
    ['`', { key: '`', shift: false, location: 0}],
    ['1', { key: '1', shift: false, location: 0}],
    ['2', { key: '2', shift: false, location: 0}],
    ['3', { key: '3', shift: false, location: 0}],
    ['4', { key: '4', shift: false, location: 0}],
    ['5', { key: '5', shift: false, location: 0}],
    ['6', { key: '6', shift: false, location: 0}],
    ['7', { key: '7', shift: false, location: 0}],
    ['8', { key: '8', shift: false, location: 0}],
    ['9', { key: '9', shift: false, location: 0}],
    ['0', { key: '0', shift: false, location: 0}],
    ['-', { key: '-', shift: false, location: 0}],
    ['=', { key: '=', shift: false, location: 0}],
    ['Backspace', { key: 'Backspace', shift: false, location: 0}],
    ['Tab', { key: 'Tab', shift: false, location: 0}],
    ['q', { key: 'q', shift: false, location: 0}],
    ['w', { key: 'w', shift: false, location: 0}],
    ['e', { key: 'e', shift: false, location: 0}],
    ['r', { key: 'r', shift: false, location: 0}],
    ['t', { key: 't', shift: false, location: 0}],
    ['y', { key: 'y', shift: false, location: 0}],
    ['u', { key: 'u', shift: false, location: 0}],
    ['i', { key: 'i', shift: false, location: 0}],
    ['o', { key: 'o', shift: false, location: 0}],
    ['p', { key: 'p', shift: false, location: 0}],
    ['[', { key: '[', shift: false, location: 0}],
    [']', { key: ']', shift: false, location: 0}],
    ['\\', { key: '\\', shift: false, location: 0}],
    ['CapsLock', { key: 'CapsLock', shift: false, location: 0}],
    ['a', { key: 'a', shift: false, location: 0}],
    ['s', { key: 's', shift: false, location: 0}],
    ['d', { key: 'd', shift: false, location: 0}],
    ['f', { key: 'f', shift: false, location: 0}],
    ['g', { key: 'g', shift: false, location: 0}],
    ['h', { key: 'h', shift: false, location: 0}],
    ['j', { key: 'j', shift: false, location: 0}],
    ['k', { key: 'k', shift: false, location: 0}],
    ['l', { key: 'l', shift: false, location: 0}],
    [';', { key: ';', shift: false, location: 0}],
    ['\'', { key: '\'', shift: false, location: 0}],
    ['Enter', { key: 'Enter', shift: false, location: 0}],
    ['Shift', { key: 'Shift', shift: false, location: 0}],
    ['z', { key: 'z', shift: false, location: 0}],
    ['x', { key: 'x', shift: false, location: 0}],
    ['c', { key: 'c', shift: false, location: 0}],
    ['v', { key: 'v', shift: false, location: 0}],
    ['b', { key: 'b', shift: false, location: 0}],
    ['n', { key: 'n', shift: false, location: 0}],
    ['m', { key: 'm', shift: false, location: 0}],
    [',', { key: ',', shift: false, location: 0}],
    ['.', { key: '.', shift: false, location: 0}],
    ['/', { key: '/', shift: false, location: 0}],
    ['Shift', { key: 'Shift', shift: false, location: 0}],
    ['Ctrl', { key: 'Ctrl', shift: false, location: 0}],
    ['Alt', { key: 'Alt', shift: false, location: 0}],
    [' ', { key: ' ', shift: false, location: 0}],

    ['~', { key: '`', shift: true, location: 2}],
    ['!', { key: '1', shift: true, location: 2}],
    ['@', { key: '2', shift: true, location: 2}],
    ['#', { key: '3', shift: true, location: 2}],
    ['$', { key: '4', shift: true, location: 2}],
    ['%', { key: '5', shift: true, location: 2}],
    ['^', { key: '6', shift: true, location: 2}],
    ['&', { key: '7', shift: true, location: 1}],
    ['*', { key: '8', shift: true, location: 1}],
    ['(', { key: '9', shift: true, location: 1}],
    [')', { key: '0', shift: true, location: 1}],
    ['_', { key: '-', shift: true, location: 1}],
    ['+', { key: '=', shift: true, location: 1}],
    ['Q', { key: 'q', shift: true, location: 2}],
    ['W', { key: 'w', shift: true, location: 2}],
    ['E', { key: 'e', shift: true, location: 2}],
    ['R', { key: 'r', shift: true, location: 2}],
    ['T', { key: 't', shift: true, location: 2}],
    ['Y', { key: 'y', shift: true, location: 1}],
    ['U', { key: 'u', shift: true, location: 1}],
    ['I', { key: 'i', shift: true, location: 1}],
    ['O', { key: 'o', shift: true, location: 1}],
    ['P', { key: 'p', shift: true, location: 1}],
    ['{', { key: '[', shift: true, location: 1}],
    ['}', { key: ']', shift: true, location: 1}],
    ['|', { key: '\\', shift: true, location: 1}],
    ['A', { key: 'a', shift: true, location: 2}],
    ['S', { key: 's', shift: true, location: 2}],
    ['D', { key: 'd', shift: true, location: 2}],
    ['F', { key: 'f', shift: true, location: 2}],
    ['G', { key: 'g', shift: true, location: 2}],
    ['H', { key: 'h', shift: true, location: 1}],
    ['J', { key: 'j', shift: true, location: 1}],
    ['K', { key: 'k', shift: true, location: 1}],
    ['L', { key: 'l', shift: true, location: 1}],
    [':', { key: ';', shift: true, location: 1}],
    ['"', { key: '\'', shift: true, location: 1}],
    ['Z', { key: 'z', shift: true, location: 2}],
    ['X', { key: 'x', shift: true, location: 2}],
    ['C', { key: 'c', shift: true, location: 2}],
    ['V', { key: 'v', shift: true, location: 2}],
    ['B', { key: 'b', shift: true, location: 1}],
    ['N', { key: 'n', shift: true, location: 1}],
    ['M', { key: 'm', shift: true, location: 1}],
    ['<', { key: ',', shift: true, location: 1}],
    ['>', { key: '.', shift: true, location: 1}],
    ['?', { key: '/', shift: true, location: 1}],
]);
    

export class KeyboardComponent {
    element: HTMLElement;
    keysList: Map<string, KeyComponent[]> = new Map();
    highlightKeys: KeyComponent[] = [];
    _activeAction: KeyboardAction;
    _lastShiftLocation: number = 0;
    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('keyboard');
        KEYBOARD_CONFIG.forEach((row) => {
            const rowElement = document.createElement('div');
            rowElement.classList.add('row');
            row.forEach((keyConfig) => {
                const key = new KeyComponent(keyConfig.key, keyConfig.subKey, keyConfig.hasSubKey);
                rowElement.appendChild(key.element);

                if(!this.keysList.has(keyConfig.key.toLocaleLowerCase())) {
                    this.keysList.set(keyConfig.key.toLocaleLowerCase(), [key]);
                    if(keyConfig.hasSubKey) {
                        this.keysList.set(keyConfig.subKey.toLocaleLowerCase(), [key]);
                    }
                } else {
                    this.keysList.get(keyConfig.key.toLocaleLowerCase()).push(key);
                }
            });
            this.element.appendChild(rowElement);
        });
    }

    highlightKey(key: string, keyLocation: number = 0, isHighlight: boolean = true) {

        if(['control', 'meta'].indexOf(key.toLocaleLowerCase()) !== -1) {
            key = 'Ctrl';
        }

        const keyComponents = this.keysList.get(key.toLocaleLowerCase());
        let keyComponent: KeyComponent;
        if(!keyComponents || keyComponents.length === 0) return;
        if(keyLocation === 0) {
            keyComponent = keyComponents[0];
        } else {
            keyComponent = keyComponents[keyLocation - 1];
        }

        if(isHighlight && this.highlightKeys.indexOf(keyComponent) === -1) {
            this.highlightKeys.push(keyComponent);
        } else if(!isHighlight) {
            const index = this.highlightKeys.indexOf(keyComponent);
            if(index !== -1) {
                this.highlightKeys.splice(index, 1);
            }
        }

        keyComponent.highlight = isHighlight;
    }

    hightLightKeysByAction(actionWord: string) {
        
        this.highlightKeys.forEach((key) => key.highlight = false);
        this.highlightKeys = [];

        const actionConfig: KeyboardAction = KEYBOARD_ACTIONS.get(actionWord);
        if(!actionConfig) return;

        this._activeAction = actionConfig;
        this._activeAction.keyResult = actionWord;

        if(actionConfig.shift) {
            this.highlightKey('Shift', actionConfig.location, true);
        }

        if(actionConfig.key) {
            this.highlightKey(actionConfig.key, 0, true);
        }
    }

    checkAction(event: KeyboardEvent) {
        //记录最后一次点击的shift键的位置
        if(event.key === 'Shift') {
            this._lastShiftLocation = event.location;
        }

        if(this._activeAction.shift === true) {
            if(event.shiftKey === true && this._activeAction.location === this._lastShiftLocation && event.key === this._activeAction.keyResult) {
                return true;
            }
        } else {
            if(event.key === this._activeAction.keyResult) {
                return true;
            }
        }

        return false;
    }
}