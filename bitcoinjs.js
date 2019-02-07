import bitcore from 'bitcore-lib';
const ElectrumClient = require('electrum-client')
import bitcoinjs from 'bitcoinjs-lib'
var Mnemonic = require("bitcore-mnemonic");

// const peers = require('electrum-host-parse').getDefaultPeers("BitcoinSegwit").filter(v => v.ssl)
// const getRandomPeer = () => peers[peers.length * Math.random() | 0]

// let mappedutxos = [];
// let mymappedutxos = [
//   { address: 'TMUKGYVZe2pY5jxVqnRYkNSa6yE79cB18s',
//   txId: '50fd309139e249d34a5b2cc9888322b7f53c75466d9920b59da0400026f89b95',
//   satoshis: 100000,
//   outputIndex: 0,
//   script: '76a9147e2aad8c707d7d9778e3e833180cb97ac52d932988ac' }
// ]

const main = async () => {
    //const peer = getRandomPeer()
    const peer = { host: 'localhost',
  ssl: 50002,
  tcp: 50001,
  pruning: null,
  http: null,
  https: null } 
    console.log('begin connection: ' + JSON.stringify(peer))
    console.log(peer);
    const address = "DGeCok4UnibsTa5Tz6mPmyv35KD6CzzrSS"
    console.log('address real con fondos', address)
    // const number = "DQD44a6m4u8rvngXMczDSf7C6gtsJBHsvt"
    const rawtx = "0100000001959bf8260040a09db520996d46753cf5b7228388c92c5b4ad349e2399130fd50000000006a47304402207f6ed14b2a11a192e990e71dd481c79f8a5e67b573c429fb7a90f0bf6fdd909102205d7fe8b0d8e3835b815d43d186c6b402c$0018695e9156e814f2cd4f289264da012102be14282fe266c5740b09abf6b5c5c8873c101afcf6dd7917961f3ff2de4104f9ffffffff01905f0100000000001976a9144caa69c3770e1faa1d451595497fe0c2986f067488ac00000000"
    const txid = "e3bc0ba798e7407e5bf6d438d66229351f94ae50f92a277db886f024c6bc043c"
    const ecl = new ElectrumClient(peer.tcp, peer.host, 'tcp')
    await ecl.connect()
    try{
        const ver = await ecl.server_version("2.7.11", "1.0")
        console.log(ver)
        // const balance = await ecl.blockchainAddress_getBalance("TMUKGYVZe2pY5jxVqnRYkNSa6yE79cB18s")
        // console.log("balance1", balance);
        // const balance = await ecl.blockchainAddress_getBalance(address)
        // console.log("balance2", balance);
        const balance = await ecl.blockchainAddress_getBalance(address)
        console.log("balance", balance);
        const unspent = await ecl.blockchainAddress_listunspent(address)
        console.log("unspent", unspent);
        const rawtransaction = await ecl.blockchainTransaction_get(unspent[0].tx_hash)
        console.log("transaction", rawtransaction);
        const transaction = await ecl.blockchainTransaction_getDecoded(unspent[0].tx_hash)
        console.log("transaction", JSON.stringify(transaction));
        // mappedutxos.push(maputxos(transaction, unspent[0].tx_pos));
        // var txidsent = await ecl.blockchainTransaction_broadcast()
        // const history = await ecl.blockchainAddress_getHistory(address)
        // console.log("history", history);
        // const estimatefee = await ecl.blockchainEstimatefee(6)
        // console.log("estimatefee", estimatefee);

        const numblocks = await ecl.blockchainNumblocks_subscribe();
        console.log('blockchainNumblocks_subscribe', numblocks)
    }catch(e){
        console.log(e)
    }
    await ecl.close()
}
main().catch(console.log)

// var coin_data = {
//   tokenpay: {
//     mainnet: {
//       network_data: {
//         name: "tokenpay/mainnet",
//         alias: "tokenpay livenet",
//         pubkeyhash: 0x41,
//         privatekey: 0xb3,
//         scripthash: 0x7e,
//         xpubkey: 0x0488B21E,
//         xprivkey: 0x0488ADE4
//       },
//       bip44_id: 265
//     }
//   }
// };

