create database seprj;
use seprj;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create TABLE subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(200),
  price DECIMAL(10, 2) NOT NULL,
  billing_cycle VARCHAR(100) NOT NULL,
  status VARCHAR(100) DEFAULT 'active',
  next_billing DATE,
  logo_url VARCHAR(255),
  manage_url VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
);