import { TransferWithPurpose as TransferEvent } from "../generated/CreditManager/CreditManager"
import { CreditEvent } from "../generated/schema"

export function handleTransfer(event: TransferEvent): void {
  let entity = new CreditEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value
  entity.purpose = event.params.purpose // Handle purpose if available
 
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
