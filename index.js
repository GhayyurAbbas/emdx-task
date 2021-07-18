
//https://rpc-mainnet.maticvigil.com/
// Network Name: Matic Mainnet
// New RPC URL: https://rpc-mainnet.maticvigil.com/
// Chain ID: 137
// Currency Symbol (optional): MATIC
// Block Explorer URL (optional): https://explorer.matic.network/
//https://api.polygonscan.com/api?module=contract&action=getabi&address=0x2791bca1f2de4661ed88a30c99a7a9449aa84174&apikey=0x831753DD7087CaC61aB5644b308642cc1c33Dc13
var Web3 = require('web3');
const fetch = require('node-fetch');
 const fs = require('fs');
async function main(){
    var web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-mainnet.maticvigil.com/'));
    var hash='0x2b1cb0ee5c14b33d1871a671c235dce2972861a1ad1410659251f0b9d7fac39f';
    var contract =await web3.eth.getTransactionReceipt(hash) 
    console.log(contract)
    console.log('---------------------------------------------logs----------------------------')
    console.log(contract.logs)
    console.log('---------------------------------------------contract address----------------------------')
    console.log(contract.to)
/////////////////////////////abi
    fetch('https://api.polygonscan.com/api?module=contract&action=getabi&address=0x2791bca1f2de4661ed88a30c99a7a9449aa84174&apikey='+contract.to)
    .then(response => response.json())
    .then(data => {
        console.log('---------------------abi--------------------------------------')
        console.log(data.result);
fs.writeFile('abi.json', data.result, 'utf8', function(){});
      
    
    }
    );
////////////////////////////bytecode
    web3.eth.getCode(contract.to, function(error, result) {
        if(!error) {
            console.log('-----------------------------bytecode------------------')
            console.log(result)
           
fs.writeFileSync('bytecode.txt', result);
        }
    });
///////////////////////////////////////////transaction data
    fetch('https://api.polygonscan.com/api?module=transaction&action=gettxreceiptstatus&txhash='+hash)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.status) {
    console.log('[------------------------------------------------status------------------------------------------------------------]')
    console.log(data.status)
         
        } else {
    
        }
    
    }
    );

}
main()
