import { form, box, textbox } from 'blessed'

import { Validator } from '../../../types'

export class ValidatorForm {
    screenInstance: any
    rawElement: any
    rawElementPubKeyHeader: any
    rawElementPubKeyInput: any
    rawElementAliasHeader: any
    rawElementAliasInput: any

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

        this.rawElementPubKeyHeader = box({
            parent: this.rawElement,
            height: '10%',
            width: '99%',
            top: '30%',
            left: 'center',
            content: 'Validator Public Key or Index',
            style: {
                color: 'white'
            },
            padding: 0
        })

        this.rawElementPubKeyInput = textbox({
            parent: this.rawElement,
            height: '10%',
            width: '99%',
            top: '40%',
            left: 'center',
            tags: true,
            style: {
                bg: 'grey',
                color: 'white'
            },
            inputOnFocus: true,
            padding: 0
        })

        this.rawElementAliasHeader = box({
            parent: this.rawElement,
            height: '10%',
            width: '99%',
            top: '55%',
            left: 'center',
            content: 'Alias',
            style: {
                color: 'white'
            },
            padding: 0
        })

        this.rawElementAliasInput = textbox({
            parent: this.rawElement,
            height: '10%',
            width: '99%',
            top: '65%',
            left: 'center',
            tags: true,
            style: {
                bg: 'grey',
                color: 'white'
            },
            inputOnFocus: true,
            padding: 0
        })
        
        this.rawElement.key('enter', () => this.submitForm())
        this.rawElementPubKeyInput.key('enter', () => this.submitForm())
        this.rawElementAliasInput.key('enter', () => this.submitForm())

        this.rawElement.key('escape', () => this.hideForm())
        this.rawElementPubKeyInput.key('escape', () => this.hideForm())
        this.rawElementAliasInput.key('escape', () => this.hideForm())
    }

    setFormLabel(action: 'add' | 'edit' | 'delete') {
        switch (action) {
            case 'add':
                if (action === 'add') this.rawElement.setLabel({text: ' {green-fg}Add Validator{/green-fg} '})
                break
            case 'edit':
                if (action === 'edit') this.rawElement.setLabel({text: ' {yellow-fg}Edit Validator{/yellow-fg} '})
                break
            case 'delete':
                if (action === 'delete') this.rawElement.setLabel({text: ' {red-fg}Delete Validator{/red-fg} '})
                break
        }
    }

    showForm(action: 'add' | 'edit' | 'delete', validator?: Validator) {
        return new Promise(async (resolve, reject) => {
            this.rawElement.show()
            this.setFormLabel(action)
            if (validator) {
                this.rawElementPubKeyInput.setValue(validator.pubKey)
                this.rawElementAliasInput.setValue(validator.alias)
            }
            this.screenInstance.render() 
            
            this.rawElementPubKeyInput.focus()
            this.rawElement.on('submit', (data: any) => resolve(data))
        })
    }

    clearForm() {
        this.rawElementPubKeyInput.setValue('')
        this.rawElementAliasInput.setValue('')
    }

    submitForm() {
        this.rawElement.submit()
        this.hideForm()
    }

    hideForm() {
        this.clearForm()
        this.rawElement.hide()
        this.screenInstance.render() 
    }
}
