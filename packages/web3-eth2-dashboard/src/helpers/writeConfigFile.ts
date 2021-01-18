import { existsSync, writeFileSync } from 'fs'

import { readConfig } from './readConfigFile'

const homedir = require('os').homedir();
const configFilePath = `${homedir}/.config/web3-eth2-dashboard.txt`

export const writeConfig = (jsonData: Object, overwrite: boolean = false) => {
    try {
        let combinedConfig
        if(!overwrite && existsSync(configFilePath)) {
            const config = readConfig()
            combinedConfig = {...config, ...jsonData}
        }

        writeFileSync(configFilePath, JSON.stringify(combinedConfig) || JSON.stringify(jsonData))
    } catch (error) {
        console.error(`Error writing config file: ${error}`)
    }
}
