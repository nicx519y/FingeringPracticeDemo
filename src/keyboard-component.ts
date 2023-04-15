import { KeyComponent, KeyConfigInterface } from './key-component';
import { KeyboardAction, KeyboardActionComponent, KeyboardControlKey, KeyboardControlLocation } from './keyboard-action-component';

const KEYBOARD_CONFIG: KeyConfigInterface[][] = [
    [
        { key: '`', keyLabel: '`', subKey: '~', subKeyLabel: '~', hasSubKey: true },
        { key: '1', keyLabel: '1', subKey: '!', subKeyLabel: '!', hasSubKey: true },
        { key: '2', keyLabel: '2', subKey: '@', subKeyLabel: '@', hasSubKey: true },
        { key: '3', keyLabel: '3', subKey: '#', subKeyLabel: '#', hasSubKey: true },
        { key: '4', keyLabel: '4', subKey: '$', subKeyLabel: '$', hasSubKey: true },
        { key: '5', keyLabel: '5', subKey: '%', subKeyLabel: '%', hasSubKey: true },
        { key: '6', keyLabel: '6', subKey: '^', subKeyLabel: '^', hasSubKey: true },
        { key: '7', keyLabel: '7', subKey: '&', subKeyLabel: '&', hasSubKey: true },
        { key: '8', keyLabel: '8', subKey: '*', subKeyLabel: '*', hasSubKey: true },
        { key: '9', keyLabel: '9', subKey: '(', subKeyLabel: '(', hasSubKey: true },
        { key: '0', keyLabel: '0', subKey: ')', subKeyLabel: ')', hasSubKey: true },
        { key: '-', keyLabel: '-', subKey: '_', subKeyLabel: '_', hasSubKey: true },
        { key: '=', keyLabel: '=', subKey: '+', subKeyLabel: '+', hasSubKey: true },
        { key: 'Backspace', keyLabel: '←', subKey: '', subKeyLabel: '', hasSubKey: false },
    ],
    [
        { key: 'Tab', keyLabel: 'TAB', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'q', keyLabel: 'Q', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'w', keyLabel: 'W', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'e', keyLabel: 'E', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'r', keyLabel: 'R', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 't', keyLabel: 'T', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'y', keyLabel: 'Y', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'u', keyLabel: 'U', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'i', keyLabel: 'I', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'o', keyLabel: 'O', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'p', keyLabel: 'P', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: '[', keyLabel: '[', subKey: '{', subKeyLabel: '{', hasSubKey: true },
        { key: ']', keyLabel: ']', subKey: '}', subKeyLabel: '}', hasSubKey: true },
        { key: '\\', keyLabel: '\\', subKey: '|', subKeyLabel: '|', hasSubKey: true }
    ],
    [
        { key: 'CapsLock', keyLabel: 'CAPSLOCK', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'a', keyLabel: 'A', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 's', keyLabel: 'S', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'd', keyLabel: 'D', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'f', keyLabel: 'F', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'g', keyLabel: 'G', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'h', keyLabel: 'H', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'j', keyLabel: 'J', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'k', keyLabel: 'K', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'l', keyLabel: 'L', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: ';', keyLabel: ';', subKey: ':', subKeyLabel: ':', hasSubKey: true },
        { key: '\'', keyLabel: '\'', subKey: '&quot;', subKeyLabel: '&quot;', hasSubKey: true },
        { key: 'Enter', keyLabel: '↵', subKey: '', subKeyLabel: '', hasSubKey: false },
    ],
    [
        { key: 'Shift', keyLabel: 'SHIFT', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'z', keyLabel: 'Z', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'x', keyLabel: 'X', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'c', keyLabel: 'C', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'v', keyLabel: 'V', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'b', keyLabel: 'B', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'n', keyLabel: 'N', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'm', keyLabel: 'M', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: ',', keyLabel: ',', subKey: '<', subKeyLabel: '<', hasSubKey: true },
        { key: '.', keyLabel: '.', subKey: '>', subKeyLabel: '>', hasSubKey: true },
        { key: '/', keyLabel: '/', subKey: '?', subKeyLabel: '?', hasSubKey: true }, 
        { key: 'Shift', keyLabel: 'SHIFT', subKey: '', subKeyLabel: '', hasSubKey: false },
    ],
    [
        { key: 'Ctrl', keyLabel: 'CTRL', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'Alt', keyLabel: 'ALT', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: ' ', keyLabel: ' ', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'Alt', keyLabel: 'ALT', subKey: '', subKeyLabel: '', hasSubKey: false },
        { key: 'Ctrl', keyLabel: 'CTRL', subKey: '', subKeyLabel: '', hasSubKey: false },
    ]
];

