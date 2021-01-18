import { listtable } from 'blessed'
import { IETH2BeaconChain } from 'web3-eth2-beaconchain'
export class ValidatorInfoBox {
    eth2BeaconChainInstance: IETH2BeaconChain | undefined
    validatorInfoBox: any

    constructor(eth2BeaconChainInstance: IETH2BeaconChain | undefined) {
        this.eth2BeaconChainInstance = eth2BeaconChainInstance
        this.validatorInfoBox = listtable({
            top: '30%',
            left: 'left',
            width: '25%',
            height: '72%',
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
        this.validatorInfoBox.setData([[''],['Please select a Validator']])
    }

    static formatValidatorInfo(validatorInfo: any): string[][] {
        return [
            ['',''],
            ['Validator registry index',validatorInfo.index],
            // Capitalize first letter
            ['Status',`${validatorInfo.status.charAt(0).toUpperCase()}${validatorInfo.status.substr(1)}`],
            ['Balance',`${validatorInfo.balance.substr(0,validatorInfo.balance.length-9)}.${validatorInfo.balance.slice(-9)} ETH`],
            ['Effective balance',`${validatorInfo.validator.effective_balance.substr(0,validatorInfo.validator.effective_balance.length-9)}.${validatorInfo.validator.effective_balance.slice(-9)} ETH`],
            ['Slashed',validatorInfo.validator.slashed ? 'Yes' : 'No'],
            ['Active since epoch',validatorInfo.validator.activation_epoch],
            ['Eligible since epoch',validatorInfo.validator.activation_eligibility_epoch],
            ['Withdrawable epoch',validatorInfo.validator.withdrawable_epoch],
            ['Withdrawable credentials',`${validatorInfo.validator.withdrawal_credentials.substr(0,11)}...${validatorInfo.validator.withdrawal_credentials.substr(12,11)}`]
        ]
    }

    getElement() {
        return this.validatorInfoBox
    }

    getValidatorInfo(validatorPubKey: string): any {
        try {
            if (this.eth2BeaconChainInstance === undefined) throw Error(`No ETH2 beacon chain instance provided`)
            // @ts-ignore IETH2Beacon is not properly configured
            return this.eth2BeaconChainInstance.getValidatorById({stateId: 'head', validatorId: validatorPubKey})
        } catch (error) {
            console.error(error)
        }
    }

    async setValidatorInfo(validatorPubKey: string) {
        const validatorInfo = await this.getValidatorInfo(validatorPubKey)
        this.validatorInfoBox.setData(ValidatorInfoBox.formatValidatorInfo(validatorInfo))
    }
}