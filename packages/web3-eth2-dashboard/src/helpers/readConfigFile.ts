import { existsSync, readFileSync } from 'fs'

import { writeConfig } from './writeConfigFile'
import configTemplate from './configTemplate.json'

const homedir = require('os').homedir();
const configFilePath = `${homedir}/.config/web3-eth2-dashboard.txt`

export const readConfig = (regenerateConfig: boolean = false) => {
    try {
        if (regenerateConfig || !existsSync(configFilePath)) {
            writeConfig(configTemplate)
            return configTemplate
        }
        return JSON.parse(readFileSync(configFilePath).toString())
    } catch (error) {
        console.error(`Error reading config file: ${error}`)
    }
}
