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
            keys: true,
            inputOnFocus: false
        })
    }

    showPrompt() {
        this.rawElement.setFront()
        const foo = this.rawElement.input('Enter Validator Public Key or Index', (err: string, value: string) => {
            if (err !== null) throw err
            console.log(err, value)
            // this.hidePrompt()
            return value
        });
        console.log('FOO', foo)
    }

    hidePrompt() {
        this.rawElement.hide()
        this.screenInstance.render() 
    }
}
