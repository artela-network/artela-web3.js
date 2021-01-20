import { BaseAPISchema } from '../../web3-eth2-core/types/index'

export const DefaultSchema: BaseAPISchema = {
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
            route: '${validatorIndexOrPubKey}/attestations',
            restMethod: 'get',
            inputFormatter: null,
            outputFormatter: null,
            errors: null,
            errorPrefix: "Failed to get Validator's attestations:"
        },
        {
            name: 'getValidatorBalanceHistory',
            route: '${validatorIndexOrPubKey}/balanceHistory',
            restMethod: 'get',
            inputFormatter: null,
            outputFormatter: null,
            errors: null,
            errorPrefix: "Failed to get Validator's balance history:"
        },
        {
            name: 'getValidatorPerformance',
            route: '${validatorIndexOrPubKey}/performance',
            restMethod: 'get',
            inputFormatter: null,
            outputFormatter: null,
            errors: null,
            errorPrefix: "Failed to get Validator's performance:"
        },
        {
            name: 'getValidatorProposals',
            route: '${validatorIndexOrPubKey}/proposals',
            restMethod: 'get',
            inputFormatter: null,
            outputFormatter: null,
            errors: null,
            errorPrefix: "Failed to get Validator's proposals:"
        },
    ]
}
