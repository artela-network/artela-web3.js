import { listtable } from 'blessed'
import { ETH2BeaconChain } from 'web3-eth2-beaconchain'

export class ValidatorIncomeBox {
    eth2BeaconChainInstance: ETH2BeaconChain | undefined
    rawElement: any

    constructor(eth2BeaconChainInstance: ETH2BeaconChain | undefined) {
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
            tags: true,
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

    static convertGweiToEther(amount: number): number {
        return amount / 10**9
    }

    static formatDeltaString(amount: number): string {
        if (Math.sign(amount) === -1) {
            return ` {red-fg}${ValidatorIncomeBox.convertGweiToEther(amount)} ETH{/}`
        }

        return ` {green-fg}+${ValidatorIncomeBox.convertGweiToEther(amount)} ETH{/}`
    }

    static formatValidatorIncome(incomeInfo: any): string[][] {
        return [
            ['',''],
            ['',''],
            ['Day', ValidatorIncomeBox.formatDeltaString(incomeInfo.performance1d)],
            ['Week', ValidatorIncomeBox.formatDeltaString(incomeInfo.performance7d)],
            ['Month', ValidatorIncomeBox.formatDeltaString(incomeInfo.performance31d)],
            ['Year', ValidatorIncomeBox.formatDeltaString(incomeInfo.performance365d)],
        ]
    }

    getValidatorIncome(validatorIndexOrPubKey: string): any {
        try {
            if (this.eth2BeaconChainInstance === undefined) throw Error(`No ETH2 beacon chain instance provided`)
            return this.eth2BeaconChainInstance.blockExplorerApi?.getValidatorPerformance({validatorIndexOrPubKey})
        } catch (error) {
            console.error(error)
        }
    }

    async setValidatorIncome(validatorPubKey: string) {
        const validatorInfo = await this.getValidatorIncome(validatorPubKey)
        this.rawElement.setData(ValidatorIncomeBox.formatValidatorIncome(validatorInfo))
    }
}
