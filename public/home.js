/****************************
 * Query Database AJAX Request
 ****************************/
$(document).ready(function(){
  $("button").click(function(){
    id= $('#id').val();
    console.log(id);
    $.get('/json',{id:id}, function(data){

      console.log('ajax success! :');
      console.log(data.fields[1].user_name);
      for (var i = 0; i < data.rows.length; i++){
        $('#result').append("<li>Name: "+ data.rows[i].user_name + ",password: " +data.rows[i].user_password +"</li>");
      }
      
    });
    });//ajax function call
    //CART CLICK AJAX END
  });
