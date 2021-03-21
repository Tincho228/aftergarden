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
        $('#register_message').html(login_message);
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
        
        switch(data.result) {
          case 'loggedin':
            console.log(data.result);
            console.log("loggedin")
            // code block
            var login_message = "<h1 class='text-center' style='position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);-webkit-transform: translate(-50%, -50%);'>";
            login_message += "Wellcome back!!!<br>You are logged in</h1>";
            login_message += '<div class="modal-footer"><a href="/" class="btn btn-secondary" style="position:absolute; bottom:10px;">Save changes</a>"</div>';
            $('#login_message').html(login_message);
            break;
          case 'err_password':
            console.log(data.result);
            console.log("err_password")
            // code block
            var err_message = "The password is incorrect. Please try again";
            $('#err_message').html(err_message);
            break;
          case 'err_username':
            console.log(data.result);
            console.log("err_username")
            // code block
            var err_message = "The username does not exit. Register instead";
            $('#err_message').html(err_message);
            break;
          default:
            // code block
        }
        
      });
      });//ajax function call
      
    });