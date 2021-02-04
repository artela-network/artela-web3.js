import { prompt } from 'blessed'
import { promisify } from 'util'

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

    async showPrompt() {
        // return new Promise((resolve, reject) => {
        //     this.rawElement.setFront()
        //     this.rawElement.input('Enter Validator Public Key or Index', (err: string, value: string) => {
        //         if (err !== null) return reject(err)
        //         this.hidePrompt()
        //         resolve(value)
        //     });
        // })

        this.rawElement.setFront()
        return await this.rawElement.input('Enter Validator Public Key or Index', await promisify((err: string, value: string) => {
            if (err !== null) throw err
            this.hidePrompt()
            return value
        }));
    }

    hidePrompt() {
        this.rawElement.hide()
        this.screenInstance.render() 
    }
}
