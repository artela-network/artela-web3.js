import {ETH2BeaconChain} from 'web3-eth2-beaconchain'
import { screen } from 'blessed'

import { readConfig } from './helpers/readConfigFile'
import { guiConfig } from '../types/index'
import { BottomContainerBox } from './views/validator/bottomBox/containerBox'
import { ValidatorInfoBox } from './views/validator/validatorInfoBox'
import { ValidatorIncomeBox } from './views/validator/validatorIncomeBox'
import { ValidatorTable } from './views/validator/validatorTable'

class Eth2Dashboard {
    config: guiConfig
    connected: boolean = false
    bottomContainerBox: any
    eth2BeaconChain: ETH2BeaconChain | undefined
    screenInstance: any
    validatorInfoBox: any
    validatorIncomeBox: any
    validatorTable: any

    constructor(config: guiConfig) {
        this.config = config
        this.connectToProvider()
    }

    connectToProvider() {
        if (this.eth2BeaconChain === undefined) {
            this.eth2BeaconChain = new ETH2BeaconChain(this.config.httpProvider)
            if (!this.eth2BeaconChain) {
                this.connected = false
                return
            }
            this.eth2BeaconChain.addBlockExplorerApi()
            this.connected = true
        }
    }

    initScreen() {
        if (this.screenInstance === undefined) {
            this.screenInstance = screen({smartCSR: true})
            this.screenInstance.title = 'Web3Eth2Dashboard'
        }
    }

    initBottomContainerBox() {
        if (this.bottomContainerBox === undefined) {
            this.bottomContainerBox = new BottomContainerBox(this.config.httpProvider, this.connected)
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

    initValidatorTable() {
        if (this.validatorInfoBox !== undefined && this.validatorTable === undefined) {
            this.validatorTable = new ValidatorTable(
                this.screenInstance,
                this.validatorInfoBox,
                this.config.validators)
        }
    }

    drawGui() {
        if (this.screenInstance === undefined) {
            this.initScreen()
            this.initBottomContainerBox()
            this.initValidatorInfoBox()
            this.initValidatorIncomeBox()
            this.initValidatorTable()

            // Quit on Escape, q, or Control-C.
            this.screenInstance.key(['escape', 'q', 'C-c'], () => process.exit(0))
            this.screenInstance.append(this.bottomContainerBox.rawElement)
            this.screenInstance.append(this.validatorInfoBox.rawElement)
            this.screenInstance.append(this.validatorIncomeBox.rawElement)
            this.screenInstance.append(this.validatorTable.rawElement)
            this.screenInstance.render()
        }
    }
}

(() => {
    try {
        const config = readConfig()
        if (config === undefined) throw Error('Unable to load config file')
        // @ts-ignore
        const eth2Dashboard = new Eth2Dashboard(config)
        eth2Dashboard.drawGui()
    } catch (error) {
        console.error(error)
    }
})()
