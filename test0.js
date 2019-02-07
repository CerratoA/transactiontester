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
    const address = "DQD44a6m4u8rvngXMczDSf7C6gtsJBHsvt"
    console.log('address real con fondos', address)
    // const number = "DQD44a6m4u8rvngXMczDSf7C6gtsJBHsvt"
    const rawtx = "0100000001959bf8260040a09db520996d46753cf5b7228388c92c5b4ad349e2399130fd50000000006a47304402207f6ed14b2a11a192e990e71dd481c79f8a5e67b573c429fb7a90f0bf6fdd909102205d7fe8b0d8e3835b815d43d186c6b402c$0018695e9156e814f2cd4f289264da012102be14282fe266c5740b09abf6b5c5c8873c101afcf6dd7917961f3ff2de4104f9ffffffff01905f0100000000001976a9144caa69c3770e1faa1d451595497fe0c2986f067488ac00000000"
    const txid = "e3bc0ba798e7407e5bf6d438d66229351f94ae50f92a277db886f024c6bc043c"
    const ecl = new ElectrumClient(peer.tcp, peer.host, 'tcp')
    await ecl.connect()
    try{
        const ver = await ecl.server_version("2.7.11", "1.0")
        console.log(ver)
        const balance = await ecl.blockchainAddress_getBalance(address)
        console.log("balance", balance);
        const unspent = await ecl.blockchainAddress_listunspent(address)
        console.log("unspent", unspent);
        const rawtransaction = await ecl.blockchainTransaction_get(unspent[0].tx_hash)
        console.log("rawtransaction", rawtransaction);
        // var decodeTransaction = new bitcore.Transaction(rawtransaction);
        // console.log('decode by bitcore', JSON.stringify(decodeTransaction.toObject()));
        // const transaction = await ecl.blockchainTransaction_getDecoded(unspent[0].tx_hash)
        // console.log("transaction", JSON.stringify(transaction));
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
const privateKey = bitcore.PrivateKey("QUr6GpJZ23e83cmBbh1CFcBLADk5Hs3eXvEKagZsF4wFb2xWBpC5", "tokenpay/mainnet");
const privateKeyWif = privateKey.toWIF();
const publicKey = new bitcore.PublicKey(privateKey);
const address = privateKey.toAddress();

console.log('address', address);
console.log('privateKey', privateKey);
console.log('privateKeyWif', privateKeyWif);
//TVbJSt8PPvWAD4qMo8tcumz52yD4niYQQi6qCE7Kk16isanRpiNe

var sendaddress ='TGxaW9gnSi7xqMdYsxQj8EPxxYdCjWa8Si';
var transactionAmountcoin = 0.0009;
let privateKeys = [];
privateKeys.push(privateKey);
var fee = 0.0001;

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

// let decoded = new bitcore.Transaction('01000000d9d2295b01b1c8e70f7361b063e5492625c4f71a7e73487566bad8480c609be4385b87b973010000006a4730440220650518df4d12009bba3303380359201e548a47bfb376bf967c2a075ffab8de9a022042a9a059e79171d52d6ced64e5b83f9a203042a2f0ddfea429b72f98d38ce93b012103d309ef7b2691b82caa3a6b0c604bfc017fa6e962a933af3c162230e37b964f70ffffffff02f0c1a435000000001976a914d59b58d393ef20cb5dff86727945cae7d49854d088ac00e1f505000000001976a914a824779bcb98d9c0ebf5b51c7cd878707925c93788ac00000000');
// console.log('decoded', JSON.stringify(decoded.toObject()));

// var autoEx = () =>{
//     setTimeout(sendTransaction(mappedutxos, sendaddress, transactionAmount, transactionFee, address, privateKeys), 4000);
// }
// autoEx();