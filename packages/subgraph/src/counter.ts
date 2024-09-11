import { NumberChanged as NumberChangedEvent } from "../generated/Counter/Counter"
import { NumberChanged } from "../generated/schema"

export function handleNumberChanged(event: NumberChangedEvent): void {
  let entity = new NumberChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newNumber = event.params.newNumber

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
