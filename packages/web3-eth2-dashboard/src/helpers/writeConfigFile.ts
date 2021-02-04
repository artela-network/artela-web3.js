import { writeFileSync } from 'fs'

const homedir = require('os').homedir();
const configFilePath = `${homedir}/.config/web3-eth2-dashboard.txt`

export const writeConfig = (jsonData: Object) => {
    try {
        writeFileSync(configFilePath, JSON.stringify(jsonData))
    } catch (error) {
        console.error(`Error writing config file: ${error}`)
    }
}
