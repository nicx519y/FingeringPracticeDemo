import { words } from "lodash";

export interface DisplayConfigInterface {
    size: number,
    pages: string[],
};

export interface DisplayViewModel {
    size: number,
    words: string[],
    wordsLengthAllPage: number[],
    pages: {
        rows: {
            words: string,
        }[],
    }[],
}

export class DisplayConfig {

    _originalConfig: DisplayConfigInterface;

    constructor(config: DisplayConfigInterface) {
        this._originalConfig = config;
    }

    //将原始配置转换为可用于渲染的配置
    parseToViewModel(): DisplayViewModel {
        const config = this._originalConfig;

        const pages = config.pages.map((page) => {
            return {
                rows: page.replace(/\n/g, '↵\n').split('\n')
                .filter((row) => row.trim() !== '')
                .map((row) => { 
                    return { words: row.trim() }; 
                }),
            };
        });

        const words = pages.map(page => page.rows.map(row => row.words).join('')).join('').split('');

        return {
            size: config.size,
            words: words,
            wordsLengthAllPage: pages.map(page => page.rows.map(row => row.words).join('').length),
            pages: pages,
        };
    }
}