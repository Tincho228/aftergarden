// require the module Models
const { json } = require('express');
const session = require('express-session');
const AccountsModel = require('../models/accountsModel.js');

// Register a new user

function registerUser(req, res){
    client_username = req.body.client_username;
    client_email = req.body.client_email;
    client_password = req.body.client_password;
    repeatPassword = req.body.repeatPassword;
    if(!(client_username) || !(client_email) || !(client_password)){
        console.log("there is no username. PLease check all empty fields");
        return res.json("err_empty");
      }
    
    // Checking matching password
    if(repeatPassword != client_password){
        console.log("Passwords don´t match. Please try again");
        return res.json("err_password");
    }
    //check existing user
    AccountsModel.checkExistingUser(client_username, function(err,result){
        if(err){
            console.log("There is an err from de model");
        }
        //check emails 
        if(result.rowCount === 1) {
            console.log("The user already exist");
            return res.json("err_username");
        }
        // if it matches
        AccountsModel.registerUserinDB(client_username, client_email, client_password, function(err,result){
            if(err){
                console.log("There is an err from de model");
            }
            res.json("reg_success"); 
        });
    });
}

// Login a user

function login (req, res){
    client_username = req.body.client_username;
    client_password = req.body.client_password;
    console.log("Processing info in the controller: "+ client_username);
    //check existing user
    AccountsModel.checkExistingUser(client_username, function(err,result){
        if(err){
            console.log("There is an err from de model");
        }
        //check emails 
        if(result.rowCount != 1) {
            console.log("The user does not exist");
            result = "err_username";
            return res.json({result});
        }
        
        // if it matches
        AccountsModel.getClientinfo(client_username, function(err, result){
            if(err){
                console.log("There is an err from the model");
            }
            if (client_password === result.rows[0].client_password){
                console.log("the users match");
                let sess = req.session;
                sess.client = result;
                console.log(sess.client);
                result = "loggedin";
                return res.json({result});
            }
            result = "err_password";
            res.json({result});
    
        }) ;
    });   
    
}

// Change Email
function changeEMail (req, res){
    client_email = req.body.client_email;
    // Checking missing data
    if(!(client_email)){
        return res.json("Complete all missing data");
    }
    // Checking email
    let sess = req.session;
    let client_username = sess.client.rows[0].client_username;
    AccountsModel.getClientinfo(client_username, function(err, result){
        if(err){
            console.log("There is an err from the model");
        }
        if (client_email === result.rows[0].client_email){
            console.log("the emails are the same");
            return res.json("Emails are the same. Try again");
        }
        
        res.json("Now we can change passwords.");

    }) ;

}

module.exports = {
    registerUser:registerUser,
    login:login,
    changeEMail:changeEMail
}; 