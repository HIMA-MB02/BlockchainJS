import Blockchain from './Blockchain'
import PendingTransactions from './pendingTransactions'

// Created the blockchain wih each mining reward set to 100, and mining difficulty set to 4.
let miningReward = 100;
let miningDifficulty = 4;
let blockChain = new Blockchain(miningReward, miningDifficulty);

let firstTransactions = PendingTransactions.length / 2;
// queue FIRST half the list of static transactions present in pendingTransactions.ts
for(let i = 0; i <= firstTransactions; i++) {
	blockChain.queueTransaction(PendingTransactions[i])
}

// When block has been successfully mined, rewards are sent out to miner's address
let minerAddress = 'himanshu';
// started mining all pending transactions in queue into a single block.
blockChain.minePendingTransactions(minerAddress)

/**
 * NOTE: after you have mined the above transaction, pendingTransaction queue is empty and as a reward for mining, a new transaction is created where:
 * fromAddress: '',
 * toAddress: ${minerAddress},
 * amount: ${miningReward}
 * ********THIS REWARD HAS NOT BEEN MINED YET, AND IS SET IN PENDING TRANSACTION QUEUE************
 */

 // queue SECOND half the list of static transactions present in pendingTransactions.ts
for(let i = firstTransactions + 1; i < PendingTransactions.length; i++) {
	blockChain.queueTransaction(PendingTransactions[i])
}

// started mining all pending transactions in queue into a single block.
blockChain.minePendingTransactions('himanshu');

/**
 * Now, previous reward has been mined and successfully credited, but reward from mining second time has been queued in pending transactions
 */
console.log(`\n Current BlockChain: \n`,)
console.log(JSON.stringify(blockChain.chain, null, 4))
console.log(`\n Himanshu's balance is:  ${blockChain.getBalanceOfAddress('himanshu')} coins`)
console.log(`\n Is this chain VALID? : ${blockChain.isChainValid() ? 'YES': 'NO'}`)