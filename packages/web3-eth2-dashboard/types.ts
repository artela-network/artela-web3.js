export type ElementId = 'validatorTable'
export type Validator = {
  pubKey: string
  alias: string
}
  
export type GuiConfig = {
  httpProvider: string,
  validators: Validator[]
}
