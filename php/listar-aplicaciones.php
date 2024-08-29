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

$_SESSION['ultimo_acceso'] = time(); // Actualizar el tiempo de la última actividad

if (!isset($_SESSION['logueado']) || $_SESSION['logueado'] !== true) {
    header("Location: login.php");
    exit();
}

// Configuración de la base de datos
$servername = "localhost";
$username = "usuario_db";
$password = "contraseña_db";
$dbname = "aplicacion_empleo";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Variables para los filtros
$filtro_cedula = "";
$filtro_nombre = "";

// Procesar el formulario de búsqueda
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (!empty($_GET['cedula'])) {
        $filtro_cedula = $conn->real_escape_string($_GET['cedula']);
    }

    if (!empty($_GET['nombre'])) {
        $filtro_nombre = $conn->real_escape_string($_GET['nombre']);
    }
}

// Construir la consulta SQL con los filtros aplicados
$sql = "SELECT id, nombre_completo, cedula_pasaporte, telefono_contacto, residencia, tiene_hijos, experiencia_call_center, tiene_conocidos, nombre_contacto, archivo_curriculum, fecha_aplicacion FROM aplicaciones WHERE 1=1";

if ($filtro_cedula) {
    $sql .= " AND cedula_pasaporte LIKE '%$filtro_cedula%'";
}

if ($filtro_nombre) {
    $sql .= " AND nombre_completo LIKE '%$filtro_nombre%'";
}

$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Aplicaciones</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
    </style>
</head>
<body>

<h1>Lista de Aplicaciones</h1>

<form method="get" action="listar_aplicaciones.php">
    <label for="cedula">Buscar por Cédula:</label>
    <input type="text" name="cedula" id="cedula" value="<?php echo htmlspecialchars($filtro_cedula); ?>">
    <br>
    <label for="nombre">Buscar por Nombre Completo:</label>
    <input type="text" name="nombre" id="nombre" value="<?php echo htmlspecialchars($filtro_nombre); ?>">
    <br>
    <button type="submit">Buscar</button>
</form>

<?php if ($result->num_rows > 0): ?>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre Completo</th>
                <th>Cédula/Pasaporte</th>
                <th>Teléfono</th>
                <th>Residencia</th>
                <th>Tiene Hijos</th>
                <th>Experiencia Call Center</th>
                <th>Conocidos en la Empresa</th>
                <th>Nombre del Contacto</th>
                <th>Currículum</th>
                <th>Fecha de Aplicación</th>
            </tr>
        </thead>
        <tbody>
        <?php while ($row = $result->fetch_assoc()): ?>
            <tr>
                <td><?php echo $row['id']; ?></td>
                <td><?php echo htmlspecialchars($row['nombre_completo']); ?></td>
                <td><?php echo htmlspecialchars($row['cedula_pasaporte']); ?></td>
                <td><?php echo htmlspecialchars($row['telefono_contacto']); ?></td>
                <td><?php echo htmlspecialchars($row['residencia']); ?></td>
                <td><?php echo htmlspecialchars($row['tiene_hijos']); ?></td>
                <td><?php echo htmlspecialchars($row['experiencia_call_center']); ?></td>
                <td><?php echo htmlspecialchars($row['tiene_conocidos']); ?></td>
                <td><?php echo htmlspecialchars($row['nombre_contacto']); ?></td>
                <td><a href="<?php echo htmlspecialchars($row['archivo_curriculum']); ?>" download>Descargar</a></td>
                <td><?php echo $row['fecha_aplicacion']; ?></td>
            </tr>
        <?php endwhile; ?>
        </tbody>
    </table>
<?php else: ?>
    <p>No se encontraron resultados.</p>
<?php endif; ?>

<?php $conn->close(); ?>

</body>
</html>
