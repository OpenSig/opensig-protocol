# OpenSig DID Method Specification

## 1. DID Method Name

The name of this DID method is: `os`

A DID that uses this method MUST begin with the following prefix:  
```
did:os:
```

## 2. Method Purpose

The `did:os` method defines a decentralized identifier format used by the [OpenSig](https://opensig.net) project, a blockchain-based e-signature and notary system. OpenSig identities are cryptographic keys on supported blockchain networks and are used to sign digital documents in a way that ensures **proof of existence**, **proof of possession**, and **non-repudiation**, without exposing the document or requiring centralized infrastructure.

## 3. Method Specification

### 3.1. DID Syntax

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

### 3.2. DID Document

The `did:os` method **does not define** a DID resolution mechanism or DID documents. The DID itself serves as a stable identifier for a blockchain EOA or smart account and does not imply the existence or discoverability of metadata.

This is intentional and aligned with OpenSig’s goals:
- Privacy: No off-chain or on-chain resolution to metadata.
- Simplicity: No additional infrastructure is needed to use or verify signatures.

OpenSig applications MAY interpret additional metadata (e.g. public keys, display names, services) **only if** a `did:os` DID is associated with an external DID document by explicit user configuration. However, this is out of scope of this specification.

## 4. Security Considerations

- The authenticity of a `did:os` identity is established solely through ownership of the private key corresponding to the underlying blockchain address or private key authorised to sign on behalf of a smart account.
- Since no DID document is involved, there is no support for key rotation or service endpoints.
- Because addresses are notarised in OpenSig signature chains, identities are pseudonymous unless voluntarily de-anonymized via annotations or off-chain services.

## 5. Privacy Considerations

- `did:os` identifiers do not expose any metadata or support automatic discovery.
- The format supports full anonymity unless the user explicitly includes identifying data in a signature annotation.
- 
## 6. Method Control

Control over a `did:os` identifier is determined entirely by possession of the private key corresponding to the blockchain address encoded in the DID, or of a private key authorised to sign on behalf of a smart account. The DID cannot be updated or revoked except through control of the associated blockchain account.

## 7. Reference Implementation

OpenSig uses `did:os` identifiers in the signing and verification of documents. The reference implementation is open source and available at:  
[https://github.com/opensig/opensig-ts](https://github.com/opensig/opensig-ts)

## 8. Contact

- Email: [info@opensig.net](mailto:info@opensig.net)
