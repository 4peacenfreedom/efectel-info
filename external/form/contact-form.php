<?php
    // Destinatario del correo
    $to = "info@efectel.com";

    // Asignar valores de los campos del formulario
    $from = $_POST['email']; // Aquí obtienes el correo del remitente
    $name = $_POST['name']; // Aquí obtienes el nombre
    $name2 = $_POST['name2']; // Aquí obtienes el apellido
    $servicio = $_POST['servicio']; // Servicio elegido
    $message = $_POST['message']; // Mensaje del usuario

    // Verificar que todos los campos requeridos estén completos
    if (empty($from) || empty($name) || empty($name2) || empty($servicio)) {
        echo "Todos los campos requeridos deben ser completados.";
        exit;
    }

    // Asunto del correo
    $subject = "Mensaje de la página EFECTEL";

    // Cuerpo del mensaje
    $body = "Acá está el mensaje enviado:\n\n";
    $body .= "Nombre: $name\n";
    $body .= "Apellido: $name2\n";
    $body .= "Email: $from\n";
    $body .= "Servicio: $servicio\n";
    $body .= "Mensaje: $message\n";

    // Cabeceras del correo
    $headers = "From: $from";

    // Enviar el correo
    if (mail($to, $subject, $body, $headers)) {
        echo "Formulario enviado con éxito.";
    } else {
        echo "Error al enviar el formulario.";
    }
?>
