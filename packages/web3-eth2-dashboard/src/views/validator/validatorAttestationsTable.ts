import { listtable } from 'blessed'
import { ETH2BeaconChain } from 'web3-eth2-beaconchain'

export class ValidatorAttestationsTable {
    eth2BeaconChainInstance: ETH2BeaconChain | undefined
    rawElement: any

    constructor(eth2BeaconChainInstance: ETH2BeaconChain | undefined) {
        this.eth2BeaconChainInstance = eth2BeaconChainInstance
        this.rawElement = listtable({
            top: '47%',
            left: '30%',
            width: '70%',
            height: '49%',
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

    static formatValidatorAttestations(attestations: any): string[][] {
        // If only one item is returned from API, that response is object instead of array
        if (!Array.isArray(attestations)) attestations = [attestations]

        if (attestations.length === 0) {
            return [[''],[' Validator has no Attestations for last 100 epochs']]
        }

        const formattedAttestations = [
            [' Epoch',' Slot',' Status',' Committee Index',' Inclusion Slot'],
            ['','',''],
        ]

        for (let attestation of attestations) {
            formattedAttestations.push([
                ` ${attestation.epoch}`,
                ` ${attestation.attesterslot}`,
                ` ${attestation.status}`,
                ` ${attestation.committeeindex}`,
                ` ${attestation.inclusionslot}`,
            ])
        }
        return formattedAttestations
    }

    getValidatorAttestations(validatorIndexOrPubKey: string): any {
        try {
            if (this.eth2BeaconChainInstance === undefined) throw Error(`No ETH2 beacon chain instance provided`)
            return this.eth2BeaconChainInstance.blockExplorerApi?.getValidatorAttestations({validatorIndexOrPubKey})
        } catch (error) {
            console.error(error)
        }
    }

    async setValidatorAttestations(validatorPubKey: string) {
        const validatorInfo = await this.getValidatorAttestations(validatorPubKey)
        this.rawElement.setData(ValidatorAttestationsTable.formatValidatorAttestations(validatorInfo))
    }
}
