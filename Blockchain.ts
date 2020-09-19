import Block, { Transaction } from './Block'

class Blockchain {
	chain: Block[];
	difficulty: number;
	pendingTransactions: Transaction[];
	miningRewardAmount: number;
	constructor(miningRewardAmount: number, difficulty: number) {
		this.chain = [this.initializeGenesis()];
		this.difficulty = difficulty;
		this.miningRewardAmount = miningRewardAmount;
		this.pendingTransactions = [];
	}

	initializeGenesis = () => {
		let initalData = new Transaction('', '', 0)
		return new Block((Date.now()).toString(), [initalData] , '0')
	}
	getLatestBlock = () => {
		return this.chain[this.chain.length - 1]
	}

	minePendingTransactions = (miningRewardAddress: string) => {
		let block = new Block((Date.now()).toString() , this.pendingTransactions);
		block.previousHash = this.getLatestBlock().hash;

		block.mineBlock(this.difficulty);

		this.chain.push(block);
		this.pendingTransactions = [
			{ fromAddress: '', toAddress: miningRewardAddress, amount: this.miningRewardAmount}
		];

	}
	queueTransaction = (transaction: Transaction) => {
		this.pendingTransactions.push(transaction)
	}
	getBalanceOfAddress = (address: string) => {
		let balance = 0;
		for(const block of this.chain) {
			for(const transaction of block.transactions) {
				if(transaction.fromAddress === address) {
					balance -= transaction.amount;
				}
				if(transaction.toAddress === address) {
					balance += transaction.amount;
				}
			}
		}
		return balance;
	}
	isChainValid = () => {
		for(let i = 1; i <= this.chain.length - 1; i++) {
			let currentBlock = this.chain[i];
			let previousBlock = this.chain[i-1];

			//Check if currentBlock hash is valid, by re-calculating
			if(currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}
			//Check if currentBlock.prevHash is still prevBlock.hash
			if(currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}
		}

		return true;
	}
}

export default Blockchain;