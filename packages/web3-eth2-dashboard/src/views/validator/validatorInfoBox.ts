import { listtable } from 'blessed'
import { ETH2BeaconChain } from 'web3-eth2-beaconchain'

export class ValidatorInfoBox {
    eth2BeaconChainInstance: ETH2BeaconChain | undefined
    rawElement: any

    constructor(eth2BeaconChainInstance: ETH2BeaconChain | undefined) {
        this.eth2BeaconChainInstance = eth2BeaconChainInstance
        this.rawElement = listtable({
            top: '20%',
            left: 'left',
            width: '30%',
            height: '22%',
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

    static formatValidatorInfo(validatorInfo: any): string[][] {
        return [
            ['',''],
            ['',''],
            [' Validator registry index',validatorInfo.index],
            // Capitalize first letter
            [' Status',`${validatorInfo.status.charAt(0).toUpperCase()}${validatorInfo.status.substr(1)}`],
            [' Balance',`${validatorInfo.balance.substr(0,validatorInfo.balance.length-9)}.${validatorInfo.balance.slice(-9)} ETH`],
            [' Effective balance',`${validatorInfo.validator.effective_balance.substr(0,validatorInfo.validator.effective_balance.length-9)}.${validatorInfo.validator.effective_balance.slice(-9)} ETH`],
            [' Slashed',validatorInfo.validator.slashed ? 'Yes' : 'No'],
            [' Active since epoch',validatorInfo.validator.activation_epoch],
            [' Eligible since epoch',validatorInfo.validator.activation_eligibility_epoch],
            [' Withdrawable epoch',validatorInfo.validator.withdrawable_epoch],
            [' Withdrawable credentials',`${validatorInfo.validator.withdrawal_credentials.substr(0,11)}...${validatorInfo.validator.withdrawal_credentials.substr(12,11)}`]
        ]
    }

    getValidatorInfo(validatorPubKey: string): any {
        try {
            if (this.eth2BeaconChainInstance === undefined) throw Error(`No ETH2 beacon chain instance provided`)
            return this.eth2BeaconChainInstance.getValidatorById({stateId: 'head', validatorId: validatorPubKey})
        } catch (error) {
            console.error(error)
        }
    }

    async setValidatorInfo(validatorPubKey: string) {
        const validatorInfo = await this.getValidatorInfo(validatorPubKey)
        this.rawElement.setData(ValidatorInfoBox.formatValidatorInfo(validatorInfo))
    }
}