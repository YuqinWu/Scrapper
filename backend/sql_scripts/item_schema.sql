DROP TABLE IF EXISTS Items;
CREATE TABLE Items (
	item_id INT NOT NULL AUTO_INCREMENT,
    owner_id INT NOT NULL,
    item_name VARCHAR(50),
    item_description VARCHAR(250),
    status INT,
    quantity INT,
    sale_option INT,
    start_time DATETIME,
    end_time DATETIME,
    buy_now_price FLOAT,
    auction_start_price DOUBLE,
    auction_end_price DOUBLE,
    category VARCHAR(50),
    image_link VARCHAR(250),
    flag INT,
	PRIMARY KEY (item_id),
    FOREIGN KEY (owner_id) REFERENCES Users(user_id)
);

DROP PROCEDURE IF EXISTS add_item;
DELIMITER |
CREATE PROCEDURE add_item(  
    IN addowner_id INT,
    IN additem_name VARCHAR(50),
    IN additem_description VARCHAR(250),
    IN addstatus INT,
    IN addquantity INT,
    IN addsale_option INT,
    IN addstart_time DATETIME,
    IN addend_time DATETIME,
    IN addbuy_now_price FLOAT,
    IN addauction_start_price DOUBLE,
    IN addauction_end_price DOUBLE,
    IN addcategory VARCHAR(50),
    IN addimage_link VARCHAR(250),
    IN addflag INT
)
BEGIN
    INSERT INTO Items (owner_id, item_name, item_description, status, quantity, sale_option, start_time, end_time, buy_now_price, auction_start_price, auction_end_price, category, image_link, flag)
    VALUES(addowner_id, additem_name, additem_description, addstatus, addquantity, addsale_option, addstart_time, addend_time, addbuy_now_price, addauction_start_price, addauction_end_price, addcategory, addimage_link, addflag);
    SELECT LAST_INSERT_ID();
END; |
DELIMITER ;

DROP PROCEDURE IF EXISTS get_item;
DELIMITER |
CREATE PROCEDURE get_item(  
    IN initem_id  VARCHAR(50)
)
BEGIN
    SELECT * FROM Items WHERE item_id=initem_id;
END; |
DELIMITER ;