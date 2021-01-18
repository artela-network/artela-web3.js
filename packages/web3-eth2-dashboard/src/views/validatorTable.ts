import { listtable } from 'blessed'

import { configValidator } from '../../types/index'

export class ValidatorTable {
    validators: configValidator[]
    validatorInfoBoxInstance: any
    validatorTable: any
    screenInstance: any

    constructor(screenInstance: any, validatorInfoBoxInstance: any, validators: configValidator[]) {
        this.screenInstance = screenInstance
        this.validatorInfoBoxInstance = validatorInfoBoxInstance
        this.validators = validators
        this.validatorTable = listtable({
            top: '6%',
            left: 'left',
            border: 'line',
            align: 'left',
            keys: true,
            width: '25%',
            height: '25%',
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
        
        this.validatorTable.setData(ValidatorTable.formatValidators(validators))
        this.validatorTable.focus()
        this.validatorTable.on('select', async (data: any) => {
            const validatorIndex = this.validatorTable.getItemIndex(data)
            await this.validatorInfoBoxInstance.setValidatorInfo(
                // validatorIndex - 1 because Blessed uses 1 based indexes
                this.validators[validatorIndex - 1].pubKey
            )
            this.screenInstance.render()
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

    /**
     * @TODO could remove this and access property directly?
     */
    getElement() {
        return this.validatorTable
    }
}