const KEYBOARD_ACTIONS: Map<string, KeyboardAction> = new Map([
    ['`', { key: '`', keyResult: '`', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['1', { key: '1', keyResult: '1', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['2', { key: '2', keyResult: '2', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['3', { key: '3', keyResult: '3', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['4', { key: '4', keyResult: '4', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['5', { key: '5', keyResult: '5', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['6', { key: '6', keyResult: '6', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['7', { key: '7', keyResult: '7', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['8', { key: '8', keyResult: '8', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['9', { key: '9', keyResult: '9', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['0', { key: '0', keyResult: '0', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['-', { key: '-', keyResult: '-', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['=', { key: '=', keyResult: '=', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['Backspace', { key: 'Backspace', keyResult: '', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['Tab', { key: 'Tab', keyResult: '\t', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['q', { key: 'q', keyResult: 'q', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['w', { key: 'w', keyResult: 'w', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['e', { key: 'e', keyResult: 'e', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['r', { key: 'r', keyResult: 'r', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['t', { key: 't', keyResult: 't', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['y', { key: 'y', keyResult: 'y', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['u', { key: 'u', keyResult: 'u', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['i', { key: 'i', keyResult: 'i', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['o', { key: 'o', keyResult: 'o', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['p', { key: 'p', keyResult: 'p', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['[', { key: '[', keyResult: '[', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    [']', { key: ']', keyResult: ']', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['\\', { key: '\\', keyResult: '\\', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['CapsLock', { key: 'CapsLock', keyResult: '', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['a', { key: 'a', keyResult: 'a', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['s', { key: 's', keyResult: 's', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['d', { key: 'd', keyResult: 'd', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['f', { key: 'f', keyResult: 'f', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['g', { key: 'g', keyResult: 'g', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['h', { key: 'h', keyResult: 'h', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['j', { key: 'j', keyResult: 'j', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['k', { key: 'k', keyResult: 'k', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['l', { key: 'l', keyResult: 'l', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    [';', { key: ';', keyResult: ';', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['\'', { key: '\'', keyResult: '\'', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['Enter', { key: 'Enter', keyResult: 'Enter', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['Shift', { key: 'Shift', keyResult: 'Shift', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.LEFT }],
    ['z', { key: 'z', keyResult: 'z', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['x', { key: 'x', keyResult: 'x', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['c', { key: 'c', keyResult: 'c', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['v', { key: 'v', keyResult: 'v', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['b', { key: 'b', keyResult: 'b', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['n', { key: 'n', keyResult: 'n', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['m', { key: 'm', keyResult: 'm', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    [',', { key: ',', keyResult: ',', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['.', { key: '.', keyResult: '.', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['/', { key: '/', keyResult: '/', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['Shift', { key: 'Shift', keyResult: 'Shift', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.RIGHT }],
    ['Control', { key: 'Control', keyResult: 'Control', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.LEFT }],
    ['Alt', { key: 'Alt', keyResult: 'Alt', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.LEFT }],
    [' ', { key: ' ', keyResult: ' ', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
    ['Alt', { key: 'Alt', keyResult: 'Alt', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.RIGHT }],
    ['Control', { key: 'Control', keyResult: 'Control', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.RIGHT }],

    ['~', { key: '`', keyResult: '~', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.RIGHT }],
    ['!', { key: '1', keyResult: '!', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.RIGHT }],
    ['@', { key: '2', keyResult: '@', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.RIGHT }],
    ['#', { key: '3', keyResult: '#', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.RIGHT }],
    ['$', { key: '4', keyResult: '$', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.RIGHT }],
    ['%', { key: '5', keyResult: '%', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.RIGHT }],
    ['^', { key: '6', keyResult: '^', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.RIGHT }],
    ['&', { key: '7', keyResult: '&', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    ['*', { key: '8', keyResult: '*', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    ['(', { key: '9', keyResult: '(', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    [')', { key: '0', keyResult: ')', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    ['_', { key: '-', keyResult: '_', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    ['+', { key: '=', keyResult: '+', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    ['Q', { key: 'q', keyResult: 'Q', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.RIGHT }],
    ['W', { key: 'w', keyResult: 'W', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.RIGHT }],
    ['E', { key: 'e', keyResult: 'E', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.RIGHT }],
    ['R', { key: 'r', keyResult: 'R', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.RIGHT }],
    ['T', { key: 't', keyResult: 'T', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.RIGHT }],
    ['Y', { key: 'y', keyResult: 'Y', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    ['U', { key: 'u', keyResult: 'U', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    ['I', { key: 'i', keyResult: 'I', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    ['O', { key: 'o', keyResult: 'O', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    ['P', { key: 'p', keyResult: 'P', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    ['{', { key: '[', keyResult: '{', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    ['}', { key: ']', keyResult: '}', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    ['A', { key: 'a', keyResult: 'A', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.RIGHT }],
    ['S', { key: 's', keyResult: 'S', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.RIGHT }],
    ['D', { key: 'd', keyResult: 'D', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.RIGHT }],
    ['F', { key: 'f', keyResult: 'F', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.RIGHT }],
    ['G', { key: 'g', keyResult: 'G', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.RIGHT }],
    ['H', { key: 'h', keyResult: 'H', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    ['J', { key: 'j', keyResult: 'J', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    ['K', { key: 'k', keyResult: 'K', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    ['L', { key: 'l', keyResult: 'L', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    [':', { key: ';', keyResult: ':', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    ['"', { key: '\'', keyResult: '"', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    ['|', { key: '\\', keyResult: '|', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    ['Z', { key: 'z', keyResult: 'Z', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.RIGHT }],
    ['X', { key: 'x', keyResult: 'X', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.RIGHT }],
    ['C', { key: 'c', keyResult: 'C', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.RIGHT }],
    ['V', { key: 'v', keyResult: 'V', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.RIGHT }],
    ['B', { key: 'b', keyResult: 'B', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.RIGHT }],
    ['N', { key: 'n', keyResult: 'N', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    ['M', { key: 'm', keyResult: 'M', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    ['<', { key: ',', keyResult: '<', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    ['>', { key: '.', keyResult: '>', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    ['?', { key: '/', keyResult: '?', control: KeyboardControlKey.SHIFT, location: KeyboardControlLocation.LEFT }],
    ['↵', { key: 'Enter', keyResult: 'Enter', control: KeyboardControlKey.NONE, location: KeyboardControlLocation.NONE }],
]);
    

export class KeyboardComponent {
    element: HTMLElement;
    keysList: Map<string, KeyComponent[]> = new Map();
    highlightKeys: KeyComponent[] = [];
    _actionComponent: KeyboardActionComponent;
    _lastShiftLocation: number = 0;
    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('keyboard');
        KEYBOARD_CONFIG.forEach((row) => {
            const rowElement = document.createElement('div');
            rowElement.classList.add('row');
            row.forEach((keyConfig) => {
                const key = new KeyComponent(keyConfig);
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

        this._actionComponent = new KeyboardActionComponent();
        this._actionComponent.start();
    }

    get action(): KeyboardActionComponent {
        return this._actionComponent;
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
        this.action.currAction = null;

        const actionConfig: KeyboardAction = KEYBOARD_ACTIONS.get(actionWord);

        if(!actionConfig) return;

        this.action.currAction = actionConfig;

        if(actionConfig.control === KeyboardControlKey.SHIFT) {
            this.highlightKey('Shift', actionConfig.location, true);
        }

        if(actionConfig.key) {
            this.highlightKey(actionConfig.key, 0, true);
        }
    }
}