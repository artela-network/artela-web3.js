import { listtable } from 'blessed'

import { configValidator } from '../../../types'
import { LoadingScreen } from '../loadingScreen'

export class ValidatorTable {
    rawElement: any
    screenInstance: any
    validators: configValidator[]
    validatorInfoBoxInstance: any
    validatorIncomeBoxInstance: any
    validatorBalanceHistoryBoxInstance: any
    validatorProposalsTableInstance: any
    validatorAttestationsTableInstance: any
    validatorTable: any

    constructor(
        screenInstance: any,
        validatorInfoBoxInstance: any,
        validatorIncomeBoxInstance: any,
        validatorBalanceHistoryBoxInstance: any,
        validatorProposalsTableInstance: any,
        validatorAttestationsTableInstance: any,
        validators: configValidator[]) {
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
        
        this.rawElement.setData(ValidatorTable.formatValidators(validators))
        this.rawElement.focus()
        this.rawElement.on('select', (data: any) => {
            const validatorIndex = this.rawElement.getItemIndex(data)
            this.setSelectedValidator(validatorIndex)
        })
    }

    static formatValidators(validators: configValidator[]): string[][] {
        const tableData = [['Public Keys','Alias']]
        for (const validator of validators) {
            tableData.push([
                `${validator.pubKey.substr(0,11)}...${validator.pubKey.substr(12,11)}`,
                validator.alias
            ])
        }
        return tableData
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
}