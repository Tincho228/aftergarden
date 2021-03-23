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
    
    let message_step2 = '<div class="col-sm-12 col-md-6"><h2>Post your first comment - Step 2</h2><p id="err_step2" class="text-danger"></p><hr>';
    message_step2 += '<form><div class="form-group""><label for="image_path">Upload the first image from scratch of your project</label><input type="file" class="form-control" style="border:none; id="image_name" aria-describedby="emailHelp" required></div>';
    message_step2 +='<div class="form-group"><label for="image_commentary">Make any comment about it!</label><textarea class="form-control" aria-describedby="emailHelp" placeholder="Make a comment" required></textarea></div>';
    message_step2 +='<input type="hidden" id="project_name" value="'+ project_name +'">';
    message_step2 +='<input type="hidden" id="project_description" value="'+ project_description +'">';
    message_step2 +='<div class="d-flex justify-content-end"><a class="btn btn-success text-light" onclick="submit_step2()">Post</a></div></form></div>';
    message_step2 +='<div class="col-sm-12 col-md-6 d-flex justify-content-center align-items-center"><div class="image-container"><div><img class="img-fluid" src="images/placeholder.png" style="width:100px;" alt="share icon"></div></div></div>';
    $('#message_step2').html(message_step2);
    });//ajax function call
    
  });

  //Create a project step 2
  function submit_step2(){
    console.log("processing step 2");
    let project_name = $("#project_name").val();
    let project_description = $("#project_description").val();
    let client_id = 63; // obtain the client id from the session;/****************agregar *************** */
    let image_path = $('#image_path').val();
    let image_commentary = $('#image_commentary').val();
    /*if (!(image_commentary) || !(image_path)){
      console.log("Please complete all empty fields from step2");
      $('#err_step2').html("Please complete all empty fields");
      return;
    }*/
    let params = {
      project_name:project_name,
      project_description:project_description,
      client_id:client_id
    }
    $.post('/regProject',params, function(data){
      console.log('ajax success! :');
      console.log(data);
    });
    // Make a post and create a project.

    // When it comes back...
    // make a post to create a first comment
    // Congratulations message with the first project. Set done to reset the page.
    // Send back to the portal.
  }