<?php
// Configuración de la base de datos
$servername = "localhost"; // Cambia por la URL de tu servidor
$username = "usuario_db";  // Cambia por el nombre de usuario de la DB
$password = "contraseña_db";  // Cambia por la contraseña de la DB
$dbname = "aplicacion_empleo";  // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

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
        if ($fileSize > 1048576) { // 1MB
            echo "El archivo es demasiado grande. Máximo permitido es 1MB.";
            exit;
        }

        // Verificar tipo de archivo
        if (!in_array($fileExtension, $allowedFileTypes)) {
            echo "Solo se permiten archivos PDF, DOC o DOCX.";
            exit;
        }

        // Mover archivo a la carpeta de destino
        $uploadDir = 'uploads/';
        $newFileName = $uploadDir . time() . "_" . $fileName;
        if (move_uploaded_file($fileTmpPath, $newFileName)) {
            // Insertar datos en la base de datos
            $stmt = $conn->prepare("INSERT INTO aplicaciones (nombre_completo, cedula_pasaporte, telefono_contacto, residencia, tiene_hijos, experiencia_call_center, tiene_conocidos, nombre_contacto, archivo_curriculum) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("sssssssss", $fullName, $idNumber, $phone, $residence, $hasChildren, $callCenterExperience, $hasContactsInCompany, $contactName, $newFileName);

            if ($stmt->execute()) {
                echo "Formulario enviado exitosamente y datos guardados en la base de datos.";
            } else {
                echo "Error guardando los datos: " . $stmt->error;
            }
            $stmt->close();
        } else {
            echo "Hubo un error subiendo el archivo. Por favor, intenta de nuevo.";
        }
    } else {
        echo "Debes adjuntar un currículum.";
    }
} else {
    echo "Formulario no enviado correctamente.";
}

$conn->close();
?>
