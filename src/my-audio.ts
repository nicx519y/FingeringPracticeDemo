export class MyAudio {
    _timer: any;
    _start: number;
    _end: number;
    _audio: HTMLAudioElement;
    constructor(src: string, start: number, end: number) {
        this._audio = new Audio(src);
        this._start = start;
        this._end = end;
        this._audio.load();
        this._audio.volume = 1;
    }

    play() {
        clearTimeout(this._timer);
        this._audio.currentTime = this._start;
        this._audio.play();
        this._timer = setTimeout(() => {
            this._audio.pause();
        }, (this._end - this._start) * 1000);
    }
}