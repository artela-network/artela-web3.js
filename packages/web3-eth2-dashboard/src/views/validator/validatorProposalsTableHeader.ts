import { box } from 'blessed'

export class ValidatorProposalsHeaderBox {
    rawElement: any

    constructor() {
        this.rawElement = box({
            top: 'left',
            left: '30%',
            width: '70%',
            height: '6%',
            align: 'center',
            border: 'line',
            content: 'Proposals in Last 100 Epochs',
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
    }
}