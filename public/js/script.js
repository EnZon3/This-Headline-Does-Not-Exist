//on document ready get search query passed in from url
$(document).ready(function(){
    var q = window.location.search.split('=')[1];
    console.log(q);
    //if no search query was passed in, redirect to home
    //ajax get call to search endpoint with the search query in request body
    const data1 = {
        q: q
    }
    $.ajax({
        url: '/api/generate',
        type: 'get',
        data: data1,
        success: function(data){
            $('#headline').append(data);
        }
    });

});