import * as _ from 'lodash';
import './styles/style.css';

import { FingeringPracticedComponent, FingeringPracticedEvent, StyleModes } from './fingering-practiced-component';
import { DisplayConfigInterface } from './display-config';

function main() {
    const app = new FingeringPracticedComponent();
    document.body.appendChild(app.element);

    const configs: DisplayConfigInterface[] = [
            {
                size: 50,
                pages: [
                    `Hello World!\n`,
                    `Getting Start!\n`,
                ],
            },
            {
                size: 30,
                pages: [
                    `From fairest creatures we desire increase,\n`,
                    `That thereby beauty's rose might never die,\n`,
                    `But as the riper should by time decease,\n`,
                    `His tender heir might bear his memory:\n`,
                    `But thou contracted to thine own bright eyes,\n`,
                    `Feed'st thy light's flame with self-substantial fuel,\n`,
                    `Making a famine where abundance lies,\n`,
                    `Thy self thy foe, to thy sweet self too cruel.\n`,
                    `Thou that art now the world's fresh ornament,\n`,
                    `And only herald to the gaudy spring,\n`,
                    `Within thine own bud buriest thy content,\n`,
                    `And tender churl mak'st waste in niggarding:\n`,
                    `Pity the world, or else this glutton be,\n`,
                    `To eat the world's due, by the grave and thee.\n`,

                ],
            },
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

    const styleSelect = document.getElementById('style-select') as HTMLSelectElement;

    StyleModes.forEach((value, key) => {
        const option = document.createElement('option');
        option.value = key;
        option.innerText = key;
        styleSelect.appendChild(option);
    });

    styleSelect.addEventListener('change', (event: Event) => 
        app.changeStyleMode((event.target as HTMLSelectElement).value));

};

window.onload = () => main();



