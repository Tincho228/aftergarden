const {Pool} = require("pg");
const connectionString = process.env.DATABASE_URL || 'postgres://aftergardenuser:aftergarden@localhost:5432/aftergarden';
const pool = new Pool({connectionString: connectionString, 
ssl: {
    rejectUnauthorized: false
}
});

function getProducts(req,res){
    const data = parseFloat(req.body.id);
    console.log(data);
    var result = "This is information from the database";
    res.status(200).json(result);
}
module.exports = {
    getProducts: getProducts
};