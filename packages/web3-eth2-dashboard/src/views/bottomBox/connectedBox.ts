import { box } from 'blessed'

export class ConnectedBox {
    rawElement: any

    constructor(providerUrl: string, connected: boolean = false) {
        this.rawElement = box({
            top: '25%',
            left: '1%',
            width: '33%',
            height: '30%',
            content: ConnectedBox.getConnectedString(providerUrl, connected),
            align: 'left',
            tags: true,
        })
    }

    static getConnectedString(providerUrl: string, connected: boolean): string {
        const prefix = connected ? '{green-fg}Connected{/} to' : '{red-fg}Disconnected{/} from'
        return `${prefix} ${providerUrl}`
    }
}