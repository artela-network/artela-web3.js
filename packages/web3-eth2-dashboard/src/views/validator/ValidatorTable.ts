import { listtable } from 'blessed'

import { Validator } from '../../../types'
import { AddValidatorPrompt } from './AddValidatorPrompt'
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
    addValidatorPrompt: any

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
        this.initAddValidatorPrompt()
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

    initAddValidatorPrompt() {
        if (this.addValidatorPrompt === undefined) {
            this.addValidatorPrompt = new AddValidatorPrompt(this.screenInstance)
        }
    }

    async addValidator() {
        if (this.addValidatorPrompt !== undefined) {
            console.log('TEST 1')
            const response = await this.addValidatorPrompt.showPrompt()
            // console.log('Test 4', response)
            console.log('TEST 2', response, ValidatorTable.checkIfValidator(response))
            console.log('TEST 3')
            // if (ValidatorTable.checkIfValidator(response)) {
            //     const config = await readConfig()
            //     config.validators.push({pubKey: response, alias: undefined})
            //     // TODO Does config object in Eth2Dashboard get updated?
            //     await writeConfig(config)
            //     this.setSelectedValidator(config.validators)
            //     this.screenInstance.render()
            // }
        }
    }
}