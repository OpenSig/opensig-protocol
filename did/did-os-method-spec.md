# OpenSig DID Method Specification

## 1. DID Method Name

The name of this DID method is: `os`

A DID that uses this method MUST begin with the following prefix:  
```
did:os:
```

## 2. Method Purpose

The `did:os` method defines a decentralized identifier format for use by the [OpenSig](https://opensig.net) project, a blockchain-based e-signature and notary system designed for non-Web3 users. 

OpenSig identities are cryptographic keys on supported blockchain networks and are used to sign digital documents in a way that ensures **proof of existence**, **proof of possession**, and **non-repudiation**, without exposing the document or requiring centralized infrastructure. Specifying OpenSig identities as DIDs allows the project to onboard it's users onto multiple Web3 applications.

## 3. Method Specification

### 3.1. DID Scheme

An OpenSig DID conforms to this format:

```
did:os:[<chain-id>:]<b58-encoded-address>
```

Where:
- `<chain-id>` is an optional identifier for the blockchain network (e.g., `1` for Ethereum mainnet, `137` for Polygon). If omitted, the default is Polygon (`137`).
- `<b58-encoded-address>` is the Base58-encoded form of the signer’s blockchain address.

Examples:
```
did:os:137:2m7abdAX7eUfrrxhSRRtMPz54bFL
did:os:2m7abdAX7eUfrrxhSRRtMPz54bFL  (defaults to Polygon)
```

The address MUST decode to a valid Ethereum-compatible 20-byte address.

### 3.2. Method Operations

#### Creating DIDs

A DID is created from the controller's EOA or smart account address that is used to publish signatures to the OpenSig registry. Authorisation is autmatically granted by the EVM in the case of EOAs (`msg.sender` = signer), and by the validator in the case of smart accounts.

DID documents are currently resolved dynamically from on-chain state and support authorisation of secp256k1 keys only. Future features may allow more complex DID documents to be created and verified.

#### Resolving DIDs

In the case of DIDs encoding an EOA address only the EOA itself is authorised to sign. This can be resolved dynamically by decoding the base58 address from the DID and generating a DID document.

In the case of smart accounts, authorisation of an approved signer (ecdsa secp256k1 address) is resolved directly from the smart account. The account's ERC-1271 `isValidSignature(hash, sig)` method confirms authorisation and allows a DID document to be constructed and returned.

For example, on receiving an application-specific request to resolve:

1. Recover signer of request.
2. Extract DID from request.
3. Convert DID to chainId and wallet address.
4. Call account's `isValidSignature` method.
5. If it returns success construct a DID document appropriate to the request.
6. Return DID document to the consumer.

```json
{
  "@context": "https://www.w3.org/ns/did/v1.1",
  "id": "did:os:2m7abdAX7eUfrrxhSRRtMPz54bFL",
  "verificationMethod": [{
    "id": "did:os:2m7abdAX7eUfrrxhSRRtMPz54bFL#ownerKey",
    "type": "EcdsaSecp256k1RecoveryMethod2020",
    "controller": "did:os:2m7abdAX7eUfrrxhSRRtMPz54bFL",
    "blockchainAccountId": "eip155:1:0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf"
  }],
  "authentication": [
    "did:os:2m7abdAX7eUfrrxhSRRtMPz54bFL#ownerKey"
  ],
  "expires": "2025-06-10T20:59:59Z"
}
```

#### Updating DIDs

OpenSig DIDs represent EOAs and smart accounts and as such cannot be updated (although new ones can be created).

DID documents are currently resolved dynamically and therefore represent the latest on-chain state. It is important that DID documents expire quickly to avoid stale permissions.

#### Deactivating DIDs

There is no method to directly deactivate a DID in the OpenSig protocol.

A smart account can be deactivated by removing all authorised keys from its validators. This will prevent any DID document from being resolvable.

## 4. Security Considerations

- The authenticity of a `did:os` identity is established solely through ownership of the private key corresponding to the underlying blockchain address or private key authorised to sign on behalf of a smart account.
- Key rotation can be achieved through the uer's smart account.
- Because addresses are notarised in OpenSig signature chains, identities are pseudonymous unless voluntarily de-anonymized via annotations or off-chain services.

## 5. Privacy Considerations

- `did:os` identifiers do not expose any metadata or support automatic discovery.
- The format supports full anonymity unless the user explicitly includes identifying data in a signature annotation.
  
## 7. Reference Implementation

OpenSig uses `did:os` identifiers in the signing and verification of documents. The reference implementation is open source and available at:  
[https://github.com/opensig/opensig-ts](https://github.com/opensig/opensig-ts)

## 8. Contact

- Email: [info@opensig.net](mailto:info@opensig.net)
