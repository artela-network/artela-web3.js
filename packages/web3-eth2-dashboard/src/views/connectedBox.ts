import { box } from 'blessed'

export class ConnectedBox {
    connectedBox: any

    constructor(providerUrl: string, connected: boolean = false) {
        this.connectedBox = box({
            top: 'left',
            left: 'left',
            width: '25%',
            height: '6%',
            content: ConnectedBox.getConnectedString(providerUrl, connected),
            align: 'center',
            tags: true,
            border: {
                type: 'line'
            },
            style: {
                border: {
                fg: '#f0f0f0'
                }
            }
        })
    }

    static getConnectedString(providerUrl: string, connected: boolean): string {
        const prefix = connected ? '{green-fg}Connected{/} to' : '{red-fg}Disconnected{/} from'
        return `${prefix} ${providerUrl}`
    }

    getElement() {
        return this.connectedBox
    }
}