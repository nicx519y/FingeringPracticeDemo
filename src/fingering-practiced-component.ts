import wrongMp3 from './audios/wrong.mp3';
import keyMp3 from './audios/key.mp3';

import { KeyboardComponent } from './keyboard-component';
import { DisplayComponent } from './display-component';
import { DisplayConfigInterface, DisplayConfig, DisplayViewModel } from './display-config';
import { KeyboardActionEvent } from './keyboard-action-component';
import { DelegatedEventTarget } from './delegated-event-target';
import { MyAudio } from './my-audio';

export enum KeyboardStyleMode {
  VINTAGE = 'vintage-style',
  MAC = 'mac-style',
}

export enum DisplayStyleMode {
  TERMINAL = 'terminal-style',
  PAPER = 'paper-style',
}

export enum DisplayPageInEffect {
  NONE = 'none',
  FADE = 'fade',
  FLY = 'fly',
  FLOAT = 'float',
}

export enum DisplayPageOutEffect {
  NONE = 'none',
  FADE = 'fade',
  FLY = 'fly',
  FLOAT = 'float',
}

interface StyleMode {
  keyboard: KeyboardStyleMode;
  display: DisplayStyleMode;
  effectIn: DisplayPageInEffect;
  effectOut: DisplayPageOutEffect;
}

export const StyleModes: Map<string, StyleMode> = new Map([
  ['TERMINAL', { keyboard: KeyboardStyleMode.VINTAGE, display: DisplayStyleMode.TERMINAL, effectIn: DisplayPageInEffect.FLOAT, effectOut: DisplayPageOutEffect.FLOAT }],
  ['VINTAGE', { keyboard: KeyboardStyleMode.MAC, display: DisplayStyleMode.PAPER, effectIn: DisplayPageInEffect.FLY, effectOut: DisplayPageOutEffect.FLY }],
]);

export enum FingeringPracticedEvent {
  Right = 'Right',
  Wrong = 'Wrong',
  Complete = 'Complete',
}

export class FingeringPracticedComponent extends DelegatedEventTarget {
  element: HTMLDivElement;
  keyboard: KeyboardComponent;
  display: DisplayComponent;
  words: string[] = [];
  _offset: number = 0;
  _startTime: Date = new Date();
  _isStarted: boolean = false;
  _wrongCount: number = 0;
  _rightCount: number = 0;
  _wrongAudio: MyAudio = new MyAudio(wrongMp3, 0, 1);
  _keyAudio: MyAudio = new MyAudio(keyMp3, 1.115, 1.5);
  _currKeyboardStyleMode: KeyboardStyleMode = KeyboardStyleMode.VINTAGE;
  _currDisplayStyleMode: DisplayStyleMode = DisplayStyleMode.TERMINAL;
  _currPageInEffectMode: DisplayPageInEffect = DisplayPageInEffect.FLOAT;
  _currPageOutEffectMode: DisplayPageOutEffect = DisplayPageOutEffect.FLOAT;

  _currStyleMode: string = 'TERMINAL';

  constructor() {
    super();
    this.element = document.createElement('div');
    this.element.classList.add('fingering-practiced');

    this.display = new DisplayComponent();
    this.keyboard = new KeyboardComponent();

    this.keyboard.action.addEventListener(KeyboardActionEvent.RIGHT, this._keyboardRightHandler);
    this.keyboard.action.addEventListener(KeyboardActionEvent.WRONG, this._keyboardWrongHandler);

    this.element.appendChild(this.keyboard.element);
    this.element.appendChild(this.display.element);

    this.changeStyleMode(this._currStyleMode);
  }

  changeKeyboardStyleMode(mode: KeyboardStyleMode) {
    this.keyboard.element.classList.remove(this._currKeyboardStyleMode);
    this.keyboard.element.classList.add(mode);
    this._currKeyboardStyleMode = mode;
  }

  changeDisplayStyleMode(mode: DisplayStyleMode) {
    this.element.classList.remove(this._currDisplayStyleMode);
    this.element.classList.add(mode);
    this._currDisplayStyleMode = mode;
  }

  changePageInEffectMode(mode: DisplayPageInEffect) {
    this.display.element.classList.remove(`effect-${this._currPageInEffectMode}-in`);
    this.display.element.classList.add(`effect-${mode}-in`);
    this._currPageInEffectMode = mode;
  }

  changePageOutEffectMode(mode: DisplayPageOutEffect) {
    this.display.element.classList.remove(`effect-${this._currPageOutEffectMode}-out`);
    this.display.element.classList.add(`effect-${mode}-out`);
    this._currPageOutEffectMode = mode;
  }

  changeStyleMode(mode: string) {
    const m = StyleModes.get(mode);
    this.changeKeyboardStyleMode(m.keyboard);
    this.changeDisplayStyleMode(m.display);
    this.changePageInEffectMode(m.effectIn);
    this.changePageOutEffectMode(m.effectOut);
  }

  //设置显示区域内容
  setContent(config: DisplayConfigInterface) {
    this._isStarted = true;
    this._wrongCount = 0;
    this._rightCount = 0;

    const c: DisplayConfig = new DisplayConfig(config);

    this.display.setContent(c);
    this.words = c.parseToWords();
    this.wordOffset = 0;
    this._startTime = new Date();
  }

  //设置当前要输入的字符位置
  set wordOffset(offset: number) {
    if (this._isStarted === false) return;

    this.display.wordOffset = offset;
    this.keyboard.hightLightKeysByAction(this.words[offset]);
    this._offset = offset;
  }

  //获取当前要输入的字符位置
  get wordOffset(): number {
    return this._offset;
  }

  //获取耗时
  get timeElapsed(): number {
    return Date.now() - this._startTime.getTime();
  }

  //键盘输入正确事件
  _keyboardRightHandler = (event: CustomEvent) => {
    if (this._isStarted === false) return;

    this._rightCount++;

    this.dispatchEvent(new CustomEvent(FingeringPracticedEvent.Right, {
      detail: event.detail,
    }));
    this.wordOffset++;
    if (this.wordOffset === this.words.length) {
      this._isStarted = false;
      //完成事件，给出耗时和正确率
      setTimeout(() => {
        this.dispatchEvent(new CustomEvent(FingeringPracticedEvent.Complete, {
          detail: { timeElapsed: this.timeElapsed, rightRate: this._rightCount / (this._rightCount + this._wrongCount) }
        }));
      }, 300);
    }

    this._keyAudio.play();
  }

  //键盘输入错误事件
  _keyboardWrongHandler = (event: CustomEvent) => {
    if (this._isStarted === false) return;

    this._wrongCount++;

    this.dispatchEvent(new CustomEvent(FingeringPracticedEvent.Wrong, {
      detail: event.detail,
    }));

    //不是control键就提示错误内容
    this.display.wrongNotice(['shift', 'ctrl', 'control', 'alt', 'backspace', 'tab', 'enter', 'capslock'].indexOf(event.detail.key.toLowerCase()) < 0 ? event.detail.key : '');
    this._wrongAudio.play();
  }
}