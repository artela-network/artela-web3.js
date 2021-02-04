import { prompt } from 'blessed'

export class AddValidatorPrompt {
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
            keys: true
        })
    }

    showPrompt() {
        this.rawElement.setFront()
        this.rawElement.input('Enter Validator Public Key or Index', '', (err: string, value: string) => {
            console.log(err, value)
            this.hidePrompt()
        });
    }

    hidePrompt() {
        this.rawElement.hide()
        this.screenInstance.render()   
    }
}
