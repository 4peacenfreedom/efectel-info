<?php

	// tu correo aca
	$to = "info@efectel.com";
	$from = 'email';
	$name = 'name';
	$headers = "From: $from";
	$subject = "Mensaje de la pagina EFECTEL.";

	$fields = array();
	$fields{"email"} = "Tu Correo";

	$body = "Este es el mensaje, de 'NEWSLETTER SIGNUP':\n\n"; foreach($fields as $a => $b){   $body .= sprintf("%20s:%s\n",$b,$_REQUEST[$a]); }

	$send = mail($to, $subject, $body, $headers, $message);

?>
