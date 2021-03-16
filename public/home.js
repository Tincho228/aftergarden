/****************************
 * Query Database AJAX Request
 ****************************/
$(document).ready(function(){
  $("button").click(function(){
    $.ajax({
      url: '/json',
      type: 'POST',
      dataType: 'json', //will parse json into javascript object
      //callback called when suceed
      success: (data) => {
        console.log('ajax success!', data);
        jsonresult = "The result from ajax is :" + data;   
        $('#result').html(jsonresult);
      }//sucess data call
    });//ajax function call
    //CART CLICK AJAX END
  });
});
/*
function generateTable()
    {
      console.log('checkout run');
      
      $.ajax({
        url: '/json',
        type: 'GET',
        dataType: 'json', //will parse json into javascript object
        //callback called when suceed
        success: (data) => {
          console.log('ajax success!', data);
          jsonresult = "The result from ajax is :" + data;   
          $('#result').html(jsonresult);
        }//sucess data call
      });//ajax function call
      //CART CLICK AJAX END
    }//cartPopup on click*/