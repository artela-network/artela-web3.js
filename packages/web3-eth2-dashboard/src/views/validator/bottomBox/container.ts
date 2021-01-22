import { box } from 'blessed'

import { ConnectedBox } from './connected'
import { ControlsBox } from './controls'
import { VersionBox } from './version'

export class BottomContainerBox {
    providerUrl: string
    connected: boolean
    rawElement: any
    connectedBox: any
    controlsBox: any
    versionBox: any

    constructor(providerUrl: string, connected: boolean = false) {
        this.providerUrl = providerUrl
        this.connected = connected
        this.rawElement = box({
            top: '94%',
            width: '100%',
            height: '7%',
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
        this.initConnectedBox()
        this.initControlsBox()
        this.initVersionBox()
    }

    initConnectedBox() {
        if (this.connectedBox === undefined) {
            this.connectedBox = new ConnectedBox(this.providerUrl, this.connected)
            this.rawElement.append(this.connectedBox.rawElement)
        }
    }

    initControlsBox() {
        if (this.controlsBox === undefined) {
            this.controlsBox = new ControlsBox()
            this.rawElement.append(this.controlsBox.rawElement)
        }
    }

    initVersionBox() {
        if (this.versionBox === undefined) {
            this.versionBox = new VersionBox()
            this.rawElement.append(this.versionBox.rawElement)
        }
    }
}