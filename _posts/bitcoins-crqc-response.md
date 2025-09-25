---
title: >-
  Bitcoin's CRQC Response Playbook
excerpt: >-
  How should Bitcoiner's react if quantum computers become a reality quicker than expected? The best time to plan is when you have the time to plan! This brief playbook outlines a plan for how Bitcoin can rapidl reach quantum resistance once it appears that CRQCs capable of breaking ECDLP are within striking distance.
coverImage: '/assets/blog/crqc-playbook/bitcoins-crqc-playbook1.png'
date: '2025-09-18T12:00:00.000Z'
author:
  name: Anthony Milton & Clara Shikhelman
ogImage:
  url: '/assets/blog/crqc-playbook/bitcoins-crqc-playbook1.png'
---

# Bitcoin's CRQC Response Playbook

How should Bitcoiner's react if quantum computers become a reality quicker than expected?
The best time to plan is when you have the time to plan!
We put together this playbook to start the discussion on how Bitcoin might rapidly transition to quantum resistance when there is indisputable evidence that CRQCs capable of breaking Bitcoin's ECC cryptographic foundation are on the horizon.
What do you think we got right?
What did we miss?

Contact us on our socials in the footer, or open an issue or PR on the GitHub repo directly: [Bitcoin CRQC Response Playbook](https://github.com/deadmanoz/bitcoin-crqc-response-playbook)

## Introduction and Objectives

This playbook assumes two fundamental premises: that Cryptographically Relevant Quantum Computers (CRQCs) are technically feasible and will be built, and that the activation signal has been triggered through public demonstration of a quantum computer. The activation trigger \- indisputable demonstration of a \~100 logical qubit quantum computer \- provides sufficient warning while maintaining urgency, with about an order-of-magnitude more logical qubits needed to reach the \~1000 logical qubits required for Bitcoin's ECC cryptographic foundation to be within CRQC striking distance.

_**Disclaimer**: the premises outlined here are hypothetical. Neither the authors nor their employer(s) make any assertion that CRQCs will actually be realized, nor that the thresholds described will necessarily be achieved. This playbook is a contingency framework, intended for consideration in the event that such assumptions become reality._

The threat to Bitcoin comes from quantum computers breaking the Elliptic Curve Discrete Logarithm Problem (ECDLP), enabling the derivation of private keys from public keys. Long-range attacks target UTXOs with already-exposed public keys, affecting approximately \~1.7 million BTC in P2PK addresses and \~4.6 million Bitcoin in addresses with exposed public keys. These attacks, feasible at around 1000 logical qubits, could require days or weeks per key derivation but would permit systematically harvesting vulnerable funds. Short-range attacks would attempt to hijack transactions during the brief window between broadcast and confirmation, though these demand significantly more powerful quantum computers operating at speeds that initial CRQCs are not expected to achieve.

Given this threat landscape, our fundamental goal is to **ensure Bitcoin can continue to function as a secure peer-to-peer electronic cash system after CRQCs capable of breaking ECDLP exist**. This requires:

1. Forward protection through quantum-resistant cryptography for all new addresses,
2. Migration capability for users to securely move funds from hash-protected (non-reused) addresses,
3. Management for the \~1.7 million BTC in P2PK (and potential other exposed public key script types), and
4. Network continuity throughout the transition period.

The following playbook, developed through discussions with Core developers and informed by Bitcoin's history of successful protocol upgrades, provides a roadmap for achieving these objectives while respecting Bitcoin's open, rough consensus process.

## Implementation Requirements

The implementation addresses multiple technical requirements for achieving quantum resistance. New consensus rules should prevent the creation of quantum-vulnerable output types to stop the accumulation of quantum-exposed UTXOs. Migration mechanisms such as Commit-Delay-Reveal (CDR)/Lifeboat protocols enable users with hash-protected addresses to safely transition without exposing public keys. Post-quantum signature schemes require selection and integration, balancing security with practical constraints, including signature size and verification time. Management of the \~1.7 million BTC in P2PK addresses and \~4.6 million BTC with otherwise exposed public keys necessitates broad user agreement on “burning” or leaving available for unrestricted “stealing”, or alternative approaches such as Hourglass. Supporting infrastructure, including wallets, exchanges, and block explorers, must be updated to handle new address types and validation rules. Throughout this process, clear communication ensures all stakeholders understand the changes and their implications.

## Three-Team Responsibilities

The response would be organized into three self-coordinating teams, each with primary (though sometimes overlapping) responsibilities.

### Team 1: Core Developers (Dev)

The Core developer team’s role is focused on implementation, turning the established strategies into software for the network to adopt. The main tasks are:

- Implementation of the prohibition of new quantum-vulnerable outputs
- Implementation of the migration techniques for UTXOs vulnerable to short range attacks as necessary (e.g. CDR, Lifeboat)
- Implementation of the chosen post-quantum scheme
- Implementation of the chosen vulnerable address handling strategy
- Making new software available

### Team 2: Bitcoin Cryptographers (Crypt)

The cryptography team aims to enable long-term quantum resistance in Bitcoin through the evaluation and selection of PQC signature scheme(s). Primary tasks include:

- Finalizing quantum-resistant algorithm
- Publish the benefits and limitations of the chosen scheme
- Test the scheme's implementation

### Team 3: Communications Team (Comms)

The communications team comprises Core developers with strong communication skills, industry leaders with technical understanding, and community members actively tracking development progress. Their mandate is to ensure early, constant, and clear messaging about all quantum response measures and the reasoning behind technical decisions. Their main responsibilities will be:

- Communicate that activation was triggered
- Update on the progress of the other teams
- Facilitate the Steal/Burn/Hourglass discussion
- Help users through the migration processes

## Timeline Summary

The following timeline outlines how the three teams coordinate their response after the activation signal triggers. Each timeline increment represents approximately one month. Although specific durations may adjust based on real-world constraints, the sequence and interdependencies remain intact. Basic quantum resistance is achieved within 4-5 months, with full migration extending through month 12.

![Bitcoin's CRQC Response Timeline](/assets/blog/crqc-playbook/bitcoin-crqc-response-timeline.png)
