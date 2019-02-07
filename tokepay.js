const ElectrumClient = require('electrum-client')


/* const peers = require('electrum-host-parse').getDefaultPeers("BitcoinSegwit").filter(v => v.ssl)
const getRandomPeer = () => peers[peers.length * Math.random() | 0] */

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
    const address = "TMUKGYVZe2pY5jxVqnRYkNSa6yE79cB18s"
    const number = "DQD44a6m4u8rvngXMczDSf7C6gtsJBHsvt"
    const txid = "6cae0d80fa40bed33dd2c5e41ccbe80ddf403c15d92cdf6fb336aa3b14a3e47e"
    const rawtx = "01000000aeb53d5b0126a0ce29128fa706a099f46dd5e37300459d22f40a76525c461e2a8de7809169010000006b483045022100bb15ffabe2c3343729df709c2b5d67c08baff263b51ffc38dae8888e926214d602204264b55f9958cc7603f05e7fcff2bfff3b20985f2353b92418cc467e423a529e012103a0b6b2ce2a1a3ca869e4e445d081c251116d530c4b4a6f7af03c906c4b7df821ffffffff0140548900000000001976a91487b38074fb7e6ecdaf930267edc8fce077f2e09588ac00000000"
    const ecl = new ElectrumClient(peer.tcp, peer.host, 'tcp')
    await ecl.connect()
    try{
        // const ver = await ecl.server_version("2.7.11", "1.0")
        // console.log(ver)
        // const balance = await ecl.blockchainAddress_getBalance(address)
        // console.log("balance", balance);
        const unspent = await ecl.blockchainAddress_listunspent(address)
        console.log("unspent", unspent);
        // const transaction = await ecl.blockchainTransaction_broadcast(rawtx)
        // console.log("transaction", transaction);
    }catch(e){
        console.log(e)
    }
    await ecl.close()
}
main().catch(console.log)
