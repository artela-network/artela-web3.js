export interface configValidator {
    pubKey: string
    alias: string
  }
  
export interface guiConfig {
  httpProvider: string,
  validators: configValidator[]
}

export type ElementId = 'validatorTable'
