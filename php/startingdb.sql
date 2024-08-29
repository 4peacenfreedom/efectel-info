CREATE DATABASE aplicacion_empleo;

USE aplicacion_empleo;

CREATE TABLE aplicaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    cedula_pasaporte VARCHAR(50) NOT NULL,
    telefono_contacto VARCHAR(20) NOT NULL,
    residencia VARCHAR(50) NOT NULL,
    tiene_hijos ENUM('Si', 'No') NOT NULL,
    experiencia_call_center ENUM('Si', 'No') NOT NULL,
    tiene_conocidos ENUM('Si', 'No') NOT NULL,
    nombre_contacto VARCHAR(255),
    archivo_curriculum VARCHAR(255),
    fecha_aplicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
