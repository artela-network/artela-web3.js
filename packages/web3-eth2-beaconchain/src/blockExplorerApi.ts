// @ts-ignore
import { ETH2Core } from 'web3-eth2-core'

import { IBlockExplorerApi } from '../types'
import { DefaultSchema } from './blockExplorerApiSchema'

// @ts-ignore Typescript isn't aware that class methods are added during execution
export class BlockExplorerApi extends ETH2Core implements IBlockExplorerApi {
    constructor() {
        super('https://beaconcha.in', DefaultSchema, { protectProvider: true })
    }
}
