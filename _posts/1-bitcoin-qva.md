---
title: >-
  Quantifying Bitcoin's Quantum Vulnerability
excerpt: >-
  Analysis of the Bitcoin blockchain reveals that as of block 900,000, some 6.51 million BTC (32.7% of total supply) is vulnerable to quantum computing attacks, representing over $700 billion at current valuations. Almost 70% of this at-risk Bitcoin is due to the practice of address reuse.
coverImage: '/assets/blog/qva1/quantum_vulnerability_breakdown.png'
date: '2025-07-01T12:00:00.000Z'
hidden: true
author:
  name: Anthony Milton & Clara Shikhelman
ogImage:
  url: '/assets/blog/qva1/quantum_vulnerability_breakdown.png'
---

# Executive Summary

As of block 900,000 (June 6, 2025), *~6.51M BTC (32.7% of total supply)* remains vulnerable to [[long-range quantum computing attacks||Long-range attacks target funds associated with public keys that are already exposed]], representing *over $700 billion* at current valuations.
This comprehensive analysis reveals a concerning concentration of risk: while nearly a third of all Bitcoin is immediately quantum-vulnerable, the top 1000 addresses alone account for *~2.73M BTC (41.9%)* of all vulnerable funds despite controlling only 30.9% of the total Bitcoin supply.

Our analysis reveals that almost *70% of immediately quantum-vulnerable Bitcoin is due to the practice of address reuse*, with the remainder largely attributable to inherently vulnerable script types and public key exposure on Bitcoin forks.

## Overall Quantum Vulnerability Breakdown

- **Address Reuse: 4.49M BTC (69%)**
  - Affects P2PKH, P2SH, P2WPKH, and P2WSH addresses where public keys have been exposed through spends
  - *Represents an entirely preventable risk through proper address hygiene*
- **Inherently Vulnerable Scripts: 1.87M BTC (28.8%)**
  - P2PK: 1.72 M BTC - Primarily Satoshi-era mining rewards (pre-2011)
  - 153 K BTC due to P2TR (Taproot addresses with exposed tweaked keys), only 69 BTC due to P2MS (legacy raw multisig outputs)
- **Bitcoin Cash Fork Exposure: 0.15M BTC (2.3%)**
  - UTXOs spent on BCH but remaining unspent on Bitcoin
  - Public key exposure despite no address reuse on Bitcoin itself

## Top 1000 Address Findings

- 29.4% (294) of the top 1000 addresses have exposed public keys via reuse, controlling *~45% (~2.73M BTC)* of funds held by these addresses
- Exchange-related addresses in the top 1000 show alarming reuse patterns: *~90.4% of identified exchange funds are in reused addresses*

We emphasize that address reuse is an entirely avoidable risk that, unlike inherently vulnerable script types or fork exposure, can be significantly reduced today through behavioral changes and established best practices.

# Introduction

In our report [Bitcoin and Quantum Computing: Current Status and Future Directions](bitcoin-quantum-computing), we provided an extensive overview of the various facets of the quantum computing threat to Bitcoin.
In this follow-up work, we dig deeper into the data to more comprehensively quantify Bitcoin's quantum-vulnerable funds through two complementary analyses:
1) **Comprehensive UTXO Analysis**: We establish an up-to-date loose lower bound on the total amount of quantum-vulnerable funds (~6.51M BTC) and break down the contributors to this value: address reuse, public key exposure due to spends on the Bitcoin Cash fork, and inherently vulnerable script types.
We explore the historical patterns of script use and reuse behavior, showing that despite long-standing recommendations to avoid address reuse, rates have remained relatively consistent over the analyzed period (almost 10 years).
2) **Top 1000 Address Analysis**: We examine data of the top 1000 addresses by value, finding that around 45% of these addresses, representing ~2.73M BTC, are quantum-vulnerable.
There are numerous holdings of 10,000s - 100,000s of BTC that are vulnerable due to reuse, with many such holdings attributed to exchanges and institutions.

