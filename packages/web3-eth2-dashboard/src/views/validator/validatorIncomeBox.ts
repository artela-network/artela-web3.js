import { listtable } from 'blessed'
import { IETH2BeaconChain } from 'web3-eth2-beaconchain'

export class ValidatorIncomeBox {
    eth2BeaconChainInstance: IETH2BeaconChain | undefined
    rawElement: any

    constructor(eth2BeaconChainInstance: IETH2BeaconChain | undefined) {
        this.eth2BeaconChainInstance = eth2BeaconChainInstance
        this.rawElement = listtable({
            top: '40%',
            left: 'left',
            width: '15%',
            height: '20%',
            align: 'left',
            keys: true,
            vi: true,
            mouse: true,
            border: 'line',
            style: {
                // @ts-ignore
                border: {
                    fg: 'white'
                },
                cell: {
                    fg: 'white',
                    // selected: {
                    //     fg: '#257AFD'
                    // }
                }
            }
        })
        this.rawElement.setData([[''],['Please select a Validator']])
    }

    static formatValidatorIncome(validatorInfo: any): string[][] {
        return [
            ['',''],
            ['Day', '1'],
            ['Month', '1'],
            ['Year', '1'],
            ['APR', '1'],
        ]
    }

    getValidatorIncome(validatorPubKey: string): any {
        try {
            if (this.eth2BeaconChainInstance === undefined) throw Error(`No ETH2 beacon chain instance provided`)
            // @ts-ignore IETH2Beacon is not properly configured
            return this.eth2BeaconChainInstance.blockExplorerApi?.getValidatorPerformance(validatorPubKey)
        } catch (error) {
            console.error(error)
        }
    }

    async setValidatorIncome(validatorPubKey: string) {
        const validatorInfo = await this.getValidatorIncome(validatorPubKey)
        this.rawElement.setData(ValidatorIncomeBox.formatValidatorIncome(validatorInfo))
    }
}
