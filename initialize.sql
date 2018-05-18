DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(64) NOT NULL,
  department_name VARCHAR(32) NOT NULL,
  price DECIMAL (10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);
INSERT INTO products (product_name, department_name , price, stock_quantity)
VALUES ("Hand Tools", "Tools", 180.00, 15),
		("Humidifier", "Home Improvement", 30.00, 20),
		("Heaters", "Air Quality", 200.00, 10),
		("Table", "Furniture", 150.00, 15),
		("Bags", "Fashion", 120.00, 7),
		("Lamp", "Home Decor", 90.00, 12),
		("Dinning Table", "Furniture", 200.00, 4),
		("Lab Top", "Electronics", 700.00, 6),
		("Duffle Bag", "Travalling", 100.00, 11),
		("Paint", "Home Decor", 50.00, 2);
