const express = require("express");
const axios = require("axios");
axios.defaults.baseURL = 'http://localhost:3000';
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const port = 3000



const payload = {
            jsonrpc: "1.0",
            id: 0,
            method: "getblockchaininfo",
            params: []    
};

var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/json-rpc',
        'Accept':'application/json-rpc'
}

var auth ={ username: "a", password: "b"   }

var head = { "headers" : headers, "auth" : auth};
const app = express()


app.use(cors());
app.get('/pages',(req,res)=>{res.sendFile("./pages/index.html", {root:__dirname})});
app.post('/console',(req,res)=>{console.log("console called")});


app.get('/', (req, res) => {

/*(async () => {
        const response = await axios.post("http://127.0.0.1:22555", payload,head)
        console.log(response.data)
    })();
*/

const main = async function getInfo() {
        const response = await axios.post("http://127.0.0.1:22555", payload,head)
        return response.data;
}


    main()
    .then((v)=>{
        res.send(v)
    })
    .catch((err) => {
              //!err.logged && console.error(err);
              console.log(err);
              res.status(500).send();
    });

//    res.send('Hello World!')
})

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
