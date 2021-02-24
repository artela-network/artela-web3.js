import { prompt } from 'blessed'

export class ValidatorPrompt {
    screenInstance: any
    rawElement: any

    constructor(screenInstance: any) {
        this.screenInstance = screenInstance
        this.rawElement = prompt({
            parent: screenInstance,
            border: 'line',
            height: 'shrink',
            width: 'half',
            top: 'center',
            left: 'center',
            label: ' {green-fg}Add Validator{/green-fg} ',
            tags: true,
            keys: true,
            inputOnFocus: false
        })
    }

    showPrompt() {
        return new Promise(async (resolve, reject) => {
            this.rawElement.setFront()
            this.rawElement.readInput('Enter Validator Public Key or Index', (err: string, value: string) => {
                if (err !== null) return reject(err)
                this.hidePrompt()
                resolve(value)
            });
        })
    }

    hidePrompt() {
        this.rawElement.hide()
        this.screenInstance.render() 
    }
}
