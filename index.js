const express = require("express");
const axios = require("axios");
axios.defaults.baseURL = 'http://localhost:3000';
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const port = 3000
const dogecore = require("bitcore-lib-doge");
const { PrivateKey, PublicKey, Address, Transaction, Script, Opcode } = dogecore
const { Hash, Signature } = dogecore.crypto
const path = require("path")

//http request
//headers, auth, body
//refactor axios request object into a single code object.
const data = {
            jsonrpc: "1.0",
            id: 0,
//            method: "getblockchaininfo",
            method:"getreceivedbyaddress",
            params: [ "DTuCyS86HPG8aJGhyUMavLNmnEYAysjvEp"]    
};

const config ={ 
             "headers" :{
                            'User-Agent':'Super Agent/0.0.1',
                            'Content-Type':'application/json-rpc',
                            'Accept':'application/json-rpc'
             }, 
             "auth" :{ 
                 username: "a", 
                 password: "b"   
             }
};
//***************************************
//express app is initialised
const app = express()
app.use(cors());


//BLOCKCHAIN REQUESTS

app.get('/pages',(req,res)=>{res.sendFile("./pages/check.html", {root:__dirname})});

app.get('/blockchain', (req, res) => { //GET check blockchain for balance or info.

        const main = async function getInfo() {
                    const response = await axios.post("http://127.0.0.1:22555", data, config)
                    return response.data;
        }
        
        main()
        .then((dat)=>{
             res.status(200).send(dat)
        })
        .catch((err) => {
              console.log(err);
              res.status(500).send();
        });
}) //blockchain


//PAYMENT PAGE REQUESTS
const generatePair = () => {
        /*generate a random private key*/
        var priv = PrivateKey();

        /*get the associated address*/
        var addr = priv.toAddress();

        /*export private key to WIF format.*/
        var exportedPriv  =  priv.toWIF();
        /*export address to human format (string);*/
        var humanAddr = addr.toString();
            humanAddr = "DTuCyS86HPG8aJGhyUMavLNmnEYAysjvEp";
        return {"priv" : exportedPriv , "addr" : humanAddr}
}

//set view engine to ejs mode
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

app.get('/', function(req, res) {
       var addressDoge = generatePair();
       res.render(path.join(__dirname, '/pages/index'),{
                                                               hello:addressDoge});
});

app.get('/pages/output.css', function(req,res){
        res.sendFile(path.join(__dirname, '/pages/output.css'));
});
/*
 * build single thread payment system first
 * save current public address i global scope variable.
 * check the balance of this address on the check blockchain page.
 */



// SERVER IS LISTENNING
app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
})



























/*
axios({
      method: 'post',
      url: 'http://127.0.0.1:22555',
        data: {
              jsonrpc : '1.0',
              id : 'curltest',
              medthod : "getblockchaininfo",
              params : []
            },
    
      auth:auth,
      headers : headers,


    
})
.then(
    (response) => { console.log(response)},
    (error)    => { console.log(error)}

);

*/



/*(async () => {
        const response = await axios.post("http://127.0.0.1:22555", payload,head)
        console.log(response.data)
    })();
*/


