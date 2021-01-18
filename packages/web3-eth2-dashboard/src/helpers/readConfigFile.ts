import { existsSync, readFileSync } from 'fs'

import { writeConfig } from './writeConfigFile'
import configTemplate from './configTemplate.json'

const configFilePath = '~/.config/eth2cli.txt'

export const readConfig = (regenerateConfig: boolean = false) => {
    try {
        if (regenerateConfig || !existsSync(configFilePath)) {
            writeConfig(configTemplate, true)
            return configTemplate
        }
        return readFileSync(configFilePath)
    } catch (error) {
        console.error(`Error reading config file: ${error}`)
    }
}
