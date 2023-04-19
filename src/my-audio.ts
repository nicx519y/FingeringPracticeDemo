export class MyAudio {
    _timer: any;
    _start: number;
    _end: number;
    _audio: HTMLAudioElement;
    _canplay: boolean;
    constructor(src: string, start: number, end: number) {
        this._audio = new Audio(src);
        this._start = start;
        this._end = end;
        this._audio.addEventListener('canplay', () => this._canplay = true, { once: true });
        this._audio.load();
        this._audio.volume = 1;
    }

    play() {
        if(!this._canplay) return;
        clearTimeout(this._timer);
        this._audio.currentTime = this._start;
        this._audio.play();
        this._timer = setTimeout(() => {
            this._audio.pause();
        }, (this._end - this._start) * 1000);
    }
}