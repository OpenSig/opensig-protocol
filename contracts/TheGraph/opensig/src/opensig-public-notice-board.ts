import { Signature as PublicNoticeEvent } from "../generated/OpensigPublicNoticeBoard/OpensigPublicNoticeBoard"
import { PublicNotice } from "../generated/schema"

export function handleSignature(event: PublicNoticeEvent): void {
  let entity = new PublicNotice(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.time = event.params.time
  entity.signer = event.params.signer
  entity.nonce = event.params.nonce
  entity.board = event.params.board
  entity.data = event.params.data

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
