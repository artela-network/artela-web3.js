// @ts-ignore
import { ETH2Core } from 'web3-eth2-core'

import { BlockExplorerApi as IBlockExplorerApi } from '../types'
import { DefaultSchema } from './blockExplorerApiSchema'

// @ts-ignore Typescript isn't aware that class methods are added during execution
export class BlockExplorerApi extends ETH2Core implements IBlockExplorerApi {
    constructor(blockExplorerUrl: string = 'https://beaconcha.in') {
        super(blockExplorerUrl, DefaultSchema, { protectProvider: true })
    }
}
