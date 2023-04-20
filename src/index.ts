import * as _ from 'lodash';
import './styles/style.css';

import { FingeringPracticedComponent, FingeringPracticedEvent, StyleModes } from './fingering-practiced-component';
import { DisplayConfigInterface } from './display-config';
import { MyModal } from './my-modal';

function main() {

    document.querySelector('.loading').remove();

    const resultModal = new MyModal([
        { label: '< Replay', className: 'replay-btn', callback: () => replay() },
        { label: 'Next >', className: 'next-btn', callback: () => next() },
    ]);
    document.body.appendChild(resultModal.element);

    const styleMode = getQueryString('style') || 'vintage';
    const app = new FingeringPracticedComponent(styleMode);
    document.body.appendChild(app.element);

    const configs: DisplayConfigInterface[] = [
            {
                size: 3,
                pages: [
                    `Hello World!\n`,
                    `Getting Start!\n`,
                ],
            },
            {
                size: 1.7,
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
        openModal(event.detail.timeElapsed / 1000, event.detail.rightRate * 100);
    });

    app.setContent(configs[num]);

    const styleSelect = document.getElementById('style-select') as HTMLSelectElement;

    StyleModes.forEach((value, key) => {
        const option = document.createElement('option');
        option.value = key;
        option.innerText = key;
        styleSelect.appendChild(option);
        console.log(key, styleMode)
        if(key.toLowerCase() === styleMode.toLowerCase()) {
            option.selected = true;
        }
    });

    styleSelect.addEventListener('change', (event: Event) => 
        app.changeStyleMode((event.target as HTMLSelectElement).value));


    function openModal(timeElapsed: number, rightRate: number) {
        resultModal.setContent(`
        <p>Congratulations!</p>
        <p>You finished the game!</p>
        <p class="rate" >Right Rate: <span id="right-rate">${ Math.round(rightRate).toString() }</span>%</p>
        <p class="rate" >Time Elapsed: <span id="time-elapsed">${ Math.round(timeElapsed).toString() }</span> seconds</p>
        `);

        resultModal.show();
    }
    function next() {
        resultModal.hide()
            .then(() => {
                num = (num + 1) % configs.length;
                app.setContent(configs[num]);
            });
    }

    function replay() {
        resultModal.hide()
            .then(() => app.setContent(configs[num]));
    }
};


function loadFonts(): Promise<FontFace[]> {

    const fontUrls: { url:string, name: string }[] = [
        { url: './fonts/Courier-New-Regular.ttf', name: 'Courier New' },
        { url: './fonts/Cyberion-Regular.ttf', name: 'Cyberion' },
        { url: './fonts/Gasping.ttf', name: 'Gasping' },
        { url: './fonts/Verdana-Regular.ttf', name: 'Verdana' },
    ];

    return Promise.all(fontUrls.map(item => {
        const font = new FontFace(item.name, `url(${item.url})`);
        return font.load()
            .then(f => {
                console.log('font loaded', f);
                (document.fonts as any).add(f);
                return f;
            });
    }));

}


function getQueryString(name: string, search: string = null): string | null {
    try {
        search = search ||  window.location.search.substr(1) || window.location.hash.split("?")[1];
        let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        let r = search.match(reg);
        if (r != null) return  unescape(r[2]); return null;
    } catch (e) {
        return null;
    }
  }

window.onload = () => {
    loadFonts().then(() => main());
};




