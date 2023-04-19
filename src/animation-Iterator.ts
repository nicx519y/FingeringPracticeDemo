export class AnimationIterator {

    eles: NodeListOf<Element>;
    _delay: number;

    constructor(eles: NodeListOf<Element>, duration: number = 0) {
        this.eles = eles;
        this._delay = duration / eles.length;
    }

    run(doSamething: (ele: Element, i: number) => void): Promise<NodeListOf<Element>> {
        return new Promise((resolve, reject) => {
            let i = 0;
            const len = this.eles.length;
            const timer = setInterval(() => {
                if (i >= len) {
                    clearInterval(timer);
                    resolve(this.eles);
                } else {
                    doSamething(this.eles[i], i);
                    i++;
                }
            }, this._delay);
        });
    }
}