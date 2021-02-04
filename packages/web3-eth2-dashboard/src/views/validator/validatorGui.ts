import { ETH2BeaconChain } from 'web3-eth2-beaconchain'

import { ElementId } from '../../../types'
import { AddValidatorPrompt } from './addValidator'
import { ValidatorInfoBox } from './info'
import { ValidatorIncomeBox } from './income'
import { ValidatorBalanceHistoryBox } from './balanceHistory'
import { ValidatorProposalsHeaderBox } from './proposals/header'
import { ValidatorProposalsTable } from './proposals/table'
import { ValidatorAttestationsHeaderBox } from './attestations/header'
import { ValidatorAttestationsTable } from './attestations/table'
import { ValidatorTable } from './selection'

export class ValidatorGui {
    screenInstance: any
    validators: any
    eth2BeaconChain: ETH2BeaconChain | undefined
    connected: boolean = false
    bottomContainerBox: any
    bgBlack: any
    addValidatorPrompt: any
    validatorInfoBox: any
    validatorIncomeBox: any
    validatorBalanceHistoryBox: any
    validatorsProposalHeaderBox: any
    validatorProposalsTable: any
    validatorAttestationsHeaderBox: any
    validatorAttestationsTable: any
    validatorTable: any

    constructor(
        screenInstance: any,
        validators: any,
        eth2BeaconChain: ETH2BeaconChain) {
        this.screenInstance = screenInstance
        this.validators = validators
        this.eth2BeaconChain = eth2BeaconChain
    }

    initAddValidatorPrompt() {
        if (this.addValidatorPrompt === undefined) {
            this.addValidatorPrompt = new AddValidatorPrompt(this.screenInstance)
        }
    }

    initValidatorInfoBox() {
        if (this.validatorInfoBox === undefined) {
            this.validatorInfoBox = new ValidatorInfoBox(this.eth2BeaconChain)
        }
    }

    initValidatorIncomeBox() {
        if (this.validatorIncomeBox === undefined) {
            this.validatorIncomeBox = new ValidatorIncomeBox(this.eth2BeaconChain)
        }
    }

    initValidatorBalanceHistoryBox() {
        if (this.validatorBalanceHistoryBox === undefined) {
            this.validatorBalanceHistoryBox = new ValidatorBalanceHistoryBox(this.eth2BeaconChain)
        }
    }

    initValidatorProposalsHeaderBox() {
        if (this.validatorsProposalHeaderBox === undefined) {
            this.validatorsProposalHeaderBox = new ValidatorProposalsHeaderBox()
        }
    }

    initValidatorProposalsTable() {
        if (this.validatorProposalsTable === undefined) {
            this.validatorProposalsTable = new ValidatorProposalsTable(this.eth2BeaconChain)
        }
    }

    initValidatorAttestationsHeaderBox() {
        if (this.validatorAttestationsHeaderBox === undefined) {
            this.validatorAttestationsHeaderBox = new ValidatorAttestationsHeaderBox()
        }
    }

    initValidatorAttestationsTable() {
        if (this.validatorAttestationsTable === undefined) {
            this.validatorAttestationsTable = new ValidatorAttestationsTable(this.eth2BeaconChain)
        }
    }

    initValidatorTable() {
        if (this.validatorInfoBox !== undefined && this.validatorTable === undefined) {
            this.validatorTable = new ValidatorTable(
                this.screenInstance,
                this.validatorInfoBox,
                this.validatorIncomeBox,
                this.validatorBalanceHistoryBox,
                this.validatorProposalsTable,
                this.validatorAttestationsTable,
                this.validators)
        }
    }

    addHandler(elementId: ElementId) {
        if (elementId === 'validatorTable') this.addValidatorPrompt.showPrompt()
    }

    init() {
        if (this.screenInstance !== undefined) {
            this.initAddValidatorPrompt()
            this.initValidatorInfoBox()
            this.initValidatorIncomeBox()
            this.initValidatorBalanceHistoryBox()
            this.initValidatorProposalsHeaderBox()
            this.initValidatorProposalsTable()
            this.initValidatorAttestationsHeaderBox()
            this.initValidatorAttestationsTable()
            this.initValidatorTable()
            
            this.screenInstance.key(['a'], () => this.addHandler(this.screenInstance.focused.name))
            
            this.screenInstance.append(this.validatorInfoBox.rawElement)
            this.screenInstance.append(this.validatorIncomeBox.rawElement)
            this.screenInstance.append(this.validatorBalanceHistoryBox.rawElement)
            this.screenInstance.append(this.validatorsProposalHeaderBox.rawElement)
            this.screenInstance.append(this.validatorProposalsTable.rawElement)
            this.screenInstance.append(this.validatorAttestationsHeaderBox.rawElement)
            this.screenInstance.append(this.validatorAttestationsTable.rawElement)
            this.screenInstance.append(this.validatorTable.rawElement)
        }
    }
}
