<?php
session_start();

// Tiempo máximo de inactividad (5 minutos = 300 segundos)
$tiempo_maximo_inactividad = 300;

if (isset($_SESSION['ultimo_acceso'])) {
    $inactividad = time() - $_SESSION['ultimo_acceso'];
    if ($inactividad > $tiempo_maximo_inactividad) {
        // Cerrar sesión por inactividad
        session_unset();
        session_destroy();
        header("Location: login.php?timeout=1");
        exit();
    }
}

$_SESSION['ultimo_acceso'] = time();

// Credenciales de acceso
$usuario_correcto = "cliente";
$password_correcta = "12345";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST['usuario'];
    $password = $_POST['password'];

    // Verificar credenciales
    if ($usuario == $usuario_correcto && $password == $password_correcta) {
        $_SESSION['logueado'] = true;
        $_SESSION['ultimo_acceso'] = time(); // Registrar el tiempo del login
        header("Location: listar_aplicaciones.php");
        exit();
    } else {
        $error = "Usuario o contraseña incorrectos.";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h1>Iniciar Sesión</h1>
    <?php if (isset($_GET['timeout']) && $_GET['timeout'] == 1): ?>
        <p style="color: red;">La sesión ha expirado por inactividad.</p>
    <?php endif; ?>
    <?php if (isset($error)): ?>
        <p style="color: red;"><?php echo $error; ?></p>
    <?php endif; ?>
    <form action="login.php" method="post">
        <label for="usuario">Usuario:</label>
        <input type="text" name="usuario" id="usuario" required>
        <br>
        <label for="password">Contraseña:</label>
        <input type="password" name="password" id="password" required>
        <br>
        <button type="submit">Ingresar</button>
    </form>
</body>
</html>
