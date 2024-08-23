jQuery(function($){
	$('#contactform').validate({
		rules: {
			name: {
				required: true,
				minlength: 2
			},
			email: {
				required: true,
				email: true
			},
			message: {
				required: true,
			}
		},
		messages: {
			name: {
				required: "Please enter your name",
				minlength: "Your name must consist of at least 2 characters"
			},
			email: {
				required: "Please enter your email"
			},
			message: {
				required: "Please enter your message"
			}
		},
		submitHandler: function(form) {
			$(form).ajaxSubmit({
				type:"POST",
				data: $(form).serialize(),
				url:"external/form/contact-form.php",
				success: function() {
					$('#success').fadeIn();
					$('#contactform').each(function(){this.reset();});
					$('#contactform .form-group').each(function(){
						if($(this).hasClass('focused')){
							$(this).removeClass('focused');
						}
					});
				},
				error: function() {
					$('#contactform').fadeTo( "slow", 1, function() {
						$('#error').fadeIn();
					});
				}
			});
		}
	});
	$('#contactform02').validate({
		rules: {
			name: {
				required: true,
				minlength: 2
			},
			email: {
				required: true,
				email: true
			},
			message: {
				required: true,
			}
		},
		messages: {
			name: {
				required: "Please enter your name",
				minlength: "Your name must consist of at least 2 characters"
			},
			email: {
				required: "Please enter your email"
			},
			message: {
				required: "Please enter your message"
			}
		},
		submitHandler: function(form) {
			$(form).ajaxSubmit({
				type:"POST",
				data: $(form).serialize(),
				url:"external/form/contact-form02.php",
				success: function() {
					$('#success').fadeIn();
					$('#contactform02').each(function(){this.reset();});
					$('#contactform02 .form-group').each(function(){
						if($(this).hasClass('focused')){
							$(this).removeClass('focused');
						}
					});
				},
				error: function() {
					$('#contactform02').fadeTo( "slow", 1, function() {
						$('#error').fadeIn();
					});
				}
			});
		}
	});
	$('#newsletter-01').validate({
		rules: {
			email: {
				required: true,
				email: true
			}
		},
		submitHandler: function(form) {
			$(form).ajaxSubmit({
				type:"POST",
				data: $(form).serialize(),
				url:"external/form/newsletter-form.php",
				success: function() {
					  $('#success').fadeIn();
			$('#newsletterform-01').each(function(){this.reset();});
				},
				error: function() {
					$('#newsletter-01').fadeTo( "slow", 1, function() {
						$('#error').fadeIn();
					});
				}
			});
		}
	});
});