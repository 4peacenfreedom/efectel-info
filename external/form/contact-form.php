<?php

	// aca el correo
	$to = "info@efectel.com";
	$from = 'email';
	$name = 'name';
	$headers = "From: $from";
	$subject = "Mensaje de la pagina EFECTEL";

	$fields = array();
	$fields{"name"} = "First Name";
	$fields{"name2"} = "Last Name";
	$fields{"email"} = "Email";
	$fields{"servicio"} = "Servicio";
	$fields{"message"} = "Your Message";

	$body = "Aca esta el mensaje enviado:\n\n"; foreach($fields as $a => $b){   $body .= sprintf("%20s:%s\n",$b,$_REQUEST[$a]); }

	$send = mail($to, $subject, $body, $headers, $message);

?>
