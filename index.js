
var dogecoin = require('node-dogecoin')()
 
dogecoin.auth('alex', 'alex2')
 
dogecoin.getDifficulty(function() {
        console.log(arguments);
})
