// require the module Models
const ProductModel = require('../models/getProductsfromDB.js');

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



module.exports = {
    getJson: getJson
}; 