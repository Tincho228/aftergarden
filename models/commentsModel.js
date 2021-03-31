// THIS IS THE COMMENTS MODEL

const {Pool} = require("pg");
const connectionString = process.env.DATABASE_URL || 'postgres://aftergardenuser:aftergarden@localhost:5432/aftergarden';
const pool = new Pool({connectionString: connectionString, 
ssl: {
    rejectUnauthorized: false
}
});

function makeCommentinDB(comment_body,project_id,client_id, callback){
    var sql = "INSERT INTO public.comments (comment_body,client_id,project_id) VALUES ('"+ comment_body +"','"+ client_id +"','"+ project_id +"')";
    pool.query(sql,function(err, result){
        console.log("querying DB");
        if(err){
            console.log("An err with the db ocurred");
            console.log(err);
            callback(err, null);
        }
        callback(null,result);
    });
}
function getSpecificComments(project_id, callback){
    var sql = "SELECT client_username, comment_body, comment_date FROM public.clients JOIN public.comments ON clients.client_id = comments.client_id WHERE project_id = '"+ project_id +"'";
    pool.query(sql,function(err, result){
        console.log("querying DB");
        if(err){
            console.log("An err with the db ocurred");
            console.log(err);
            callback(err, null);
        }
        callback(null,result);
    });
}

module.exports = {
    makeCommentinDB:makeCommentinDB,
    getSpecificComments:getSpecificComments
}