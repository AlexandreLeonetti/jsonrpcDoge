const express = require("express");
const axios = require("axios");
axios.defaults.baseURL = 'http://localhost:3000';
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
(async () => {
        const response = await axios.post("http://127.0.0.1:22555", payload,head)
        console.log(response.data)
    })();
const app = express()


app.get('/', (req, res) => {
      res.send('Hello World!')
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
