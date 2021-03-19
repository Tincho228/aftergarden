/****************************
 * Query Database AJAX Request
 ****************************/
$(document).ready(function(){
  $("#register").click(function(){
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
