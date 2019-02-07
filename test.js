import bitcore from 'bitcore-lib';
var Mnemonic = require("bitcore-mnemonic");

let mappedutxos = [];
let mymappedutxos = [
  { address: 'TMUKGYVZe2pY5jxVqnRYkNSa6yE79cB18s',
  txId: '50fd309139e249d34a5b2cc9888322b7f53c75466d9920b59da0400026f89b95',
  satoshis: 100000,
  outputIndex: 0,
  script: '76a9147e2aad8c707d7d9778e3e833180cb97ac52d932988ac' }
]

var coin_data = {
  tokenpay: {
    mainnet: {
      network_data: {
        name: "tokenpay/mainnet",
        alias: "tokenpay livenet",
        pubkeyhash: 0x41,
        privatekey: 0xb3,
        scripthash: 0x7e,
        xpubkey: 0x0488B21E,
        xprivkey: 0x0488ADE4
      },
      bip44_id: 265
    }
  }
};

var desired_coin_data = coin_data["tokenpay"];

bitcore.Networks.add(desired_coin_data["mainnet"].network_data);

const keywords = 'hub income fiction thrive first nest mass emotion plunge again gasp just office inspire display token source breeze slab same attend tape stable check';
const code = new Mnemonic(keywords);
const hdPrivateKey = code.toHDPrivateKey("", "tokenpay/mainnet"); // no passphrase
const derivationPath = hdPrivateKey
.derive(44, true)
.derive(coin_data["tokenpay"]["mainnet"].bip44_id, true)
.derive(0, true)
.derive(0);

const privateKey = derivationPath.derive(1).privateKey;
const privateKeyWif = privateKey.toWIF();
const publicKey = new bitcore.PublicKey(privateKey);
// const publicKey = derivationPath.derive(1).hdPublicKey.publicKey;
const address = privateKey.toAddress();

console.log('address', address);
console.log('privateKey', privateKey);
console.log('publicKey', publicKey);
console.log('privateKeyWif', privateKeyWif);
console.log('toseed', code.toSeed());
//TVbJSt8PPvWAD4qMo8tcumz52yD4niYQQi6qCE7Kk16isanRpiNe

// var sendaddress ='TGxaW9gnSi7xqMdYsxQj8EPxxYdCjWa8Si';
// var transactionAmountcoin = 0.0009;
// let privateKeys = [];
// privateKeys.push(privateKey);
// var fee = 0.0001;

// const transactionAmount = bitcore.Unit.fromBTC(transactionAmountcoin).toSatoshis();
// const transactionFee = bitcore.Unit.fromBTC(fee).toSatoshis();

// const sendTransaction = (utxos, sendaddress, transactionAmount, fee, changeAddress, privateKeys )=>{
//   console.log("utxos",utxos);
//   console.log("feeeeeee",fee);
//   console.log("transactionAmount",transactionAmount);
//   let transaction = new bitcore.Transaction()    
//   .from(utxos)          // Feed information about what unspent outputs one can use
//   .to(sendaddress, transactionAmount)
//   .fee(fee)  // Add an output with the given amount of satoshis
//   .change(changeAddress)      // Sets up a change address where the rest of the funds will go
//   .sign(privateKeys)
//   console.log('Signed Transaction', transaction.isFullySigned());
//   console.log('Transaction Object', JSON.stringify(transaction.toObject()));
//   console.log('Serialized Transaction', transaction.checkedSerialize());
// }

// sendTransaction(mymappedutxos, sendaddress, transactionAmount, transactionFee, address, privateKeys);