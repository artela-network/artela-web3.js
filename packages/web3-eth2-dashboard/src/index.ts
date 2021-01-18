// @ts-ignore
import {ETH2BeaconChain, IETH2BeaconChain} from 'web3-eth2-beaconchain'
import { screen } from 'blessed'

import { readConfig } from './helpers/readConfigFile'
import { guiConfig } from '../types/index'
import { ConnectedBox } from './views/connectedBox'
import { ValidatorInfoBox } from './views/validatorInfoBox'
import { ValidatorTable } from './views/validatorTable'

class Eth2Dashboard {
    config: guiConfig
    connected: boolean = false
    connectedBox: any
    eth2Beacon: IETH2BeaconChain | undefined
    screenInstance: any
    validatorInfoBox: any
    validatorTable: any

    constructor(config: guiConfig) {
        this.config = config
        this.connectToProvider()
    }

    connectToProvider() {
        if (this.eth2Beacon === undefined) {
            this.eth2Beacon = new ETH2BeaconChain(this.config.httpProvider)
            this.connected = true
        }
    }

    initScreen() {
        if (this.screenInstance === undefined) {
            this.screenInstance = screen({smartCSR: true})
            this.screenInstance.title = 'ETH2CliGui'
        }
    }

    initConnectedBox() {
        if (this.connectedBox === undefined) {
            this.connectedBox = new ConnectedBox(this.config.httpProvider, this.connected)
        }
    }

    initValidatorInfoBox() {
        if (this.validatorInfoBox === undefined) {
            this.validatorInfoBox = new ValidatorInfoBox(this.eth2Beacon)
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
            this.initConnectedBox()
            this.initValidatorInfoBox()
            this.initValidatorTable()

            // Quit on Escape, q, or Control-C.
            this.screenInstance.key(['escape', 'q', 'C-c'], () => process.exit(0))
            this.screenInstance.append(this.connectedBox.getElement())
            this.screenInstance.append(this.validatorInfoBox.getElement())
            this.screenInstance.append(this.validatorTable.getElement())
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
