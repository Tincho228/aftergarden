/****************************
 * Query Database AJAX Request
 ****************************/

$(document).ready(function(){
  $("button").click(function(){
    const id = $('#id').val();
    console.log(id);
    $.post('/json', {id:id}, function (data){
        console.log('ajax success!', data);
        jsonresult = "The result from ajax is :" + data;   
        $('#result').html(jsonresult);
      }//sucess data call
    );//ajax function call
    //CART CLICK AJAX END
  });
});
