import { form, box, button } from 'blessed'

import { Validator } from '../../../types'

export class ValidatorDeletePrompt {
    screenInstance: any
    rawElement: any
    rawElementQuestion: any
    rawElementConfirm: any
    rawElementCancel: any

    constructor(screenInstance: any) {
        this.screenInstance = screenInstance
        this.rawElement = form({
            parent: screenInstance,
            border: 'line',
            height: '20%',
            width: 'half',
            top: 'center',
            left: 'center',
            label: '',
            tags: true,
            keys: true,
        })

        this.rawElementQuestion = box({
            parent: this.rawElement,
            height: '10%',
            width: '99%',
            top: '30%',
            left: 'center',
            content: '',
            tags: true,
            keys: true,
            style: {
                color: 'white'
            },
            padding: 0
        })

        this.rawElementCancel = button({
            parent: this.rawElement,
            mouse: true,
            keys: true,
            name: 'cancel',
            border: 'line',
            height: '30%',
            width: '49%',
            top: '50%',
            left: '1%',
            content: '{center}Cancel{/center}',
            tags: true,
            style: {
                fg: 'white',
                focus: {
                    fg: 'yellow'
                }
            },
            padding: 0
        })

        this.rawElementConfirm = button({
            parent: this.rawElement,
            mouse: true,
            keys: true,
            name: 'confirm',
            border: 'line',
            height: '30%',
            width: '49%',
            top: '50%',
            left: '51%',
            content: '{center}Confirm{/center}',
            tags: true,
            style: {
                fg: 'white',
                focus: {
                    fg: 'red'
                }
            },
            padding: 0
        })

        this.rawElementCancel.on('press', () => this.submitPrompt())
        this.rawElementConfirm.on('press', () => this.submitPrompt())
    }

    static getPromptQuestion(validator: Validator): string {
        return validator.alias ? `{center}{red-fg}Delete validator:{/red-fg} ${validator.alias}{/center}` :
            `{center}{red-fg}Delete validator:{/red-fg} ${validator.pubKey.substr(0,11)}...${validator.pubKey.substr(12,11)}{/center}`
    }

    showPrompt(validator: Validator) {
        return new Promise(async (resolve, reject) => {
            this.rawElementQuestion.setContent(ValidatorDeletePrompt.getPromptQuestion(validator))
            this.screenInstance.render()
            this.rawElementCancel.focus()
            this.rawElement.on('submit', (data: any) => resolve(data.cancel ? false : true))
        })
    }

    submitPrompt() {
        this.rawElement.submit()
        this.hidePrompt()
    }

    hidePrompt() {
        this.rawElement.destroy()
        this.screenInstance.render() 
    }
}
