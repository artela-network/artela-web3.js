import { box } from 'blessed'

export class VersionBox {
    rawElement: any

    constructor() {
        this.rawElement = box({
            top: '25%',
            left: '66%',
            width: '33%',
            height: '30%',
            content: VersionBox.getVersionString(),
            align: 'right',
            tags: true,
        })
    }

    static getVersionString(): string {
        return 'Web3 ETH2 Dashboard {green-fg}v0.0.1{/}'
    }
}