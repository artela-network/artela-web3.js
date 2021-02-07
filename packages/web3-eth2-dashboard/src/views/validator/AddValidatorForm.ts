import { form, box, textbox } from 'blessed'

export class AddValidatorForm {
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
            label: ' {green-fg}Add Validator{/green-fg} ',
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
    }

    showForm() {
        return new Promise(async (resolve, reject) => {
            this.rawElementPubKeyInput.focus()
            this.rawElement.on('submit', (data: any) => resolve(data))
        })
    }

    submitForm() {
        this.rawElement.submit()
        this.hideForm()
    }

    hideForm() {
        this.rawElement.hide()
        this.screenInstance.render() 
    }
}
