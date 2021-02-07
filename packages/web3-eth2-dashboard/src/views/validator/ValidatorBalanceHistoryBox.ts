import { listtable } from 'blessed'
import { ETH2BeaconChain } from 'web3-eth2-beaconchain'

export class ValidatorBalanceHistoryBox {
    eth2BeaconChainInstance: ETH2BeaconChain | undefined
    rawElement: any

    constructor(eth2BeaconChainInstance: ETH2BeaconChain | undefined) {
        this.eth2BeaconChainInstance = eth2BeaconChainInstance
        this.rawElement = listtable({
            top: '40%',
            left: '15%',
            width: '15.5%',
            height: '20%',
            align: 'left',
            keys: true,
            vi: true,
            mouse: true,
            border: 'line',
            tags: true,
            noCellBorders: true,
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
            return ` {red-fg}${ValidatorBalanceHistoryBox.convertGweiToEther(amount)}{/} ETH`
        }

        return ` {green-fg}+${ValidatorBalanceHistoryBox.convertGweiToEther(amount)}{/} ETH`
    }

    static formatValidatorBalanceHistory(balanceHistory: any): string[][] {
        const formattedBalanceHistory = [[' Epoch',' Balance Change'],['','']]
        // Skipping index 0, no way to get delta
        for (let i = 1; i < balanceHistory.length; i++) {
            formattedBalanceHistory.push([
                ` ${balanceHistory[i].epoch}`,
                ValidatorBalanceHistoryBox.formatDeltaString(balanceHistory[i-1].balance - balanceHistory[i].balance)
            ])
        }
        return formattedBalanceHistory
    }

    getValidatorBalanceHistory(validatorIndexOrPubKey: string): any {
        try {
            if (this.eth2BeaconChainInstance === undefined) throw Error(`No ETH2 beacon chain instance provided`)
            return this.eth2BeaconChainInstance.blockExplorerApi?.getValidatorBalanceHistory({validatorIndexOrPubKey})
        } catch (error) {
            console.error(error)
        }
    }

    async setValidatorBalanceHistory(validatorPubKey: string) {
        const validatorInfo = await this.getValidatorBalanceHistory(validatorPubKey)
        this.rawElement.setData(ValidatorBalanceHistoryBox.formatValidatorBalanceHistory(validatorInfo))
    }
}
