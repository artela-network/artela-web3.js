import {
  Slot,
  Root,
  Genesis,
  Fork,
  FinalityCheckpoints,
  Validator,
  ValidatorResponse,
  ValidatorBalance,
  Epoch,
  BeaconCommitteeResponse,
  SignedBeaconHeaderResponse,
  Attestation,
  CommitteeIndex,
  IndexedAttestation,
  ProposerSlashing,
  SignedVoluntaryExit
} from '@chainsafe/lodestar-types'

import { BaseAPISchema, ETH2BaseOpts } from 'web3-eth2-core'

export type StateId = 'head' | 'genesis' | 'finalized' | 'justified' | Slot | Root
export type BlockId = 'head' | 'genesis' | 'finalized' | Slot | Root

export type BalanceHistory = {
  balance: number
  effectivebalance: number
  epoch: number
  validatorindex: number
  week: number
}

export type BalanceHistoryResponse = BalanceHistory[]

export type PerformanceResponse = {
  balance: number
  performance1d: number
  performance7d: number
  performance31d: number
  performance365d: number
  rank7d: number
  validatorIndex: number
}

export class BlockExplorerApi {
  constructor()

  getValidatorsForEth1Address(params: {address: string}): any
  getTop100Validators(): any
  getValidatorAttestations(params: {validatorIndexOrPubKey: string}): any
  getValidatorBalanceHistory(params: {validatorIndexOrPubKey: string}): any
  getValidatorPerformance(params: {validatorIndexOrPubKey: string}): Promise<PerformanceResponse>
  getValidatorProposals(params: {validatorIndexOrPubKey: string}): any
}

export class ETH2BeaconChain {
  constructor(
    provider: string,
    schema?: BaseAPISchema,
    opts?: ETH2BaseOpts
  )

  getGenesis(): Promise<Genesis | null>
  getHashRoot(params: {stateId: StateId}): Promise<{ root: Root }>
  getForkData(params: {stateId: StateId}): Promise<Fork>
  getFinalityCheckpoint(params: {stateId: StateId}): Promise<FinalityCheckpoints>
  getValidators(params: {stateId: StateId}): Promise<Validator[]>
  getValidatorById(params: {stateId: StateId, validatorId: string}): Promise<ValidatorResponse>
  getValidatorBalances(params: {stateId: StateId}): Promise<ValidatorBalance>
  getEpochCommittees(params: {stateId: StateId, epoch: Epoch}): Promise<BeaconCommitteeResponse>
  getBlockHeaders(): Promise<SignedBeaconHeaderResponse[]>
  getBlockHeader(params: {blockId: BlockId}): Promise<SignedBeaconHeaderResponse>
  publishSignedBlock(): Promise<void>
  getBlock(params: {blockId: BlockId}): Promise<SignedBeaconHeaderResponse>
  getBlockRoot(params: {blockId: BlockId}): Promise<Root>
  getBlockAttestations(params: {blockId: BlockId}): Promise<Attestation>
  getAttestationsFromPool(params: {slot: Slot, committee_index: CommitteeIndex}): Promise<Attestation[]>
  submitAttestation(): Promise<void>
  getAttesterSlashings(): Promise<{ [index: string]: IndexedAttestation }>
  submitAttesterSlashings(): Promise<void>
  getProposerSlashings(): Promise<ProposerSlashing[]>
  submitProposerSlashings(): Promise<void>
  getSignedVoluntaryExits(): Promise<SignedVoluntaryExit[]>
  submitVoluntaryExit(): Promise<void>
  addBlockExplorerApi(): void
  blockExplorerApi: BlockExplorerApi
}
