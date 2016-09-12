$(document).ready(function(){  
	$('.buttons').on('click', function(e){
		$.get( "/get-book/", 
		{
			'id' : parseInt(this.value)
		}, function(data, status) {
			var book = data;
			console.log(book);
			$('.myModal').modal('show');
			$("#title").val(book.title);
			$("#author").val(book.author);
			$("#genre").val(book.genre);
			$("#year").val(book.year);
			$("#bookId").val(book.id);
		})
		  .done(function() {
		    
		  })
		  .fail(function() {
		  })
		  .always(function() {
		  });
		
	});

	$('.deleteBook').on('click', function(e){
		$.post("/delete-book/",
		    {   
		        id: parseInt(this.value)
		    },
		    function(data, status){
		      location.reload();
		      
		    })
		    .done(function(){
		      console.log("success");
		    })
		    .fail(function(){
		      console.log("fail");
		    });		
	});

	$('.addButton').on('click', function(e){
		$('.myModal').modal('show');
	});

	$('.saveButton').on('click', function(e){
		$('.myModal').modal('hide');
		var id = $("#bookId").val();
		var title = $("#title").val();
		var author = $("#author").val();
		var genre = $("#genre").val();
		var year = $("#year").val();

		if(id != ""){
			$.post("/update-book/",
		    {   
		        id: id,
		        title: title,
		        author: author,
		        genre: genre,
		        year: year
		    },
		    function(data, status){
		      location.reload();
		      
		    })
		    .done(function(){
		      console.log("success");
		    })
		    .fail(function(){
		      console.log("fail");
		    });	
		}else{
			$.post("/add-book/",
		    {   
		        title: title,
		        author: author,
		        genre: genre,
		        year: year
		    },
		    function(data, status){
		      location.reload();
		      
		    })
		    .done(function(){
		      console.log("success");
		    })
		    .fail(function(){
		      console.log("fail");
		    });		
		}
		
	});



	function getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie != '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
              var cookie = jQuery.trim(cookies[i]);
              // Does this cookie string begin with the name we want?
              if (cookie.substring(0, name.length + 1) == (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
  	}
	var csrftoken = getCookie('csrftoken');
	function csrfSafeMethod(method) {
	  // these HTTP methods do not require CSRF protection
	  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	}
	function sameOrigin(url) {
	  // test that a given url is a same-origin URL
	  // url could be relative or scheme relative or absolute
	  var host = document.location.host; // host + port
	  var protocol = document.location.protocol;
	  var sr_origin = '//' + host;
	  var origin = protocol + sr_origin;
	  // Allow absolute or scheme relative URLs to same origin
	  return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
	      (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
	      // or any other URL that isn't scheme relative or absolute i.e relative.
	      !(/^(\/\/|http:|https:).*/.test(url));
	}
	$.ajaxSetup({
	beforeSend: function(xhr, settings) {
	    if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
	        // Send the token to same-origin, relative URLs only.
	        // Send the token only if the method warrants CSRF protection
	        // Using the CSRFToken value acquired earlier
	        xhr.setRequestHeader("X-CSRFToken", csrftoken);
	    }
	}
	});

});