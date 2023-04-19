export class AnimationIterator {

    eles: NodeListOf<HTMLElement>;
    _delay: number;

    constructor(
        eles: NodeListOf<HTMLElement>, 
        duration: number = 0, 
        ) {
        this.eles = eles;
        this._delay = duration / eles.length;

    }

    run(
        doSamething: (ele: HTMLElement, i: number) => void,
        whenComplete?: (ele: HTMLElement, i: number) => void,
        ): Promise<NodeListOf<HTMLElement>> {

        return new Promise((resolve, reject) => {
            let i = 0;
            const len = this.eles.length;
            const timer = setInterval(() => {
                if (i >= len) {
                    clearInterval(timer);
                    resolve(this.eles);
                } else {
                    const  ele = this.eles[i];
                    if(whenComplete) {
                        ele.addEventListener('animationend', () => whenComplete(ele, i), { once: true });
                    }
                    doSamething(ele, i);
                    i++;
                }
            }, this._delay);
        });
    }

}