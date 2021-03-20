// require the module Models
const AccountsModel = require('../models/accountsModel.js');

function getJson (req, res){
    // retrieving data from jquery
    id = parseFloat(req.query.id);
    // sending data to the model
    ProductModel.getusersFromDB(id,function(err, result){
        if(err){
            console.log("there is an err from the model");
        }
        //sending call-back to the client-side
        res.json(result);
    });
}

function registerUser(req, res){
    client_username = req.body.client_username;
    client_email = req.body.client_email;
    client_password = req.body.client_password;
    console.log("The data in the controller is: "+ client_username);
    AccountsModel.registerUserinDB(client_username, client_email, client_password, function(err,result){
        if(err){
            console.log("There is an err from de model");
        }
        res.json(result);
    })
}
function login (req, res){
    client_username = req.body.client_username;
    client_password = req.body.client_password;
    console.log("Processing info in the controller: "+ client_username);
    //check existing email
    AccountsModel.checkExistingUser(client_username, function(err,result){
        if(err){
            console.log("There is an err from de model");
        }
        //check emails
        if(result.rowCount != 1) {
            console.log("The user does not exist");
        }
    });   
    AccountsModel.getClientinfo(client_username, function(err, result){
        if(err){
            console.log("There is an err from the model");
        }
        res.json(result);

    }) 
}

module.exports = {
    getJson: getJson,
    registerUser:registerUser,
    login:login
}; 