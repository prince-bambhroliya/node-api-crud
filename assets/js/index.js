$("#add_user").submit(function (event) {
    // window.location.href = "http://localhost:3000/"
    // alert("Data inserted Successfully");
    if(confirm("Do Yo want to Insert this record ?")){
        alert("Data Inserted Successfully")
        window.location.href = "http://localhost:3000/"
      }
});

$("#update_user").submit(function (event) {
  event.preventDefault();
  let unIndexed_array = $(this).serializeArray();
  let data = {};

  $.map(unIndexed_array, function (n, i) {
    data[n['name']]= n['value']
  });
  console.log(data);


  let requestData = {
    "url" : `http://localhost:3000/api/users/${data.id}`,
    "method" : "PUT",
    "data" : data
  }

//   $.ajax(requestData).done(function(response){
//       alert("Data updated Successfully")
//   })
  if(confirm("Do Yo want to Edit this record ?")){
    $.ajax(requestData).done(function(response){
        alert("Data updated Successfully")
        // response.redirect("http://localhost:3000/")
        window.location.href = "http://localhost:3000/"
    })
  }
});

if(window.location.pathname == "/"){
    $onDelete = $(".table tbody td a.delete")
    $onDelete.click(function(){
        let id = $(this).attr("data-id")
        let requestData = {
            "url" : `http://localhost:3000/api/users/${id}`,
            "method" : "DELETE",
          }

          if(confirm("Do Yo want to Delete this record ?")){
            $.ajax(requestData).done(function(response){
                alert("Data Deleted Successfully")
                location.reload()
            })
          }
    })
}