// var hexTransaction = "";

// var desired_coin_data = coin_data["tokenpay"];

// bitcore.Networks.add(desired_coin_data["mainnet"].network_data);

// const keywords = 'hub income fiction thrive first nest mass emotion plunge again gasp just office inspire display token source breeze slab same attend tape stable check';
// const code = new Mnemonic(keywords);
// const hdPrivateKey = code.toHDPrivateKey("", "tokenpay/mainnet"); // no passphrase
// const derivationPath = hdPrivateKey
// .derive(44, true)
// .derive(coin_data["tokenpay"]["mainnet"].bip44_id, true)
// .derive(0, true)
// .derive(0);

// const privateKey = derivationPath.derive(0).privateKey;
// const privateKeyWif = privateKey.toWIF();
// const publicKey = new bitcore.PublicKey(privateKey);
// const address = privateKey.toAddress();

// console.log('address', address);

      //new method for transaction
      // var bitcoin = require('bitcoinjs-lib');
      // var baddress = bitcoin.address;
      // var bcrypto = bitcoin.crypto;
      // var bnetworks = bitcoin.networks.tokenpay;
      // console.log('about to create key');
      // var myarray = [];
      // myarray.push({
      //   messagePrefix: '\x19Tokenpay Signed Message:\n',
      //   pubKeyHash: 0x41,
      //   wif: 0xb3,
      //   scriptHash: 0x7e,
      //   bip32: {
      //     public: 0x0488B21E,
      //     private: 0x0488ADE4
      //   }
      // });
      // var keyPair = bitcoin.ECPair.fromWIF('TVbJSt8PPvWAD4qMo8tcumz52yD4niYQQi6qCE7Kk16isanRpiNe', bnetworks);
      // console.log('publicKey', keyPair.toWIF());
      // console.log('address:', keyPair.getAddress());
      // var tx1 = new bitcoin.TransactionBuilder(bnetworks);
      // tx1.setVersion(1);
      // console.log('tx1', tx1);
      // tx1.addInput("50fd309139e249d34a5b2cc9888322b7f53c75466d9920b59da0400026f89b95", 0);
      // console.log('tx1 after input', tx1);
      // tx1.addOutput("TGxaW9gnSi7xqMdYsxQj8EPxxYdCjWa8Si", 900);
      // console.log('tx1 after output', tx1);
      // tx1.sign(0, keyPair);
      // console.log('tx1 after sign', tx1);
      // console.log('before build');
      // console.log(tx1.build().toHex());
      // console.log('after build');

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
//   console.log("feeeeeee",fee);
//   let transaction = new bitcore.Transaction()    
//   .from(utxos)          // Feed information about what unspent outputs one can use
//   .to(sendaddress, transactionAmount)
//   .fee(fee)  // Add an output with the given amount of satoshis
//   .change(changeAddress)      // Sets up a change address where the rest of the funds will go
//   .sign(privateKeys)
//   console.log('signed', transaction.isFullySigned());
//   console.log('object', JSON.stringify(transaction.toObject()));
//   console.log('check', transaction.checkedSerialize());
// }

// const maputxos = (ummapedutxos, vin)=> {
//   console.log('ummapedutxos', ummapedutxos)
//   var utxos = {};
//   utxos.address = ummapedutxos.vout[vin].scriptPubKey.addresses[0];
//   utxos.txId = ummapedutxos.txid
//   var amountincoins = ummapedutxos.vout[vin].value;
//   utxos.satoshis = bitcore.Unit.fromBTC(amountincoins).toSatoshis()
//   utxos.outputIndex = vin
//   utxos.script = ummapedutxos.vout[vin].scriptPubKey.hex;
//   console.log('utxos created', utxos);
//   return utxos;
// }

// sendTransaction(mymappedutxos, sendaddress, transactionAmount, transactionFee, address, privateKeys);

// var autoEx = () =>{
//     setTimeout(sendTransaction(mappedutxos, sendaddress, transactionAmount, transactionFee, address, privateKeys), 4000);
// }
// autoEx();