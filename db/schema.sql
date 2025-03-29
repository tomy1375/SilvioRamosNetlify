-- Crear tablas para la base de datos

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
id SERIAL PRIMARY KEY,
nombre VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
tipo VARCHAR(50) NOT NULL DEFAULT 'cliente',
empresa VARCHAR(255),
telefono VARCHAR(50),
fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de planos
CREATE TABLE IF NOT EXISTS planos (
id SERIAL PRIMARY KEY,
nombre VARCHAR(255) NOT NULL,
tipo VARCHAR(100) NOT NULL,
descripcion TEXT,
archivo_url VARCHAR(255) NOT NULL,
usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de historial de descargas
CREATE TABLE IF NOT EXISTS historial (
id SERIAL PRIMARY KEY,
usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
plano_id INTEGER REFERENCES planos(id) ON DELETE CASCADE,
fecha DATE NOT NULL,
hora TIME NOT NULL
);

-- Insertar datos de ejemplo

-- Usuarios
INSERT INTO usuarios (nombre, email, password, tipo, empresa, telefono)
VALUES 
('Administrador', 'admin@ingecivil.com', '$2a$10$XYZ123...', 'admin', 'IngeCivil', '555-1234'),
('Juan Pérez', 'juan@ejemplo.com', '$2a$10$ABC456...', 'cliente', 'Constructora XYZ', '555-5678'),
('María López', 'maria@ejemplo.com', '$2a$10$DEF789...', 'cliente', 'Desarrollos Urbanos', '555-9012'),
('Carlos Rodríguez', 'carlos@ejemplo.com', '$2a$10$GHI101...', 'cliente', 'Arquitectura Moderna', '555-3456');

-- Planos
INSERT INTO planos (nombre, tipo, descripcion, archivo_url, usuario_id)
VALUES 
('Plano Estructural - Edificio A', 'Estructural', 'Plano estructural para el Edificio A', '/planos/estructural-edificio-a.pdf', 2),
('Plano Hidráulico - Edificio A', 'Hidráulico', 'Sistema hidráulico para el Edificio A', '/planos/hidraulico-edificio-a.pdf', 2),
('Plano Eléctrico - Edificio A', 'Eléctrico', 'Instalaciones eléctricas para el Edificio A', '/planos/electrico-edificio-a.pdf', 2),
('Plano Topográfico - Terreno B', 'Topográfico', 'Levantamiento topográfico del Terreno B', '/planos/topografico-terreno-b.pdf', 3);

-- Historial
INSERT INTO historial (usuario_id, plano_id, fecha, hora)
VALUES 
(2, 1, '2023-03-18', '14:30:00'),
(2, 2, '2023-03-22', '10:15:00'),
(2, 3, '2023-03-27', '16:45:00'),
(3, 4, '2023-04-12', '09:20:00'),
(2, 1, '2023-04-20', '11:30:00');