import { Signature as SignatureEvent } from "../generated/OpensigRegistry/OpensigRegistry"
import { Signature } from "../generated/schema"

export function handleSignature(event: SignatureEvent): void {
  let entity = new Signature(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.time = event.params.time
  entity.signer = event.params.signer
  entity.signature = event.params.signature
  entity.data = event.params.data

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
