CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  last_logged_in TIMESTAMP,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (id)
);
