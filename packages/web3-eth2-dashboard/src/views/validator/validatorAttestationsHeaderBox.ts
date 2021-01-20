import { box } from 'blessed'

export class ValidatorAttestationsHeaderBox {
    rawElement: any

    constructor() {
        this.rawElement = box({
            top: '43%',
            left: '30%',
            width: '70%',
            height: '6%',
            align: 'center',
            border: 'line',
            content: 'Attestations in Last 100 Epochs',
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