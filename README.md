# Mini Blockchain in TypeScript (Powered by Proof-of-Work Mining)

This is a lightweight blockchain implementation built in TypeScript, simulating fundamental blockchain concepts such as transaction processing, mining, proof-of-work, and ledger validation. The project provides a simplified model of how blockchains handle transactions and maintain security through hashing and difficulty-based mining.

## 🚀 Features

- ✅ Genesis Block Initialization – The blockchain starts with a hardcoded genesis block
- ✅ Proof-of-Work Mining – Uses computational mining with adjustable difficulty
- ✅ Transaction Handling – Transactions are queued and processed in batches
- ✅ Mining Rewards – Miners receive a reward after successfully mining a block
- ✅ Balance Tracking – Users can check their wallet balance at any time
- ✅ Blockchain Integrity Check – Ensures chain validity using hash verification

## 🛠 How It Works

### 1️⃣ Blockchain Initialization

A new blockchain instance is created with:
- Mining reward: 100 coins
- Mining difficulty: 4

### 2️⃣ Transaction Queue & Mining Process

- Transactions are queued in `pendingTransactions`
- The first half of the transactions is mined into a block
- Mining rewards are added to the pending queue
- The second half of transactions is queued and mined
- Previous rewards are credited, but a new reward is added to the pending queue

```
blockChain.minePendingTransactions('himanshu');
blockChain.minePendingTransactions('himanshu');
```

### 3️⃣ Block Structure & Hashing

Each block contains:
- A timestamp
- A list of transactions 
- A previous block hash (ensuring chain integrity)
- A computed hash
- A proof-of-work mechanism

Blocks are linked cryptographically to prevent tampering.

### 4️⃣ Validating the Blockchain

The `isChainValid()` method ensures:
- ✅ Each block's hash is correctly calculated
- ✅ Each block references the correct previous block hash

```
console.log(`\n Is this chain VALID? : ${blockChain.isChainValid() ? 'YES': 'NO'}`);
```

### 5️⃣ Checking Wallet Balance

Balances are derived from the transaction history stored within the blockchain.
```
console.log(`\n Himanshu's balance is: ${blockChain.getBalanceOfAddress('himanshu')} coins`);
```