import * as _ from 'lodash';
import './style.css';

import { KeyboardComponent } from './keyboard-component';

(function main() {
    const paper = document.createElement('div');
    const keyboard = new KeyboardComponent();
    document.body.appendChild(paper);
    document.body.appendChild(keyboard.element);

    document.body.addEventListener('keydown', (event) => {
        event.preventDefault();
        console.log(event.key);
        console.log(event.location);

        let keyString = '';
        event.key.toLocaleLowerCase() === 'meta' ? keyString = 'Ctrl' : keyString = event.key;
        keyboard.highlightKey(keyString, event.location);
    });

    document.body.addEventListener('keyup', (event) => {
        event.preventDefault();

        let keyString = '';
        event.key.toLocaleLowerCase() === 'meta' ? keyString = 'Ctrl' : keyString = event.key;
        keyboard.highlightKey(keyString, event.location, false);
    });
})()


