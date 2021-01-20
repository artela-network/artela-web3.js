import { listtable } from 'blessed'
import { ETH2BeaconChain } from 'web3-eth2-beaconchain'

export class ValidatorProposalsTable {
    eth2BeaconChainInstance: ETH2BeaconChain | undefined
    rawElement: any

    constructor(eth2BeaconChainInstance: ETH2BeaconChain | undefined) {
        this.eth2BeaconChainInstance = eth2BeaconChainInstance
        this.rawElement = listtable({
            top: '5%',
            left: '30%',
            width: '70%',
            height: '50%',
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

    static hexToUtf8(hexString: string): string {
        return decodeURIComponent(hexString.replace(/^0x/g, '').replace(/[0-9a-f]{2}/g, '%$&'));
    }

    static formatValidatorProposals(proposals: any): string[][] {
        // If only one item is returned from API, that response is object instead of array
        if (!Array.isArray(proposals)) proposals = [proposals]

        if (proposals.length === 0) {
            return [[''],[' Validator has no proposals for last 100 epochs']]
        }

        const formattedProposals = [
            [' Epoch',' Slot',' Status',' Attestations',' Graffiti'],
            ['','',''],
        ]

        for (let proposal of proposals) {
            formattedProposals.push([
                ` ${proposal.epoch}`,
                ` ${proposal.slot}`,
                ` ${proposal.status}`,
                ` ${proposal.attestationscount}`,
                ` ${ValidatorProposalsTable.hexToUtf8(proposal.graffiti)}`
            ])
        }
        return formattedProposals
    }

    getValidatorProposals(validatorIndexOrPubKey: string): any {
        try {
            if (this.eth2BeaconChainInstance === undefined) throw Error(`No ETH2 beacon chain instance provided`)
            return this.eth2BeaconChainInstance.blockExplorerApi?.getValidatorProposals({validatorIndexOrPubKey})
        } catch (error) {
            console.error(error)
        }
    }

    async setValidatorProposals(validatorPubKey: string) {
        const validatorInfo = await this.getValidatorProposals(validatorPubKey)
        this.rawElement.setData(ValidatorProposalsTable.formatValidatorProposals(validatorInfo))
    }
}
