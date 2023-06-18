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

//***************************************
//express app is initialised
const app = express()
app.use(cors());


/*
 *function that generate a key pair. 
 */
const generatePair = () => {
        /*generate a random private key*/
        var priv = PrivateKey();

        /*get the associated address*/
        var addr = priv.toAddress();

        /*export private key to WIF format.*/
        var exportedPriv  =  priv.toWIF();
        console.log(exportedPriv);
        /*export address to human format (string);*/
        var humanAddr = addr.toString();
        console.log(humanAddr);

        return {"priv" : exportedPriv , "addr" : humanAddr}
}

/*
 * the function generatePair is called in the globalscope here, called only once, per server instance.
 */
var globalDogeAddress = generatePair();

/* this function calls dogechain.info to check the balance of the current keypair public address*/
const balanceInquiryDogechain = async function getInfo(){
    const response = await axios.get(`https://dogechain.info/api/v1/address/balance/${globalDogeAddress.addr}`, { headers: {'user-agent':"axios"}});
    return response.data;
}

//BLOCKCHAIN REQUESTS

app.get('/blockchainbalance', (req, res) => { //GET check blockchain for balance from dogechain.info.
        balanceInquiryDogechain()
        .then((dat)=>{
             res.status(200).send(dat)
        })
        .catch((err) => {
              console.log(err);
              res.status(500).send();
        });

}) //blockchain


//PAYMENT PAGE REQUESTS
//set view engine to ejs mode
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

app.get('/', function(req, res) {
       res.render(path.join(__dirname, '/pages/index'),
           {
                paymentAddress:globalDogeAddress.addr
           });
});


// GET css files
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









