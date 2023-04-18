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
        this._ele.addEventListener('keydown', this._keydownHandler);
        this._ele.addEventListener('keyup', this._keyupHandler);
    }

    set currAction(action: KeyboardAction) {
        this._currAction = action;
    }

    setKeyEvent(type: string, key: string, location: number) {
        if(type === 'fire') {
            this._fireKey(key, location);
        } else if(type === 'cancel') {
            this._cancelKey(key, location);
        }
    }
        
    _keyupHandler = (event: KeyboardEvent) => {
        event.preventDefault();
        this._cancelKey(event.key === 'Meta' ? 'Control' : event.key, event.location);
    }

    _keydownHandler = (event: KeyboardEvent) => {
        event.preventDefault();
        this._fireKey(event.key === 'Meta' ? 'Control' : event.key, event.location);
    }

    _fireKey(key: string, location: KeyboardControlLocation = KeyboardControlLocation.NONE) {

        if([KeyboardControlKey.CTRL, KeyboardControlKey.SHIFT, KeyboardControlKey.ALT].indexOf(key as KeyboardControlKey) !== -1) {
            this._currControlKey = key as KeyboardControlKey;
            this._currControlLocation = location;
        }

        if(!this._currAction) return;

        // 如果按的是控制键
        if([KeyboardControlKey.CTRL, KeyboardControlKey.SHIFT, KeyboardControlKey.ALT].indexOf(key as KeyboardControlKey) !== -1) {
            //如果当前动作需要控制键
            if(this._currAction.control !== KeyboardControlKey.NONE) {
                //如果按的不是当前需要的控制键
                if(this._currAction.control !== key || this._currAction.location !== location) {
                    //抛出错误事件
                    this.dispatchEvent(new CustomEvent(KeyboardActionEvent.WRONG, {
                        detail: { key: key }
                    }));
                }
            //如果当前动作不需要控制键
            } else {
                //如果当前动作的结果不是按的这个键
                if(this._currAction.keyResult !== key) {
                    //抛出错误事件
                    this.dispatchEvent(new CustomEvent(KeyboardActionEvent.WRONG, {
                        detail: { key: key }
                    }));
                //如果当前动作的结果是按的这个键
                } else {
                    //抛出正确事件
                    this.dispatchEvent(new CustomEvent(KeyboardActionEvent.RIGHT, {
                        detail: { key: key }
                    }));
                }
            }
        // 如果按的是非控制键
        } else {
            //如果当前动作的结果不是按的这个键
            if(this._currAction.keyResult !== key) {
                //如果当前控制键不是shift 或者 当前控制键的位置不是要求的控制键的位置
                if(this._currControlKey !== KeyboardControlKey.SHIFT || this._currControlLocation !== this._currAction.location) {
                    //抛出错误事件
                    this.dispatchEvent(new CustomEvent(KeyboardActionEvent.WRONG, {
                        detail: { key: key }
                    }));
                //如果当前控制键是shift 并且 当前控制键的位置是要求的控制键的位置 并且 当前动作的结果是按的这个键
                } else if(this._currAction.key === key) {
                    //抛出正确事件
                    this.dispatchEvent(new CustomEvent(KeyboardActionEvent.RIGHT, {
                        detail: { key: key }
                    }));
                }
            //如果当前动作的结果是按的这个键
            } else {
                //如果当前动作需要控制键
                if(this._currAction.control !== KeyboardControlKey.NONE) {
                    //如果当前动作的控制键和按的控制键不一致
                    if(this._currAction.control !== this._currControlKey || this._currAction.location !== this._currControlLocation) {
                        //抛出错误事件
                        this.dispatchEvent(new CustomEvent(KeyboardActionEvent.WRONG, {
                            detail: { key: key }
                        }));
                    //如果当前动作的控制键和按的控制键一致
                    } else {
                        //抛出正确事件
                        this.dispatchEvent(new CustomEvent(KeyboardActionEvent.RIGHT, {
                            detail: { key: key }
                        }));
                    }
                //如果当前动作不需要控制键
                } else {
                    //抛出正确事件
                    this.dispatchEvent(new CustomEvent(KeyboardActionEvent.RIGHT, {
                        detail: { key: key }
                    }));
                }
            }
        }
    }

    _cancelKey(key: string, location: KeyboardControlLocation = KeyboardControlLocation.NONE) {
        if([KeyboardControlKey.CTRL, KeyboardControlKey.SHIFT, KeyboardControlKey.ALT].indexOf(key as KeyboardControlKey) !== -1) {
            this._currControlKey = KeyboardControlKey.NONE;
            this._currControlLocation = KeyboardControlLocation.NONE;
        }
    }

}