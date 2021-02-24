import { ETH2BeaconChain } from 'web3-eth2-beaconchain'
import { screen } from 'blessed'

import { GuiConfig } from '../types'
import { readConfig } from './helpers/readConfigFile'
import { BottomContainerBox } from './views/validator/bottomBox/container'
import { ValidatorGui } from './views/validator/ValidatorGui'

class Eth2Dashboard {
    screenInstance: any
    config: GuiConfig
    eth2BeaconChain: ETH2BeaconChain | undefined
    connected: boolean = false
    bottomContainerBox: any
    validatorGui: any

    constructor(config: GuiConfig) {
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
            this.screenInstance = screen({smartCSR: true, autoPadding: false})
            this.screenInstance.title = 'Web3 Eth2 Dashboard'
        }
    }

    initBottomContainerBox() {
        if (this.bottomContainerBox === undefined) {
            this.bottomContainerBox = new BottomContainerBox(this.config.httpProvider, this.connected)
        }
    }

    initValidatorGui() {
        if (this.validatorGui === undefined && this.eth2BeaconChain !== undefined) {
            this.validatorGui = new ValidatorGui(this.screenInstance, this.config.validators, this.eth2BeaconChain)
            this.validatorGui.init()
        }
    }

    drawGui() {
        if (this.screenInstance === undefined) {
            this.initScreen()
            this.initBottomContainerBox()
            this.initValidatorGui()

            // Quit on Escape, q, or Control-C.
            this.screenInstance.key(['escape', 'q', 'C-c'], () => process.exit(0))
            this.screenInstance.append(this.bottomContainerBox.rawElement)
            this.screenInstance.render()
        }
    }
}

(() => {
    try {
        const config = readConfig()
        if (config === undefined) throw Error('Unable to load config file')
        const eth2Dashboard = new Eth2Dashboard(config)
        eth2Dashboard.drawGui()
    } catch (error) {
        console.error(error)
    }
})()
