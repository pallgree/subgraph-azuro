import { BigInt } from '@graphprotocol/graph-ts'
import {
    core,
    AllConditionsStopped,
    ConditionCreated,
    ConditionResolved,
    ConditionShifted,
    ConditionStopped,
    Initialized,
    LpChanged,
    MaintainerUpdated,
    MaxBanksRatioChanged,
    OracleAdded,
    OracleRenounced,
    OwnershipTransferred,
} from '../generated/core/core'
import { ExampleEntity, Profit } from '../generated/schema'

export function handleAllConditionsStopped(event: AllConditionsStopped): void {
    // Entities can be loaded from the store using a string ID; this ID
    // needs to be unique across all entities of the same type
    let entity = ExampleEntity.load(event.transaction.from.toHex())

    // Entities only exist after they have been saved to the store;
    // `null` checks allow to create entities on demand
    if (!entity) {
        entity = new ExampleEntity(event.transaction.from.toHex())

        // Entity fields can be set using simple assignments
        entity.count = BigInt.fromI32(0)
    }

    // BigInt and BigDecimal math are supported
    entity.count = entity.count + BigInt.fromI32(1)

    // Entity fields can be set based on event parameters
    entity.flag = event.params.flag

    // Entities can be written to the store with `.save()`
    entity.save()

    // Note: If a handler doesn't require existing field values, it is faster
    // _not_ to load the entity from the store. Instead, create it fresh with
    // `new Entity(...)`, set the fields that should be updated and save the
    // entity back to the store. Fields that were not set or unset remain
    // unchanged, allowing for partial updates to be applied.

    // It is also possible to access smart contracts from mappings. For
    // example, the contract that has emitted the event can be connected to
    // with:
    //
    // let contract = Contract.bind(event.address)
    //
    // The following functions can then be called on this contract to access
    // state variables and other data:
    //
    // - contract.LP(...)
    // - contract.activeConditions(...)
    // - contract.allConditionsStopped(...)
    // - contract.bets(...)
    // - contract.calculateOdds(...)
    // - contract.ceil(...)
    // - contract.conditions(...)
    // - contract.defaultMargin(...)
    // - contract.defaultReinforcement(...)
    // - contract.getBetInfo(...)
    // - contract.getCondition(...)
    // - contract.getConditionFunds(...)
    // - contract.getConditionReinforcement(...)
    // - contract.getMargin(...)
    // - contract.getOddsFromBanks(...)
    // - contract.getReinforcement(...)
    // - contract.isOracle(...)
    // - contract.isOutComeCorrect(...)
    // - contract.lastConditionId(...)
    // - contract.maintainers(...)
    // - contract.marginAdjustedOdds(...)
    // - contract.maxBanksRatio(...)
    // - contract.multiplier(...)
    // - contract.oracleConditionIds(...)
    // - contract.oracles(...)
    // - contract.owner(...)
    // - contract.putBet(...)
    // - contract.resolvePayout(...)
    // - contract.sqrt(...)
    // - contract.viewPayout(...)
}

export function handleConditionCreated(event: ConditionCreated): void {}

export function handleConditionResolved(event: ConditionResolved): void {
    let entity = Profit.load('1');
    if (!entity) {
        entity = new Profit('1')
        entity.totalValue = event.params.amountForLp
        entity.save()
        return
    }
    entity.totalValue = entity.totalValue.plus(event.params.amountForLp)
    entity.save()
}

export function handleConditionShifted(event: ConditionShifted): void {}

export function handleConditionStopped(event: ConditionStopped): void {}

export function handleInitialized(event: Initialized): void {}

export function handleLpChanged(event: LpChanged): void {}

export function handleMaintainerUpdated(event: MaintainerUpdated): void {}

export function handleMaxBanksRatioChanged(event: MaxBanksRatioChanged): void {}

export function handleOracleAdded(event: OracleAdded): void {}

export function handleOracleRenounced(event: OracleRenounced): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
