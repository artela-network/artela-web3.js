import { listtable } from 'blessed'

import { Validator } from '../../../types'
import { ValidatorPrompt } from './ValidatorPrompt'
import { ValidatorForm } from './ValidatorForm'
import { LoadingScreen } from '../loadingScreen'
import { readConfig } from '../../helpers/readConfigFile'
import { writeConfig } from '../../helpers/writeConfigFile'

export class ValidatorTable {
    rawElement: any
    screenInstance: any
    validators: Validator[]
    validatorInfoBoxInstance: any
    validatorIncomeBoxInstance: any
    validatorBalanceHistoryBoxInstance: any
    validatorProposalsTableInstance: any
    validatorAttestationsTableInstance: any
    validatorTable: any
    validatorPrompt: any
    validatorForm: any
    highlightedIndex = 0

    constructor(
        screenInstance: any,
        validatorInfoBoxInstance: any,
        validatorIncomeBoxInstance: any,
        validatorBalanceHistoryBoxInstance: any,
        validatorProposalsTableInstance: any,
        validatorAttestationsTableInstance: any,
        validators: Validator[]) {
        this.screenInstance = screenInstance
        this.validatorInfoBoxInstance = validatorInfoBoxInstance
        this.validatorIncomeBoxInstance = validatorIncomeBoxInstance
        this.validatorBalanceHistoryBoxInstance = validatorBalanceHistoryBoxInstance
        this.validatorProposalsTableInstance = validatorProposalsTableInstance
        this.validatorAttestationsTableInstance = validatorAttestationsTableInstance
        this.validators = validators
        this.rawElement = listtable({
            name: 'validatorTable',
            top: 'left',
            left: 'left',
            border: 'line',
            align: 'left',
            keys: true,
            width: '30%',
            height: '20%',
            vi: true,
            mouse: true,
            noCellBorders: true,
            style: {
                // @ts-ignore
                border: {
                    fg: 'green'
                },
                header: {
                fg: 'white',
                bold: true
                },
                cell: {
                    fg: 'white',
                    selected: {
                        fg: '#257AFD'
                    }
                }
            }
        })
        
        this.setValidators(validators)
        this.rawElement.focus()
        this.rawElement.on('select', (data: any) => {
            const validatorIndex = this.rawElement.getItemIndex(data)
            this.setSelectedValidator(validatorIndex)
        })
        // this.rawElement.key(['up','down'], (data: any) => {
        //     console.log(data)
        //     // this.updateHighlightedIndex()
        // })
    }

    static formatValidators(validators: Validator[]): string[][] {
        const tableData = [['Public Keys','Alias']]
        for (const validator of validators) {
            tableData.push([
                `${validator.pubKey.substr(0,11)}...${validator.pubKey.substr(12,11)}`,
                validator.alias
            ])
        }
        return tableData
    }

    static checkIfValidator(value: string): boolean {
        return new RegExp('0x[a-f,A-F,0-9]{96}|[0-9]+').test(value)
    }

    updateHighlightedIndex(keyPressed: 'up' | 'down') {
        // Don't update index, nothing to highlight
        if (this.validators.length === 0) return
    }

    setValidators(validators: Validator[]) {
        this.validators = validators
        this.rawElement.setData(ValidatorTable.formatValidators(validators))
    }

    async setSelectedValidator(validatorIndex: number) {
        // validatorIndex - 1 because Blessed uses 1 based indexes
        const pubKey = this.validators[validatorIndex - 1].pubKey
        const loadingScreen = new LoadingScreen(this.screenInstance)
        loadingScreen.start()
        await Promise.all([
            this.validatorInfoBoxInstance.setValidatorInfo(pubKey),
            this.validatorIncomeBoxInstance.setValidatorIncome(pubKey),
            this.validatorBalanceHistoryBoxInstance.setValidatorBalanceHistory(pubKey),
            this.validatorProposalsTableInstance.setValidatorProposals(pubKey),
            this.validatorAttestationsTableInstance.setValidatorAttestations(pubKey)
        ])
        loadingScreen.stop()
        this.screenInstance.render()
    }

    // initValidatorPrompt() {
    //     if (this.validatorPrompt === undefined) {
    //         this.validatorPrompt = new ValidatorPrompt(this.screenInstance)
    //     }
    // }

    initValidatorForm() {
        if (this.validatorForm === undefined) {
            this.validatorForm = new ValidatorForm(this.screenInstance)
            this.screenInstance.render()
        }
    }

    async addValidator() {
        if (this.validatorForm === undefined) this.initValidatorForm()
        const {textbox} = await this.validatorForm.showForm()
        if (ValidatorTable.checkIfValidator(textbox[0])) {
            const config = await readConfig()
            config.validators.push({pubKey: textbox[0], alias: textbox[1]})
            // TODO Does config object in Eth2Dashboard get updated?
            await writeConfig(config)
            this.setValidators(config.validators)
            this.screenInstance.render()
        }
    }

    async editValidator() {
        console.log(this.rawElement)
        if (this.validatorForm === undefined) this.initValidatorForm()
        const {textbox} = await this.validatorForm.showForm()
        if (ValidatorTable.checkIfValidator(textbox[0])) {
            const config = await readConfig()
            config.validators.push({pubKey: textbox[0], alias: textbox[1]})
            // TODO Does config object in Eth2Dashboard get updated?
            await writeConfig(config)
            this.setValidators(config.validators)
            this.screenInstance.render()
        }
    }
}