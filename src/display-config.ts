import { words } from "lodash";

export interface DisplayConfigInterface {
    size: number,
    pages: string[],
};

export interface DisplayViewModel {
    size: number,
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
        return {
            size: config.size,
            pages: config.pages.map((page) => {
                return {
                    rows: page.replace(/\n/g, '↵\n').split('\n')
                    .filter((row) => row.trim() !== '')
                    .map((row) => { 
                        return { words: row.trim() }; 
                    }),
                };
            }),
        };
    }

    //获取每一页的字数
    getWordsCountAllPage(): number[] {
        const config = this._originalConfig;
        return config.pages.map((page) => page.replace(/\n/g, '↵').length);
    }

    //获取所有字
    parseToWords(): string[] {
        const config = this._originalConfig;
        return config.pages.map((page) => page.replace(/\n/g, '↵')).join('').split('');
    }
}