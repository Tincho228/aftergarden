/****************************
 * Query Database AJAX Request
 ****************************/
function generateTable()
    {
      console.log('checkout run');
      
      $.ajax({
        url: '/users',
        type: 'GET',
        dataType: 'json', //will parse json into javascript object
        //callback called when suceed
        success: (data) => {
          console.log('ajax success!', data);
             product = "";
             product += "<table class='table table-hover table-bordered table-striped'>";
             product += "<tr><th>User name</th><th>User Email</th><th>User Password</th></tr>";
            
          $.each(data, function (index, value) {
            
            
            product += "<tr>";
            product += "<td>"+ this.product_name +"</td>";
            product += "<td>"+ this.product_description + "</td>";
            product += "<td>" + "$" + this.price+ "</td>";
            product += "</tr>";
          });// END LOOP
           
            product += "</table>";
        //added end
          result = "";
          result = product;
          //select status id element display in html
          $('#results').html(result);
        }//sucess data call
      });//ajax function call
      //CART CLICK AJAX END
    }//cartPopup on click