import * as _ from 'lodash';
import './style.css';

import { FingeringPracticedComponent, FingeringPracticedEvent } from './fingering-practiced-component';
import { DisplayConfigInterface } from './display-config';

(function main() {
    const app = new FingeringPracticedComponent();
    document.body.appendChild(app.element);

    const configs: DisplayConfigInterface[] = [
            {
                size: 50,
                pages: [
                    `ff qq ff gg hh kk ww\nWW JJ LL OO PP\n!@#$%^&*( )_+`
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
            console.log(num);
            app.setContent(configs[num]);
        } else {
            app.setContent(configs[num]);
        }
    });

    app.setContent(configs[num]);

})();



