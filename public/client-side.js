/****************************
 * This is the CLIENT SIDE *
 ****************************/

  // Register new client
  $(document).ready(function(){
    $("#register").click(function(){
      console.log("registering");
      let client_username= $('#client_username').val();
      let client_email= $('#client_email').val();
      let client_password= $('#client_password').val();
      let repeatPassword = $('#repeatPassword').val();
      //check empty fields
      params = {
        client_username:client_username,
        client_email:client_email,
        client_password:client_password,
        repeatPassword:repeatPassword
      };

      $.post('/register',params, function(data){
        console.log('ajax success! :');
        switch(data) {
          case 'reg_success':
            console.log("loggedin")
            // code block
            var login_message = "<h1 class='text-center' style='position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);-webkit-transform: translate(-50%, -50%);'>";
            login_message += "Congratulations!!!<br>Your user "+ client_username +" has been created</h1>";
            login_message += '<div class="modal-footer"><a href="/" class="btn btn-secondary" style="position:absolute; bottom:10px;">Save changes</a>"</div>';
            $('#register_message').html(login_message);
            break;
          case 'err_password':
            // code block
            var err_reg_message = "The passwords don´t match. Please try again";
            $('#err_reg_message').html(err_reg_message);
            break;
          case 'err_username':
            // code block
            var err_reg_message = "The username already exists. Login instead";
            $('#err_reg_message').html(err_reg_message);
            break;
          case 'err_empty':
            // code block
            var err_reg_message = "Please complete all empty fields";
            $('#err_reg_message').html(err_reg_message);
            break;
          default:
            // code block
        }
        
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
            login_message += '<div class="modal-footer"><a href="/myportal" class="btn btn-secondary" style="position:absolute; bottom:10px;">My portal</a>"</div>';
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
  
// Create a project - Step 1
$(document).ready(function(){
  $("#submit_step1").click(function(){
    console.log("processing step 1");
    let project_name= $('#project_name').val();
    let project_description= $('#project_description').val();
    
    //check empty fields
    if(!(project_name) || !(project_description)){
      console.log("Please complete all empty fields");
      $('#err_step1').html("Please complete all empty fields");
      return;
    }
    let params = {
      project_name:project_name,
      project_description:project_description
    }
    $.post('/regProject',params, function(data){
      console.log('ajax success! :');
      
      let message_step2 ="<h1 class='text-center' style='position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);-webkit-transform: translate(-50%, -50%);'>";
      message_step2 += "Project successfully created<br>Make your first post</h1>";
      message_step2 += '<div class="modal-footer"><a href="/myportal" class="btn btn-secondary" style="position:absolute; bottom:10px;">Save changes</a>"</div>';
      $('#message_step2').html(message_step2);
    });

    
    });//ajax function call
    
  });

  // Update Email 
  $(document).ready(function(){
    $("#changeEmail").click(function(){
      console.log("Changing email");
      let client_email= $('#client_email').val();
      //check empty fields
      let params = {
        client_email:client_email
      }
      $.post('/changeEmail',params, function(data){
        console.log('ajax success! :'+ data);
        if(data === 'success'){
          $('#err_changeEmail').html("Your email has been updated");
          let newbtn = '<a href="/account" class="btn btn-dark text-light">Save changes</a>';
          $('#addbutton_save').html(newbtn);
        return;  
        }
        $('#err_changeEmail').html(data);
      });
      
      
      });//ajax function call
      
    });
  
  // Change Passwords
  $(document).ready(function(){
    $("#changePassword").click(function(){
      console.log("Changing email");
      let client_password= $('#client_password').val();
      let repeat_password= $('#repeat_password').val();
      
      //check empty fields
      let params = {
        client_password:client_password,
        repeat_password:repeat_password
      }
      $.post('/changePassword',params, function(data){
        console.log('ajax success! :'+ data);
        if(data === 'success'){
          $('#err_changePassword').html("Your password has been updated");
          let newbtn = '<a href="/account" class="btn btn-dark text-light">Save changes</a>';
          $('#addbutton_save_password').html(newbtn);
        return;  
        }
        $('#err_changePassword').html(data);
      });
      
      
      });//ajax function call
      
    });