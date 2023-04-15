import * as _ from 'lodash';
import './styles/style.css';

import { FingeringPracticedComponent, FingeringPracticedEvent, KeyboardStyleMode, DisplayStyleMode } from './fingering-practiced-component';
import { DisplayConfigInterface } from './display-config';

function main() {
    const app = new FingeringPracticedComponent();
    document.body.appendChild(app.element);

    const configs: DisplayConfigInterface[] = [
            {
                size: 50,
                pages: [
                    `ff qq ff gg hh kk ww\nWW JJ LL OO PP\n!@#$%^&*( )_+`
                ],
            },
            {
                size: 20,
                pages: [
                    `If I could save time in a bottle\nThe first thing that I'd like to do\nIs to save every day till eternity passes away\nJust to spend them with you.`,
                ],
            },
            {
                size: 20,
                pages: [
                    `Thank you for comforting me when I'm sad\nThank you for being there when I'm mad\nThank you for being my friend\nThank you for being there till the end.`,
                ],
            }
        ];

    let num: number = 0;

    app.addEventListener(FingeringPracticedEvent.Complete, (event: CustomEvent) => {
        console.log('complete', event.detail.timeElapsed, event.detail.rightRate);
        const result: boolean = window.confirm(`
            恭喜完成测试
            耗时：${Math.round(event.detail.timeElapsed / 1000)} 秒，正确率：${Math.round(event.detail.rightRate * 100)}%
        `);

        if(result === true) {
            num = (num + 1) % configs.length;
            app.setContent(configs[num]);
        } else {
            app.setContent(configs[num]);
        }
    });

    app.setContent(configs[num]);

    const keyboardStyleSelect = document.getElementById('keyboard-style-select') as HTMLSelectElement;
    const displayStyleSelect = document.getElementById('display-style-select') as HTMLSelectElement;

    KeyboardStyleMode.forEach((value, key) => {
        const option = document.createElement('option');
        option.value = value;
        option.innerText = key;
        keyboardStyleSelect.appendChild(option);
    });

    DisplayStyleMode.forEach((value, key) => {
        const option = document.createElement('option');
        option.value = value;
        option.innerText = key;
        displayStyleSelect.appendChild(option);
    });

    keyboardStyleSelect.addEventListener('change', (event: Event) => 
        app.changeKeyboardStyleMode((event.target as HTMLSelectElement).value));
    
    displayStyleSelect.addEventListener('change', (event: Event) => 
        app.changeDisplayStyleMode((event.target as HTMLSelectElement).value));

};

window.onload = () => main();



