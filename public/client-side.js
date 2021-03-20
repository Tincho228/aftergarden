/****************************
 * Query Database AJAX Request
 ****************************/
$(document).ready(function(){
  $("#getuser").click(function(){
    id= $('#id').val();
    $.get('/json',{id:id}, function(data){
      console.log('ajax success! :');
      console.log(data);
      for (var i = 0; i < data.rows.length; i++){
        $('#result').append("<li>Name: "+ data.rows[i].user_name + ",password: " +data.rows[i].user_password +"</li>");
      }
      
    });
    });//ajax function call
    
  });

  // Register new client
  $(document).ready(function(){
    $("#register").click(function(){
      console.log("registering");
      let client_username= $('#client_username').val();
      let client_email= $('#client_email').val();
      let client_password= $('#client_password').val();
      console.log(client_email);
      console.log(client_username);
      console.log(client_password);
      params = {
        client_username:client_username,
        client_email:client_email,
        client_password:client_password
      };

      $.post('/register',params, function(data){
        console.log('ajax success! :');
        console.log(data);
        for (var i = 0; i < data.rows.length; i++){
          $('#result').append("<li>Name: "+ data.rows[i].user_name + ",password: " +data.rows[i].user_password +"</li>");
        }
        
      });
      });//ajax function call
      
    });