[[Almost all spendable funds||Some spendable funds are based on hash pre-image puzzles, where just the pre-image that hashes to a specific value is needed to spend, and no signature is required]] in Bitcoin are quantum-vulnerable due to the fact that they use ECC-based digital signatures, which could be broken by [[Cryptographically Relevant Quantum Computers (CRQCs)||Cryptographically Relevant Quantum Computers
(CRQC) are quantum computers that are powerful enough to break widely used cryptographic primitives such as ECC upon which Bitcoin's digital signatures are currently based]].
However, some funds are much more vulnerable than others.
Typically, the phrase 'quantum-vulnerable' (or QV) is used in relation to those funds that are vulnerable to **long-range attacks**.
Long-range attacks target funds associated with public keys that are already exposed in some way, making these funds perpetually vulnerable until moved to address types that don't reveal public keys on-chain.
This includes funds associated with inherently vulnerable script types such as P2PK, P2MS, and P2TR (keys are exposed upon receival of funds), funds that belong to reused addresses, and funds that belong to addresses that have been spent on forks of Bitcoin, such as Bitcoin Cash.

[[All other funds||Funds encumbered by other script types, including P2PKH, P2SH, P2WPKH, P2WSH]] are only vulnerable to **short-range attacks**, also known as front-running attacks or transaction hijacking attacks.
These can occur within the limited timeframe when transactions reveal previously concealed public keys during spending, requiring an attacker with a CRQC to derive the private key within a narrow window of time.
An attacker would thus need to possess a CRQC that is capable of deriving the private key corresponding to a public key in the period of time after a transaction has been broadcast and before it has been confirmed, or if the attacker possesses the capacity to perform small-scale reorgs, within a short time frame after the transaction has been confirmed.
See Section 4, **Threat Model: Quantum Risk to Bitcoin**, of [the report](bitcoin-quantum-computing) for further details of both long-range and short-range attacks.

## Data and Definitions
For the purposes of this work, address reuse is defined as an address that has one or more UTXOs associated with it, but also has one or more spends from it in its history.
Spends reveal, and permanently record, public keys on the blockchain.

This analysis was performed using the Bitcoin blockchain and the Bitcoin Cash blockchain as available on Google's BigQuery (`bigquery-public-data.crypto_bitcoin` and `bigquery-public-data.crypto_bitcoin_cash`, respectively).
The UTXO set was re-constructed for block heights from 400,000 to 900,000, in 50,000 block increments.
The Bitcoin Cash fork exposure analysis was performed for all analyzed block heights from 500,000 onwards (the fork occurred at block 478,558).
The top address data from BitInfoCharts' Rich List (including address labels) was obtained at block height ~900,500 (June 10, 2025).

Non-standard scripts, and scripts that were found to have an unknown witness version, are not included in the breakdown of script types in the following analysis.
At block height 900,000 (June 6, 2025), there were around 21,000 non-standard scripts in the UTXO set securing ~2600 BTC, and ~1,000 scripts that had an unknown witness version encumbering ~0.001 BTC.

# Quantum Vulnerability Breakdown

The crux of Bitcoin's vulnerability to CRQCs is that CRQCs have the potential to derive a private key from a public key; an attacker with a CRQC could derive a private key and then create and broadcast a transaction that spends the victim's funds to an address they control.

For an attacker to do this, they need access to the victim's public key in the first place. Fortunately for potential attackers, the Bitcoin blockchain serves as a permanent, public repository of millions of exposed public keys.
Every time a Bitcoin user spends from an address and then receives funds back to that same address ("address reuse"), they provide future quantum adversaries with unrestricted access to their public key.
Add to this inherently vulnerable script types that expose public keys by default (P2PK, P2MS, and P2TR) and cross-chain exposure from Bitcoin forks, we find an attack surface encompassing 32.73% of all Bitcoin in existence!

![Figure: Breakdown of quantum-vulnerable Bitcoin at block height 900,000](/assets/blog/qva1/quantum_vulnerability_breakdown.png){#fig:quantum-vulnerability-breakdown}

The top-left of {@fig:quantum-vulnerability-breakdown} shows the contribution each of the three categories of quantum-vulnerable Bitcoin makes to the total quantum-vulnerable Bitcoin.
Address reuse is the largest contributor, accounting for ~69% of the total quantum-vulnerable Bitcoin.
This is followed by inherently vulnerable script types, which account for ~28.8% of the total quantum-vulnerable Bitcoin.
Bitcoin Cash fork exposure accounts for ~2.3% of the total quantum-vulnerable Bitcoin.

The bottom-right chart of {@fig:quantum-vulnerability-breakdown} shows that address reuse occurs across all hashed script types (P2PKH, P2SH, P2WPKH, P2WSH).
For the inherently vulnerable script types in the top-right of {@fig:quantum-vulnerability-breakdown}, the majority of quantum-vulnerable funds (>90%) is due to the legacy P2PK script type, which is a script type that was used in the Satoshi-era of Bitcoin, primarily for mining rewards.

Although small in percentage terms, a still significant amount of BTC (~0.15M), is quantum-vulnerable due to Bitcoin Cash fork exposure.
These funds are vulnerable due to the fact that they have been spent on the Bitcoin Cash fork, thus revealing and recording public keys on the Bitcoin Cash blockchain, but remain unspent and in the UTXO set of Bitcoin.
Note that at the time of the fork, only 4 script types (ignoring non-standard scripts) were available on Bitcoin: P2PK, P2MS, P2SH, and P2PKH.
And because P2PK and P2MS already have public keys exposed by default, only P2SH and P2PKH spends on Bitcoin Cash are accounted for in this exposure analysis; the breakdown is shown in the bottom-right of {@fig:quantum-vulnerability-breakdown}.

# Quantum Vulnerability Over Time

The following vizualisations show the breakdown and trends in quantum-vulnerable Bitcoin over time, since block height 400,000, almost 10 years ago.
The impact of Bitcoin Cash fork exposure is dramatically obvious from the block height 500,000 sample, revealing a significant increase in quantum vulnerability from that point.

![Figure: Total quantum-vulnerable Bitcoin over time from block height 400,000 to 900,000. The red line shows Bitcoin-only vulnerabilities, while the pink bars show total vulnerability, including Bitcoin Cash fork exposure. The dramatic spike at block 500,000 reveals the immediate impact of the Bitcoin Cash fork, which exposed an additional 3.11M BTC to quantum risk.](/assets/blog/qva1/quantum_vulnerable_btc.png){#fig:quantum-vulnerable-btc}

{@fig:quantum-vulnerable-btc} reveals the impact of the Bitcoin Cash fork on total funds that are immediately quantum-vulnerable.
Between block heights 450,000 (January 2017) and 500,000 (December 2017), quantum-vulnerable funds jumped dramatically from 5.57M BTC to 8.52M BTC.
At block height 500,000, some ~21,000 blocks after the fork, 3.1M BTC had been spent on Bitcoin Cash, but remained unspent on Bitcoin.

Following the Bitcoin Cash fork spike, the total number of quantum-vulnerable funds has generally been falling from its peak of 8.52M BTC, as users gradually moved their fork-exposed funds to new addresses.
However, the {{red:red line}} in {@fig:quantum-vulnerable-btc} reveals a concerning trend, especially after block height 700,000 (September 2021): quantum-vulnerable funds from Bitcoin-native sources have been steadily increasing.

With the Taproot upgrade activating at block height 709,632 (Nov 2021), it would be reasonable to assume that the increase in quantum-vulnerable funds would be due to the adoption of the P2TR script type, but this is actually not the case - it's primarily due to an increase in address reuse!

![Figure: Percentage contribution of quantum vulnerability sources over time.](/assets/blog/qva1/quantum_vulnerability_percentage_breakdown_with_bch.png){#fig:quantum-vulnerability-percentage-breakdown}

{@fig:quantum-vulnerability-percentage-breakdown} shows that the percentage contribution of the combined inherently vulnerable script types, the {{red:red (Legacy Scripts: P2PK, P2MS)}} and {{lightblue:blue (Taproot: P2TR)}} regions, has remained relatively constant for some time.
It also shows that the percentage contribution of vulnerability due to reuse has been on the increase since the Bitcoin Cash fork, though this is primarily due to a comparable reduction in the contribution of Bitcoin Cash fork exposure.

# Address Reuse Analysis

![Figure: The total amount of Bitcoin in reused addresses over time. Hashed Script Types Only includes only P2PKH, P2SH, P2WPKH and P2WSH. All Script Types includes these hashed script types, as well as P2PK, P2MS and P2TR.](/assets/blog/qva1/reused_btc_comparison.png){#fig:reused-btc-comparison}

{@fig:reused-btc-comparison} shows the growth in the total amount of Bitcoin in reused addresses over time.
As this analysis relies solely on on-chain data, we cannot definitively explain the large increase in reuse between block heights 500,000 (December 2017) and 550,000 (November 2018), and then again from block height 750,000 (August 2022) until now (900,000).
However, we can look to the broader history of Bitcoin to understand why this might be the case.

The first period, 500,000-550,000, appears to directly correlate with Bitcoin's first mainstream adoption wave.
This era saw a large influx of retail investors that perhaps lacked either the technical knowledge or the wallet tools to implement best practices, and also associated growth in cryptocurrency exchanges and custodial services, many of which implemented address reuse for operational simplicity and customer fund management.

The most recent period, since 750,000, with a particular escalation sometime after 800,000 (July 2023), correlates with the increasing institutionalization and financialization of Bitcoin in this period.
Notably, the January 2024 (corresponding to a block height of ~825,000) approval of 11 spot Bitcoin ETFs, perhaps transformed address reuse patterns at scale from this date.

With Bitcoin ETFs being instruments that involve the direct buying and selling of the underlying Bitcoin, and with institutional systems favoring operational efficiency and regulatory compliance over privacy considerations, it seems reasonable to hypothesize that increased address reuse is related to such players transacting with Bitcoin in this period.

# Top 1000 Addresses Quantum Vulnerability Assessment

This analysis examines the quantum-vulnerability profile of the top 1000 Bitcoin addresses by balance as of block height ~900,500 (June 10, 2025).
These top 1000 addresses account for ~6.08M BTC (over $650 billion), representing 30.88% of the entire Bitcoin supply.
The top address, belonging to Binance, held a balance of 248,598 BTC.
The 1000th address held a balance of 1,738 BTC.

As {@fig:top-1000-breakdown} shows, address reuse is clearly the main source of quantum vulnerability for the top 1000 addresses.
Of the top 1000 addresses, ~29% (294) of the addresses, representing ~45% (~2.73M BTC) of the total funds held, have exposed public keys via reuse, with a further ~0.4% (~22.6K BTC) of the total funds held by the top 1000 addresses using inherently vulnerable script types (only P2TR).

![Figure: Breakdown of address reuse status of the top 1000 addresses by both address count and by BTC holdings.](/assets/blog/qva1/top_1000_breakdown.png){#fig:top-1000-breakdown}

Reconciling the top 1000 address data with the earlier quantum-vulnerability analysis, of the ~6.51M BTC that is quantum-vulnerable, ~2.73M BTC is held by the top 1000 addresses.
This represents a disproportionate ~41.9% of the total quantum-vulnerable funds, considering the top 1000 addresses only account for ~30.9% of the total Bitcoin supply.
In addition, the 29.4% reuse rate among top holders exceeds the ~15-20% global address reuse rate (see Figure XX in the Appendix), indicating that large holders currently employ operational practices that increase quantum vulnerability.

# Labeled Entity Holdings in Top 1000 Addresses

It should be emphasized that the following is based on the labels assigned to the addresses by BitInfoCharts Rich List.
It is extremely likely that the labels are not 100% accurate and that many of the unlabeled addresses are actually held by exchanges or institutional custodians.
With that caveat in mind, the following analysis is still useful in providing a snapshot of the quantum vulnerability profile of the top 1000 addresses by balance.

![Figure: The holdings of the top-10 exchange entities in the top 1000 addresses based on known labels. The total holdings associated with each entity is shown as the white value atop of each bar, with the orange value indicating the funds that reside in reused addresses. Note: this likely under-represents holdings of each of these exchanges as we're only considering the top-1000 addresses and also many unlabeled addresses in the top-1000 probably belong to exchanges.](/assets/blog/qva1/top_10_exchanges_by_balance.png){#fig:top-10-exchanges-by-balance}

By grouping the addresses by their entity label and focusing on labeled exchanges, we can see an even clearer picture still in {@fig:top-10-exchanges-by-balance}:
- ~84% of funds identified as belonging to Binance are custodied in reused addresses.
- ~77% of funds identified as belonging to OKX are custodied in reused addresses.
- [[All funds identified as belonging to all other exchanges are 100% custodied in reused addresses.||Of course reuse is likely how many of these addresses have been identified as belonging to particular exchanges or custodians, and we can't say anything about the unlabeled addresses]]

The summary statistics are revealing: ~90.4% of funds identified as belonging to exchanges are custodied in reused addresses.
This represents a potential target of ~1.3M BTC in just 45 reused addresses belonging to exchange entities for quantum attackers.

# Key Observations

- **As of block 900,000, ~6.51M BTC (32.73% of total supply) remains vulnerable to long-range quantum computing attacks, representing a significant risk to Bitcoin's ecosystem.**

- **Address reuse constitutes the dominant vulnerability source, accounting for 69.0% (4.49M BTC) of all quantum-vulnerable funds as of block height 900,000, significantly exceeding inherently vulnerable script types at 28.8% (1.87M BTC)**

- **While the percentage of supply vulnerable to quantum attacks declined from the Bitcoin Cash fork peak of 50.89%, it has stabilized around 32-33% and begun increasing again since 2021**

- **Exchange holdings show particularly alarming patterns: 90.4% of identified exchange funds are held in reused addresses, with Binance at 84% and OKX at 77%**

- **The value held in reused addresses has fluctuated between 21.5%-24% of total Bitcoin supply since 2016, indicating persistent exposure despite ecosystem maturation**

# Appendix

## Additional Quantum Vulnerability Figures

![Figure: The total number of quantum-vulnerable Bitcoin vs. the total supply of Bitcoin, over time.](/assets/blog/qva1/total_vs_quantum_vulnerable_btc.png){#fig:total-vs-quantum-vulnerable-btc}

![Figure: Breakdown of quantum-vulnerable Bitcoin by vulnerability source over time.](/assets/blog/qva1/quantum_vulnerability_constituency.png){#fig:quantum-vulnerability-constituency}

{@fig:quantum-vulnerability-constituency} shows the breakdown of quantum-vulnerable Bitcoin by vulnerability source, showing the contribution of P2TR in absolute terms.
Although there has been an increase in quantum-vulnerable funds due to the adoption of the P2TR script type, increasing from 1.74M BTC at 700,000 (Sep 2021) to 1.87M BTC at 900,000 (June 6, 2025), funds vulnerable due to address reuse increased by a significantly larger amount, from 4.07M BTC to 4.49M BTC, in the same period.

![Figure: Percentage of Bitcoin supply that has been quantum-vulnerable over time.](/assets/blog/qva1/quantum_vulnerable_percentage_with_fork_exposure.png){#fig:quantum-vulnerable-percentage-with-fork-exposure}

{@fig:quantum-vulnerable-percentage-with-fork-exposure} reveals a striking pattern: the Bitcoin Cash fork caused quantum vulnerability to spike from 32.27% to 50.89% of the total Bitcoin supply.
While this percentage has declined as the Bitcoin supply has grown and some users have since moved their funds on Bitcoin after having earlier spent on Bitcoin Cash, vulnerability levels have been increasing since 2023.

![Figure: The total supply of Bitcoin vs. the total amount of Bitcoin in reused addresses over time.](/assets/blog/qva1/total_and_reused_btc.png){#fig:total-and-reused-btc}

![Figure: Address reuse percentages and the percentage of UTXOs in reused addresses over time.](/assets/blog/qva1/reuse_percentages.png){#fig:reuse-percentages}

The {{magenta:Address Reuse %}} in {@fig:reuse-percentages} is the percentage of unique addresses that have been reused, while the {{lightblue:UTXOs in Reused Addresses %}} is the percentage of UTXOs that belong to a reused address.
The {{orange:UTXOs in Reused Addresses % (Hashed Script Types)}} is the percentage of UTXOs that belong to a reused address of hashed script types only.
Note that unique addresses represent only addresses that hold value (have associated UTXOs) at that specific block height, not all addresses that have ever been used.

{@fig:reuse-percentages} reveals that while < 20% of addresses are reused, almost $\frac{2}{3}$ of all UTXOs belong to a reused address:
- A majority of addresses, 80-85%, are single-use, following good privacy practices.
- A minority of addresses, 15-20%, are reused and account for a majority of UTXOs.

![Figure: The percentage of the total supply of Bitcoin in reused addresses over time.](/assets/blog/qva1/btc_reuse_percentage_comparison.png){#fig:btc-reuse-percentage-comparison}

Whereas {@fig:reuse-percentages} shows that a significant percentage of UTXOs are associated with reused addresses, {@fig:btc-reuse-percentage-comparison} shows that the percentage of the total supply of Bitcoin in reused addresses has ranged between ~21.5%-24% since block height 400,000 (February 2016).
Despite P2TR having rapidly grown into a significant portion of the UTXO set in recent times, the recent increase in the amount of Bitcoin in reused addresses is primarily due to an escalation in address reuse in hashed script types.

## Additional Top 1000 Addresses Figures

![Figure: The top-10 addresses by balance (with original labels as per the BitInfoCharts Rich List).](/assets/blog/qva1/top_10_addresses.png){#fig:top-10-addresses}

{@fig:top-10-addresses} shows the address balance distribution for the top 10 addresses by holdings.
9 of the 10 addresses belong to known entities (are labeled), and 6 of the 10 addresses exhibit address reuse.
The top 10 addresses alone control over 1.1M BTC, with 800K belonging to reused addresses.

![Figure: Breakdown of script type of the top 1000 addresses by both address count and BTC value. Each script type is separated into reused (patterned) and non-reused (solid fill).](/assets/blog/qva1/spent_unspent_breakdown_patterned.png){#fig:spent-unspent-breakdown-patterned}

Amongst the top 1000 addresses, as shown in {@fig:spent-unspent-breakdown-patterned}, reuse occurs across all hashed script types, with just under half of all P2SH, P2WSH and P2WPKH addresses being reused.
Reuse is much less prominent for P2PKH, with only 85 of the 454 addresses (~18.7%) being reused.
In terms of value, however, reused addresses account for more than half the total value held by the P2SH, P2WSH and P2WPKH script types.

![Figure: The top 10 addresses of each hashed script type, showing holding size and whether each address has been reused or not.](/assets/blog/qva1/top_10_addresses_by_script_type.png){#fig:top-10-addresses-by-script-type}

{@fig:top-10-addresses-by-script-type} shows the top 10 addresses by balance, by script type:
- 9 of the top 10 P2WSH addresses are reused
- 7 of the top 10 P2SH addresses are reused
- 6 of the top 10 P2WPKH addresses are reused
- 3 of the top 10 P2PKH addresses are reused

From this we can also make the following observations:
- Binance appears to have operating procedures that utilise P2SH, with 5 of the top 10 P2SH addresses being held by Binance.
- Binance's top 3 addresses have been reused, yet the remaining 2 have not.
- OKX also appears to favour P2SH, with 2 of the top 10 P2SH addresses being held by OKX. Both have been reused.
- The top 2 P2WSH addresses belong to Bitfinex/Tether, both are reused.
- Government seized and custodied funds, including the Bitfinex hack recovery funds, Silk Road seized funds, and UK Government seized funds, are all non-reused P2WPKH addresses.
- [[The top P2PKH address, labeled Mt Gox Hack, contains non-reused funds that Mark Karpelès, former Mt. Gox CEO claims were "transferred without proper authorization from MtGox's original bitcoind wallet" on March 1, 2011.||Reference: https://blog.wizsec.jp/2020/06/mtgox-march-2011-theft.html]]
Aside from dusting and address poisoning, they've been dormant ever since.
- Of the exchange-related funds that are labeled, only 2 Binance cold wallets remain unused.

## Additional UTXO Set Figures

![Figure: Breakdown of the UTXO set by number of UTXOs by script type over time.](/assets/blog/qva1/utxos_by_script_type_stacked.png){#fig:utxos-by-script-type}

![Figure: Breakdown of the UTXO set by value encumbered by script type over time.](/assets/blog/qva1/btc_by_script_type_stacked.png){#fig:btc-by-script-type}
