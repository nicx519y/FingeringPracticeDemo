import * as _ from 'lodash';
import './style.css';

import { FingeringPracticedComponent, FingeringPracticedEvent } from './fingering-practiced-component';
import { DisplayConfigInterface } from './display-config-interface';

(function main() {
    const app = new FingeringPracticedComponent();
    document.body.appendChild(app.element);

    const configs: DisplayConfigInterface[] = [
        {
            size: 50,
            pages: [
                {
                    rows: [
                        {
                            words: 'QwerTy234uiop',
                        },
                        {
                            words: 'a%&sdfghjkl',
                        },
                        {
                            words: 'zxcvbnm',
                        }
                    ]
                },
                {
                    rows: [
                        {
                            words: '123',
                        }
                    ]
                }
            ],
        },
        {
            size: 60,
            pages: [
                {
                    rows: [
                        {
                            words: 'ff qq ff gg hh kk ww',
                        }
                    ],
                }, 
                {
                    rows: [
                        {
                            words: 'WW JJ LL OO PP',
                        }
                    ],
                },
                {
                    rows: [
                        {
                            words: '!@#$%^&*( )_+',
                        }
                    ]
                }
            ]
        },
        {
            size: 20,
            pages: [
                {
                    rows: [
                        {
                            words: 'If you were a teardrop;In my eye,',
                        },
                        // {
                        //     words: 'For fear of losing you,I would never cry.',
                        // },
                        // {
                        //     words: 'And if the golden sun,Should cease to shine its light,',
                        // },
                        // {
                        //     words: 'Just one smile from you,Would make my whole world bright.',
                        // }
                    ],
                }, 
            ]
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



