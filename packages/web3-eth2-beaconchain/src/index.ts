import { ETH2Core, BaseAPISchema, ETH2BaseOpts } from 'web3-eth2-core'
import { DefaultSchema } from './schema'

import { ETH2BeaconChain as IETH2BeaconChain, BlockExplorerApi as IBlockExplorerApi } from '../types/index'
import { BlockExplorerApi } from './blockExplorerApi'

// @ts-ignore - ETH2BeaconChain incorrectly implements interface IETH2BeaconChain
// because methods are added during runtime
export class ETH2BeaconChain extends ETH2Core implements IETH2BeaconChain {
    // @ts-ignore Typescript isn't aware that class methods are added during execution
    blockExplorerApi: IBlockExplorerApi | undefined

    constructor(
        provider: string,
        schema: BaseAPISchema = DefaultSchema,
        opts: ETH2BaseOpts = { protectProvider: true }) {
        super(provider, schema, opts)
    }

    addBlockExplorerApi() {
        // @ts-ignore Typescript isn't aware that class methods are added during execution
        this.blockExplorerApi = new BlockExplorerApi()
    }
}
