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
        order: 'asc' | 'desc' | 'random' = 'asc',
        ): Promise<NodeListOf<HTMLElement>> {

        return new Promise((resolve, reject) => {
            let i = 0;
            let eleArr = Array.from(this.eles);

            if(order === 'random') {
                eleArr = shuffle(eleArr);
            } else if(order === 'desc') {
                eleArr = desc(eleArr);
            }

            const len = eleArr.length;
            const timer = setInterval(() => {
                if (i >= len) {
                    clearInterval(timer);
                    resolve(this.eles);
                } else {
                    const  ele = eleArr[i];
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

function shuffle(arr: any[]): any[] {
    var l = arr.length
    var index, temp
    while(l>0){
        index = Math.floor(Math.random()*l)
        temp = arr[l-1]
        arr[l-1] = arr[index]
        arr[index] = temp
        l--
    }
    return arr;
}

function desc(arr: any[]): any[] {
    return arr.reverse();
}