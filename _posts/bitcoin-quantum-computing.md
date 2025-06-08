---
title: 'Bitcoin and Quantum Computing: Current Status and Future Directions'
excerpt: 'Is Bitcoin ready for the quantum computing era? This report explores the threats posed by cryptographically relevant quantum computers (CRQCs) and outlines a strategic path forward for Bitcoin to become quantum resistant.'
coverImage: '/assets/blog/post1/pqc-report-cover.png'
coverImageLink: 'https://chaincode.com/bitcoin-post-quantum.pdf'
date: '2025-05-27T12:00:00.000Z'
author:
  name: Anthony Milton & Clara Shikhelman
ogImage:
  url: '/assets/blog/post1/pqc-report-cover.png'
---

# Key takeaways

## Timeline ⏱️
Experts project cryptographically relevant quantum computers (CRQCs) may emerge by 2030–2035; the report proposes a dual-track strategy to ensure Bitcoin’s quantum readiness:
- A minimal contingency path (~2 years) for rapid response to unexpected breakthroughs.
- A comprehensive path (~7 years) to develop and refine optimal PQC solutions

![Bitcoin Timelines](/assets/blog/post1/pq-bitcoin-timelines.png)

## Elliptic Curve Cryptography (ECC) Weakness❗
The ECC-based signatures used in Bitcoin are vulnerable to being broken by CRQCs, putting an estimated 4-10 million BTC ($400B-$1T) at risk - representing 20-50% of Bitcoin's ~19.9 million total supply. Funds most vulnerable to CRQCs are large institutional and exchange holdings, where public keys have been exposed due to "address reuse" practices, and Satoshi-era funds due to script type.

## Bitcoin Mining Resilience 💪
The use and impact of quantum computers for Bitcoin mining, quantum mining, is a different story. Quantum miners would have to compete with highly specialized and optimised ASICs. Grover’s algorithm offers a limited advantage and can’t be parallelized like classical mining. Mining is expected to remain more quantum-resilient than transaction signatures.

## Burn vs. Steal Dilemma 🤔
Preparing Bitcoin for CRQCs isn’t just a technical challenge, it’s a philosophical one. Should quantum-vulnerable coins be burned or allowed to be stolen by those with CRQCs? This question strikes at bitcoin’s core principles of property rights, censorship resistance, and conservatism, and may be the most significant test of Bitcoin's decentralized governance model to date.

## Post Quantum Cryptography (PQC) Efforts in Bitcoin 🧑‍💻
Several leading cryptographers and Bitcoin developers have been joined by a number of new and enthusiastic contributors to design, develop and discuss approaches for Bitcoin’s quantum readiness. While there are a number of existing proposals, this is a rapidly evolving area of research, so it is expected that there will be many improvements in PQC and its application to Bitcoin in the near future.

## Moving Forward ⏩
This report shows that the Bitcoin community has long been aware of the threat posed by CRQCs and has been debating and discussing Bitcoin’s response for some time. However, the window for careful, deliberate action exists today, and will narrow as quantum computing advances. This makes proactive preparation not merely prudent, but essential for Bitcoin's long-term survival.

Read the full report here: [Chaincode Labs: Post-Quantum Bitcoin](https://chaincode.com/bitcoin-post-quantum.pdf)
