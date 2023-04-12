import * as _ from 'lodash';
import './style.css';

import { FingeringPracticedComponent } from './fingering-practiced-component';
import { DisplayConfigInterface } from './display-config-interface';

(function main() {
    const app = new FingeringPracticedComponent();
    document.body.appendChild(app.element);

    const config: DisplayConfigInterface = {
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
    }

    app.setContent(config);
})()


