import { KeyboardComponent } from './keyboard-component';
import { DisplayComponent } from './display-component';
import { DisplayConfigInterface } from './display-config-interface'

export class FingeringPracticedComponent {
  element: HTMLDivElement;
  keyboard: KeyboardComponent;
  display: DisplayComponent;
  words: string[] = [];
  _offset: number = 0;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('fingering-practiced');

    this.display = new DisplayComponent();
    this.keyboard = new KeyboardComponent();

    this.element.appendChild(this.keyboard.element);
    this.element.appendChild(this.display.element);

    document.body.addEventListener('keydown', this._checkAction);

    // document.body.addEventListener('keyup', (event) => {
    //   event.preventDefault();
    //   this.keyboard.highlightKey(event.key, event.location, false);
    // });
  }

  setContent(config: DisplayConfigInterface) {
    this.display.setContent(config);
    this.words = config.pages.reduce((acc, page) => {
      return acc.concat(page.rows.map((row) => row.words));
    }, []).join('').split('');
    this.wordOffset = 0;
  }

  _checkAction = (event: KeyboardEvent) => {
    event.preventDefault();
    if (this.keyboard.checkAction(event) === true) {
      this.wordOffset++;
      this.wordOffset === this.words.length && console.log('success');
      //success
    } else {
      console.log('error');
    }
  };

  set wordOffset(offset: number) {
    this.display.wordHighlightOffset = offset;
    this.keyboard.hightLightKeysByAction(this.words[offset]);
    this._offset = offset;
  }

  get wordOffset(): number {
    return this._offset;
  }
}