$(document).ready(function(){  

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

  $('.loginBtn').on('click', function(e){

    e.preventDefault();

    var username = document.getElementById("loginUsername").value;
    var password = document.getElementById("loginPassword").value;

    $.post("/login-user/",
    {   
        username: username,
        password: password
    },
    function(data, status){
      console.log(data, status); 
      
    })
    .done(function(){
      console.log("success");
      window.location.href = "/books";
    })
    .fail(function(){
      console.log("fail");
      $("#modalP").text("Username/Password is not correct");
      $('.myModal').modal('show');
    });
  });

  //Sign up
  $('.signupBtn').on('click', function(e){

    e.preventDefault();


    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var firstName = document.getElementById("fname").value;
    var lastName = document.getElementById("lname").value;

    if((username == "") || (password == "") || (email == "") || (firstName == "") || (lastName == "")){
      if( email.indexOf("@") == -1){
        $("#modalP").text("Email is incorrect");
        $('.myModal').modal('show'); 
      }else{
        $("#modalP").text("Form data is invalid");
        $('.myModal').modal('show');   
      }
      
    }else{
      $.post("/signup/",
      {   
          username: username,
          password: password,
          email: email,
          firstName: firstName,
          lastName: lastName
      },
      function(data, status){
        console.log(data, status); 
        
      })
      .done(function(){
        console.log("success");
        $("#modalP").text("You have registered successfully!");
        $('.myModal').modal('show');
      })
      .fail(function(){
        console.log("fail");
        $("#modalP").text("Username already exists");
        $('.myModal').modal('show');
      });  
    }
  });

  $('.form').find('input, textarea').on('keyup blur focus', function (e) {
    
    var $this = $(this),
        label = $this.prev('label');

  	  if (e.type === 'keyup') {
  			if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.addClass('active highlight');
          }
      } else if (e.type === 'blur') {
      	if( $this.val() === '' ) {
      		label.removeClass('active highlight'); 
  			} else {
  		    label.removeClass('highlight');   
  			}   
      } else if (e.type === 'focus') {
        
        if( $this.val() === '' ) {
      		label.removeClass('highlight'); 
  			} 
        else if( $this.val() !== '' ) {
  		    label.addClass('highlight');
  			}
      }

  });

  $('.tab a').on('click', function (e) {
    
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
    
  });

  $('.facebookLogin').on('click', function(e){
    $.post("/facebook-login/",
    {   
      
    },
    function(data, status){
      console.log(data, status); 
      
    })
    .done(function(){
      console.log("success");
      window.location.href = "/books";
    })
    .fail(function(){
      console.log("fail");
    });
  });

})