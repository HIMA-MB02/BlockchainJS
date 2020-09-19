import SHA256 = require("crypto-js/sha256");


export class Transaction {
	fromAddress: string;
	toAddress: string;
	amount: number;
	constructor(fromAddress: string, toAddress: string, amount: number) {
		this.fromAddress = fromAddress;
		this.amount = amount;
		this.toAddress = toAddress;
	}
}

class Block {
	timeStamp: string;
	transactions: Transaction[];
	previousHash: string;
	hash: string;
	nonce: number;

	constructor( timeStamp: string, transactions: Transaction[], previousHash?: string) {
		this.timeStamp = timeStamp;
		this.transactions = transactions;
		this.previousHash = previousHash ? previousHash : '';
		this.hash = '';
		this.nonce = 0;
	}


	mineBlock = (difficulty: number) => {
		console.log('started mining the block!')
		while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
			this.nonce++;
			this.hash = this.calculateHash()
		}
		console.log('finished mining the block!')
	}

	calculateHash = () => {
		return SHA256(this.timeStamp + JSON.stringify(this.transactions) + this.previousHash + this.nonce).toString();
	}
}

export default Block;
