import { loading } from 'blessed'

export class LoadingScreen {
    screenInstance: any
    rawElement: any
    bgBlack: any

    constructor(screenInstance: any) {
        this.screenInstance = screenInstance
        this.rawElement = loading({
            parent: screenInstance,
            border: 'line',
            height: '25%',
            width: '25%',
            top: 'center',
            left: 'center',
            align: 'center'
        })
    }

    start() {
        if (this.rawElement !== undefined) this.rawElement.load()
    }

    stop() {
        if (this.rawElement !== undefined) this.rawElement.stop()
    }
}
