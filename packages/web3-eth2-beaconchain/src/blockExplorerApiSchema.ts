import { IBaseAPISchema } from '../../web3-eth2-core/src/schema'

export const DefaultSchema: IBaseAPISchema = {
    packageName: 'eth2-blockExplorerApi',
    routePrefix: '/api/v1/validator/',
    methods: [
        {
            name: 'getValidatorsForEth1Address',
            route: 'eth1/${address}',
            restMethod: 'get',
            inputFormatter: null,
            outputFormatter: null,
            errors: null,
            errorPrefix: 'Failed to get Validators for ETH1 address:'
        },
        {
            name: 'getTop100Validators',
            route: 'leaderboard',
            restMethod: 'get',
            inputFormatter: null,
            outputFormatter: null,
            errors: null,
            errorPrefix: 'Failed to get top 100 Validators:'
        },
        {
            name: 'getValidatorAttestations',
            route: '${indexOrPubKey}/attestations',
            restMethod: 'get',
            inputFormatter: null,
            outputFormatter: null,
            errors: null,
            errorPrefix: "Failed to get Validator's attestations:"
        },
        {
            name: 'getValidatorBalanceHistory',
            route: '${indexOrPubKey}/balanceHistory',
            restMethod: 'get',
            inputFormatter: null,
            outputFormatter: null,
            errors: null,
            errorPrefix: "Failed to get Validator's balance history:"
        },
        {
            name: 'getValidatorPerformance',
            route: '${indexOrPubKey}/performance',
            restMethod: 'get',
            inputFormatter: null,
            outputFormatter: null,
            errors: null,
            errorPrefix: "Failed to get Validator's performance:"
        },
        {
            name: 'getValidatorProposals',
            route: '${indexOrPubKey}/proposals',
            restMethod: 'get',
            inputFormatter: null,
            outputFormatter: null,
            errors: null,
            errorPrefix: "Failed to get Validator's proposals:"
        },
    ]
}
