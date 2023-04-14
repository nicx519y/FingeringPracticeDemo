import wrongMp3 from './audios/wrong.mp3';
import keyMp3 from './audios/key.mp3';

import { KeyboardComponent } from './keyboard-component';
import { DisplayComponent } from './display-component';
import { DisplayConfigInterface } from './display-config-interface'
import { KeyboardActionEvent } from './keyboard-action-component';
import { DelegatedEventTarget } from './delegated-event-target';
import { MyAudio } from './my-audio';


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

  }

  setContent(config: DisplayConfigInterface) {
    this._isStarted = true;
    this._wrongCount = 0;
    this._rightCount = 0;

    this.display.setContent(config);
    this.words = config.pages.reduce((acc, page) => {
      return acc.concat(page.rows.map((row) => row.words));
    }, []).join('').split('');
    this.wordOffset = 0;
    this._startTime = new Date();
  }

  _keyboardRightHandler = (event: CustomEvent) => {
    if(this._isStarted === false) return;

    this._rightCount ++;

    this.dispatchEvent(new CustomEvent(FingeringPracticedEvent.Right, {
      detail: event.detail,
    }));
    this.wordOffset++;
    if(this.wordOffset === this.words.length) {
      this._isStarted = false;
      //完成事件，给出耗时和正确率
      setTimeout(() => {
        this.dispatchEvent(new CustomEvent(FingeringPracticedEvent.Complete, {
          detail: { timeElapsed: this.timeElapsed, rightRate: this._rightCount / (this._rightCount + this._wrongCount) }
        }));
      }, 500);
    }

    this._keyAudio.play();
  }

  _keyboardWrongHandler = (event: CustomEvent) => {
    if(this._isStarted === false) return;

    this._wrongCount ++;

    this.dispatchEvent(new CustomEvent(FingeringPracticedEvent.Wrong, {
      detail: event.detail,
    }));

    this.display.highlightActiveWord();
    this._wrongAudio.play();
  }

  set wordOffset(offset: number) {
    if(this._isStarted === false) return;

    this.display.wordOffset = offset;
    this.keyboard.hightLightKeysByAction(this.words[offset]);
    this._offset = offset;
  }

  get wordOffset(): number {
    return this._offset;
  }

  get timeElapsed(): number {
    return Date.now() - this._startTime.getTime();
  }
}