import { DelegatedEventTarget } from './delegated-event-target';

export interface KeyboardAction {
    key: string;
    control: KeyboardControlKey;
    location: KeyboardControlLocation;
    keyResult: string;
}

export enum KeyboardActionEvent {
    RIGHT = 'right',
    WRONG = 'wrong',
}

export enum KeyboardControlKey {
    CTRL = 'Control',
    SHIFT = 'Shift',
    ALT = 'Alt',
    NONE = 'none',
}

export enum KeyboardControlLocation {
    NONE = 0,
    LEFT = 1,
    RIGHT = 2,
}

export class KeyboardActionComponent extends DelegatedEventTarget {

    _ele: HTMLElement;
    _currAction: KeyboardAction;
    _currControlLocation: KeyboardControlLocation = KeyboardControlLocation.NONE;
    _currControlKey: KeyboardControlKey = KeyboardControlKey.NONE;

    constructor() {
        super();
        this._ele = document.body;
    }

    start() {
        this._ele.addEventListener('keydown', this._keydownHandler);
        this._ele.addEventListener('keyup', this._keyupHandler);
    }

    end() {
        this._ele.removeEventListener('keydown', this._keydownHandler);
        this._ele.removeEventListener('keyup', this._keyupHandler);
    }

    set currAction(action: KeyboardAction) {
        this._currAction = action;
    }

    _keyupHandler = (event: KeyboardEvent) => {
        event.preventDefault();

        const key: String = event.key === 'Meta' ? 'Control' : event.key;

        if([KeyboardControlKey.CTRL, KeyboardControlKey.SHIFT, KeyboardControlKey.ALT].indexOf(key as KeyboardControlKey) !== -1) {
            this._currControlKey = KeyboardControlKey.NONE;
            this._currControlLocation = KeyboardControlLocation.NONE;
        }
    }

    _keydownHandler = (event: KeyboardEvent) => {
        event.preventDefault();

        const key: String = event.key === 'Meta' ? 'Control' : event.key;
        
        // console.log(`keydown: currAction`, this._currAction, `key - ${key}`);

        if([KeyboardControlKey.CTRL, KeyboardControlKey.SHIFT, KeyboardControlKey.ALT].indexOf(key as KeyboardControlKey) !== -1) {
            this._currControlKey = key as KeyboardControlKey;
            this._currControlLocation = event.location as KeyboardControlLocation;
        }

        if(!this._currAction) return;

        if([KeyboardControlKey.CTRL, KeyboardControlKey.SHIFT, KeyboardControlKey.ALT].indexOf(key as KeyboardControlKey) !== -1) {
            if(this._currAction.control !== KeyboardControlKey.NONE) {
                if(this._currAction.control !== key || this._currAction.location !== event.location) {
                    this.dispatchEvent(new CustomEvent(KeyboardActionEvent.WRONG, {
                        detail: { key: key }
                    }));
                }
            } else {
                if(this._currAction.keyResult !== key) {
                    this.dispatchEvent(new CustomEvent(KeyboardActionEvent.WRONG, {
                        detail: { key: key }
                    }));
                } else {
                    this.dispatchEvent(new CustomEvent(KeyboardActionEvent.RIGHT, {
                        detail: { key: key }
                    }));
                }
            }
        } else {
            if(this._currAction.keyResult !== key) {
                this.dispatchEvent(new CustomEvent(KeyboardActionEvent.WRONG, {
                    detail: { key: key }
                }));
            } else {
                if(this._currAction.control !== KeyboardControlKey.NONE) {
                    if(this._currAction.control !== this._currControlKey || this._currAction.location !== this._currControlLocation) {
                        this.dispatchEvent(new CustomEvent(KeyboardActionEvent.WRONG, {
                            detail: { key: key }
                        }));
                    } else {
                        this.dispatchEvent(new CustomEvent(KeyboardActionEvent.RIGHT, {
                            detail: { key: key }
                        }));
                    }
                } else {
                    this.dispatchEvent(new CustomEvent(KeyboardActionEvent.RIGHT, {
                        detail: { key: key }
                    }));
                }
            }
        }
    }
}