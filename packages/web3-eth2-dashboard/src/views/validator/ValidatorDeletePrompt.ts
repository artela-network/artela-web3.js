import { question } from 'blessed'

import { Validator } from '../../../types'

export class ValidatorDeletePrompt {
    screenInstance: any
    rawElement: any

    constructor(screenInstance: any) {
        this.screenInstance = screenInstance
        this.rawElement = question({
            parent: screenInstance,
            border: 'line',
            height: 'shrink',
            width: 'half',
            top: 'center',
            left: 'center',
            label: '',
            tags: true,
            keys: true
        })
    }

    static getPromptQuestion(validator: Validator): string {
        return validator.alias ? ` {red-fg}Delete validator: ${validator.alias}{/red-fg} ` :
            ` {red-fg}Delete validator: ${validator.pubKey.substr(0,11)}...${validator.pubKey.substr(12,11)}{/red-fg} `
    }

    showPrompt(validator: Validator) {
        return new Promise(async (resolve, reject) => {
            this.rawElement.ask(
                ValidatorDeletePrompt.getPromptQuestion(validator),
                (err: string, value: string) => {
                    if (err !== null) return reject(err)
                    this.hidePrompt()
                    resolve(value)
            });
        })
    }

    hidePrompt() {
        this.rawElement.destroy()
        this.screenInstance.render() 
    }
}
