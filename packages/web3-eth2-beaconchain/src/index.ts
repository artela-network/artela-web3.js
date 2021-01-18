// @ts-ignore - types not full implemented yet
import { ETH2Core, IBaseAPISchema, ETH2BaseOpts } from 'web3-eth2-core'
import { DefaultSchema } from './schema'

import { IETH2BeaconChain, IBlockExplorerApi } from '../types/index'
import { BlockExplorerApi } from './blockExplorerApi'

// @ts-ignore Typescript isn't aware that class methods are added during execution
export class ETH2BeaconChain extends ETH2Core implements IETH2BeaconChain {
    blockExplorerApi: IBlockExplorerApi | undefined

    constructor(
        provider: string,
        schema: IBaseAPISchema = DefaultSchema,
        opts: ETH2BaseOpts = { protectProvider: true }) {
        super(provider, schema, opts)
    }

    addBlockExplorerApi() {
        // @ts-ignore Typescript isn't aware that class methods are added during execution
        this.blockExplorerApi = new BlockExplorerApi()
    }
}
