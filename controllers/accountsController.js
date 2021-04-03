// require the module Models
const { json } = require('express');
const session = require('express-session');
const accountsModel = require('../models/accountsModel.js');
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
    
    if (client_email === sess.client.rows[0].client_email){
        console.log("the emails are the same");
        return res.json("Emails are the same. Try again");
    }
    AccountsModel.checkExistingEmail(client_email, function(err, result){
        if(err){
            console.log("There is an err from the model");
        }
        if(result.rowCount === 1){
            console.log("Email already registered. Try again");
            return res.json("Email already registered. Try again");
        }
        let client_id = sess.client.rows[0].client_id;
        AccountsModel.changeEMailinDB(client_id, client_email, function(err, result){
            if(err){
                console.log("There is an err from the model");
            }
                console.log("Change email success");
                sess.client.rows[0].client_email = client_email;
                console.log('Your new email has been changed to' + sess.client.rows[0].client_email);
                res.json("success");
            
        });

    }) ;

}
// Change password 
function changePassword(req,res){
    let sess = req.session;
    let client_password = req.body.client_password;
    let repeat_password = req.body.repeat_password;
    if(!(client_password) || !(repeat_password)){
        console.log("Please complete all epty fields");
        return res.json("Complete all empty fields");
    }
    if (client_password != repeat_password){
        console.log("Passwords are not equal");
        return res.json("Passwords are not equal");
    }
    // send data to the model
    let client_id = sess.client.rows[0].client_id;
    AccountsModel.changePasswordinDB(client_id, client_password, function(err, result){
        if(err){
            console.log("There is an err from the model");
        }
            sess.client.rows[0].client_password = client_password;
            console.log("Changing password");
            res.json("success");
    });
}
// Add a profile picture

function profilePicture(req,res) {
    let sampleFile;   
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    // Look for a session
    sess=req.session;
    client_username = sess.client.rows[0].client_username;
    let client_id = sess.client.rows[0].client_id;
    sampleFile = req.files.sampleFile;
    uploadPath = './profile_pictures/' + client_username +sampleFile.name;

    //Data for Database
    client_profile_path = client_username + sampleFile.name;
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    //Send image to the Model
    AccountsModel.regProfilePictureinDB(client_id, client_profile_path,function(err, result){
        if(err){
            console.log("There is an err from de Projects model");
        }
        sess.client.rows[0].client_profile_path = client_profile_path;
        let ref = "/account";
        res.redirect(ref);
    });
    });
}


module.exports = {
    registerUser:registerUser,
    login:login,
    changeEMail:changeEMail,
    changePassword:changePassword,
    profilePicture:profilePicture
}; 