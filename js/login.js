$(document).ready(function() {
    // hide the forms when page is ready
    $('#first').show();
    $('#second').hide();

    $('#signup').click(function(){
        $('#first').hide();
        $('#second').show();
    });
    $('#signin').click(function(){
        $('#second').hide();
        $('#first').show();
    });
});



$(function() {
 $("form[name='login']").validate({
   rules: {

     username: {
       required: true,
     },
     password: {
       required: true,

     }
   },
    messages: {
     username: "Please enter a username",

     password: {
       required: "Please enter password",

     }

   },
   submitHandler: function(form) {
     form.submit();
   }
 });
});



$(function() {

  $("form[name='registration']").validate({
    rules: {
      username: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 5
      }
    },

    messages: {
      username: "Please enter a username",
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long"
      },
      email: "Please enter a valid email address"
    },

    submitHandler: function(form) {
      form.submit();
    }
  });
});
