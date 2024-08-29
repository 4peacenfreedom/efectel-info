<?php
// Configuración del correo
$to = '4peacenfreedom@gmail.com'; // Dirección de correo del cliente
$subject = 'Nueva aplicación de empleo';
$headers = "From: noreply@tu-dominio.com\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"_1_\"\r\n";

// Validar si el formulario fue enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir los datos del formulario
    $fullName = htmlspecialchars(trim($_POST["fullName"]));
    $idNumber = htmlspecialchars(trim($_POST["idNumber"]));
    $phone = htmlspecialchars(trim($_POST["phone"]));
    $residence = htmlspecialchars(trim($_POST["residence"]));
    $hasChildren = htmlspecialchars(trim($_POST["hasChildren"]));
    $callCenterExperience = htmlspecialchars(trim($_POST["callCenterExperience"]));
    $hasContactsInCompany = htmlspecialchars(trim($_POST["hasContactsInCompany"]));
    $contactName = isset($_POST["contactName"]) ? htmlspecialchars(trim($_POST["contactName"])) : null;

    // Validar si hay archivo adjunto
    if (isset($_FILES['resume']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['resume']['tmp_name'];
        $fileName = $_FILES['resume']['name'];
        $fileSize = $_FILES['resume']['size'];
        $fileType = $_FILES['resume']['type'];
        $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $allowedFileTypes = ['pdf', 'doc', 'docx'];

        // Verificar tamaño del archivo
        if ($fileSize > $maxFileSize) {
            echo "El archivo es demasiado grande. Máximo permitido es 1MB.";
            exit;
        }

        // Verificar tipo de archivo
        if (!in_array($fileExtension, $allowedFileTypes)) {
            echo "Solo se permiten archivos PDF, DOC o DOCX.";
            exit;
        }

        // Mover archivo a la carpeta de destino
        $newFileName = $uploadDir . time() . "_" . $fileName;
        if (move_uploaded_file($fileTmpPath, $newFileName)) {
            // Preparar el cuerpo del correo
            $message = "--_1_\r\n";
            $message .= "Content-Type: text/plain; charset=\"UTF-8\"\r\n";
            $message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
            $message .= "Se ha recibido una nueva aplicación de empleo:\r\n";
            $message .= "Nombre completo: $fullName\r\n";
            $message .= "Cédula o pasaporte: $idNumber\r\n";
            $message .= "Teléfono: $phone\r\n";
            $message .= "Residencia: $residence\r\n";
            $message .= "¿Tiene hijos?: $hasChildren\r\n";
            $message .= "¿Experiencia en Call Center?: $callCenterExperience\r\n";
            $message .= "¿Conocidos en la empresa?: $hasContactsInCompany";
            if ($contactName) {
                $message .= " (Nombre: $contactName)\r\n";
            }
            $message .= "\r\n";

            // Adjuntar el archivo
            $file = fopen($newFileName, "r");
            $content = fread($file, filesize($newFileName));
            fclose($file);
            $content = chunk_split(base64_encode($content));

            $message .= "--_1_\r\n";
            $message .= "Content-Type: application/octet-stream; name=\"" . basename($newFileName) . "\"\r\n";
            $message .= "Content-Transfer-Encoding: base64\r\n";
            $message .= "Content-Disposition: attachment; filename=\"" . basename($newFileName) . "\"\r\n\r\n";
            $message .= $content . "\r\n";
            $message .= "--_1_--";

            // Enviar el correo
            if (mail($to, $subject, $message, $headers)) {
                echo "Formulario enviado exitosamente. El archivo fue adjuntado y enviado por correo.";
            } else {
                echo "Hubo un error enviando el correo. Por favor, intenta de nuevo.";
            }
        } else {
            echo "Hubo un error subiendo el archivo. Por favor, intenta de nuevo.";
        }
    } else {
        echo "Debes adjuntar un currículum.";
    }
} else {
    echo "Formulario no enviado correctamente.";
}
?>
