# OpenSig Protocol

**OpenSig Protocol** is the open standard that underpins the OpenSig ecosystem — a blockchain-based digital signature and notary system designed for privacy, security, and interoperability.

This repository defines the specifications and standards used by OpenSig applications, including the protocol standard, DID method (`did:os`), and registry contract interface.

## 📘 Specifications

| Area         | Description                                   | Spec File |
|--------------|-----------------------------------------------|-----------|
| OpenSig Standard | Details the OpenSig hash chain structure, data encoding, and encryption model | [`standard/opensig-standard.md`](standard/opensig-standard.md) |
| DID Method   | Defines the `did:os` decentralized identifier format for OpenSig identities | [`did/did-os-method-spec.md`](did/did-os-method-spec.md) |
| Registry Contract | Reference contract and ABI/interface for the OpenSig on-chain registry | [contracts/OpensigRegistry.sol](contracts/OpensigRegistry.sol) |

## 🎯 Goals

- ✅ **Open**: Free to use, implement, and build upon — no gatekeeping or licensing fees.
- 🔐 **Private**: Designed to maximize user privacy; no need to upload documents or expose metadata.
- 🔁 **Interoperable**: Supports multiple blockchains and can be extended for use in cross-chain or federated systems.
- 🔍 **Deterministic**: Signatures can be verified independently with only the original document and chain data. No vendor lock-ins.

## 📦 Reference Implementations

- [`opensig-ts`](https://github.com/opensig/opensig-ts): TypeScript client SDK
- [`opensig-js`](https://github.com/opensig/opensig-js): Javascript client SDK (now depreciated in favour of opensig-ts)

## 📜 License

All specifications in this repository are published under the [Creative Commons Attribution 4.0 International License (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

© 2025 OpenSig

## 🤝 Contributing

Contributions, feedback, and discussion are welcome! Open an issue, submit a pull request or join us:

- Email: [info@opensig.net](mailto:info@opensig.net)

## 🌐 Learn More

- 🌍 Website: [https://opensig.net](https://opensig.net)
- 📖 Docs: (Coming soon)
