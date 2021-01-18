import { box } from 'blessed'

export class ControlsBox {
    rawElement: any

    constructor() {
        this.rawElement = box({
            top: '25%',
            left: '34%',
            width: '33%',
            height: '30%',
            content: ControlsBox.getControlsString(),
            align: 'center',
            tags: true,
        })
    }

    static getControlsString(): string {
        return '{#257AFD-fg}1 - 6: Jump to Panel, esc/q: Exit, x: Menu, ᐊ ᐅ ᐃ ᐁ: Navigate{/}'
    }
}