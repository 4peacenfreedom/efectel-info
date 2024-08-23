<?php

	// youremail here
	$to = "yourmail@gmail.com";
	$from = 'email';
	$name = 'name';
	$headers = "From: $from";
	$subject = "You have a message.";

	$fields = array();
	$fields{"name"} = "First Name";
	$fields{"name2"} = "Last Name";
	$fields{"email"} = "Email";
	$fields{"number"} = "Phone number";

	$body = "Here is what was sent:\n\n"; foreach($fields as $a => $b){   $body .= sprintf("%20s:%s\n",$b,$_REQUEST[$a]); }

	$send = mail($to, $subject, $body, $headers, $message);

?>
