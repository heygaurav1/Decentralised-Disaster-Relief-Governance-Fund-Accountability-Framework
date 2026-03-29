# ReliefChain: Decentralized Disaster Relief Protocol

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Network: Polygon zkEVM](https://img.shields.io/badge/Network-Polygon%20zkEVM-8247E5)](https://polygon.technology/polygon-zkevm)
[![Standards: ERC-4337](https://img.shields.io/badge/Standards-ERC--4337-blue)](https://eips.ethereum.org/EIPS/eip-4337)

ReliefChain is a production-ready, cryptographically enforced disaster relief infrastructure designed for high-accountability aid distribution in Eastern India (Assam & West Bengal). It leverages Polygon zkEVM for scalability, ERC-4337 for gasless user experiences, and a decentralized oracle network for geographic verification.

## 🏗️ Technical Architecture & Protocol Logic

ReliefChain is built on four primary pillars of accountability, ensuring that every Wei is tracked from the donor to the ground-level responder.

### 1. Governance Tokenomics (`ReliefGovernanceToken.sol`)
-   **Soul-bound**: Tokens are `non-transferable` to prevent the purchase of influence for disaster aid.
-   **Inactivity Decay**: To ensure only active responders govern the protocol, a 10% monthly decay is applied to voting power if the last action is >180 days old.
    -   *Equation*: `effectiveVotes = votes * (0.9 ^ (months_inactive - 6))`
-   **Quadratic Distribution**: Voting weight is calculated as the `sqrt(tokenBalance)` to minimize whale dominance.

### 2. Geographic Oracle Enforcement (`ReliefOracle.sol`)
-   **Multi-Sig Consensus**: A 3-of-5 committee of trusted local NGOs must verify every relief request.
-   **Geo-Fencing**: Requests are cryptographically rejected if the submitted GPS coordinates are outside the Assam/West Bengal bounding boxes:
    -   **Assam**: `Lat: 24.3 to 28.2`, `Long: 89.8 to 96.0`
    -   **West Bengal**: `Lat: 21.5 to 27.2`, `Long: 85.8 to 89.9`

### 3. Programmable Fund Escrow (`ReliefFundCustody.sol`)
-   **Tranche-Based Release**: Funds are never released in a single payment. They follow a 5-step lifecycle:
    1.  `PROPOSED`: Initial request with evidence.
    2.  `VERIFIED`: Oracle committee approval + 48h timelock start.
    3.  `RELEASED`: 30% of funds sent to the responder.
    4.  `IMPACT_REPORTED`: Proof-of-delivery uploaded to IPFS.
    5.  `FINALIZED`: Remaining 70% released after second verification.
-   **Global Safety Cap**: No single address can withdraw more than 30% of the total treasury in a 24-hour window.

### 4. Gasless Operations (`ReliefPaymaster.sol`)
-   **ERC-4337 Compatibility**: Uses a custom Account Abstraction Paymaster to sponsor transactions for "Relief Responders" whose addresses are whitelisted by the DAO.
-   **Policy Enforcement**: The paymaster only sponsors calls to authorized functions (e.g., `uploadProof`, `requestTranche`).

## 🛠️ Tech Stack & Integration

*   **Smart Contracts**: Solidity ^0.8.20 (Hardhat, OpenZeppelin UI/Governor).
*   **Decentralized Storage**: **Web3.Storage (w3up)** handles all Proof-of-Relief (PoR) evidence.
*   **Real-time Intelligence**: **Socket.io + Redis** mirror on-chain events to the dashboard with <200ms latency.
*   **Frontend**: Next.js 16 (App Router) + Tailwind CSS v4 + Framer Motion.

## 📦 Core Smart Contracts

| Contract | Purpose | Key Function |
| :--- | :--- | :--- |
| `ReliefGovernanceToken.sol` | Soul-bound Voting Power | `getPastVotes(account, blockNumber)` |
| `DisasterReliefDAO.sol` | Democratic Proposal Layer | `propose(targets, values, calldatas, description)` |
| `ReliefOracle.sol` | Geographic Trust Verification | `verifyLocation(proposalId, lat, long)` |
| `ReliefFundCustody.sol` | Programmable Tranche Payouts | `releaseTranche(proposalId)` |
| `ReliefPaymaster.sol` | Gasless Transaction Sponsoring | `_validatePaymasterUserOp(userOp, userOpHash)` |

## 🚀 Local Deployment Guide

### Prerequisites
- Node.js v18+
- [Hardhat](https://hardhat.org/) installed globally.
- [Web3.Storage Token](https://web3.storage/) for IPFS uploads.

### Step 1: Initialize Environment
```bash
git clone https://github.com/heygaurav1/ReliefChain.git
cd ReliefChain
cp .env.example .env
# Required: DEPLOYER_PRIVATE_KEY, POLYGON_ZKEVM_RPC, WEB3_STORAGE_TOKEN
```

### Step 2: Contract Deployment
```bash
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network cardona
```

### Step 3: Start Real-time Mirror (Backend)
```bash
cd backend
npm install
node server.js # Starts Socket.io server on port 3001
```

### Step 4: Launch Management Dashboard
```bash
cd dashboard
npm install
npm run dev # Dashboard available at localhost:3000
```

## 🔒 Security Architecture

*   **Timelocks**: All `ReliefFundCustody` withdrawals have a mandatory 48-hour delay after verification.
*   **Circuit Breakers**: The DAO can pause the `ReliefFundCustody` contract instantly in case of emergency.
*   **Decay Mechanism**: Prevents governance capture by "ghost" participants who are no longer active in relief efforts.

## 📄 License
MIT License. Created by [heygaurav1](https://github.com/heygaurav1).

---
*Built with ❤️ for a more accountable world.*
