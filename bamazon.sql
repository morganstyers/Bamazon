DROP DATABASE if EXISTS bamazon_DB;
CREATE database bamazon_DB;
USE bamazon_DB;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Item', 'Cosmetics', 8.00, 30),
		('Item', 'Cosmetics', 6.25, 200),
		('Item', 'Grocery', 5.34, 9),
		('Item', 'Grocery', 1.00, 1),
		('Item', 'Produce', 0.35, 2),
		('Item', 'Produce', 0.20, 900),
		('Item', 'Grocery', 4.45, 26)
		