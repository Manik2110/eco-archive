CREATE DATABASE IF NOT EXISTS eco_archive;
USE eco_archive;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  is_admin TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS resources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  subject VARCHAR(100),
  file_type VARCHAR(50),
  filename VARCHAR(255) NOT NULL,
  uploaded_by INT,
  downloads INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Seed admin user (password: admin123)
INSERT INTO users (name, email, password, is_admin) VALUES
('Admin', 'admin@eco.com', '$2a$10$W3rKWZTgXVo3ruCDCMTcIuG13QzRwRl7xHcXXiq8AbQgLMltODxKi', 1);
