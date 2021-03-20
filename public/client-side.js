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
      params = {
        client_username:client_username,
        client_email:client_email,
        client_password:client_password
      };

      $.post('/register',params, function(data){
        console.log('ajax success! :');
        console.log(data);
        var login_message = "<h1 class='text-center' style='position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);-webkit-transform: translate(-50%, -50%);'>";
        login_message += "Congratulations!!!<br>Your user "+ client_username +" has been created</h1>";
        login_message += '<div class="modal-footer"><a href="/" class="btn btn-secondary" style="position:absolute; bottom:10px;">Save changes</a>"</div>';
        $('#login_message').html(login_message);
      });
      });//ajax function call
      
    });
  // Login
  $(document).ready(function(){
    $("#login").click(function(){
      console.log("we are loggin in client side");
      var client_username= $('#login_client_username').val();
      var client_password= $('#login_client_password').val();
      params = {
        client_username:client_username,
        client_password:client_password
      };
      $.post('/login',params, function(data){
        console.log('ajax success! :');
        console.log(data);
      });
      });//ajax function call
      
    });