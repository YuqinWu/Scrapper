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
    IN initem_id  INT
)
BEGIN
    SELECT * FROM Items WHERE item_id=initem_id;
END; |
DELIMITER ;


DROP PROCEDURE IF EXISTS get_item_by_owner;
DELIMITER |
CREATE PROCEDURE get_item_by_owner(  
    IN inowner_id  INT
)
BEGIN
    SELECT * FROM Items WHERE owner_id=inowner_id;
END; |
DELIMITER ;


# remove a item record 
DROP PROCEDURE IF EXISTS remove_item;
DELIMITER |
CREATE PROCEDURE remove_item(  
    IN rmitem_id INT
)
BEGIN
    DELETE FROM Items WHERE item_id=rmitem_id;
    SELECT rmitem_id;
END; |
DELIMITER ;

# update a item record
DROP PROCEDURE IF EXISTS update_item;
DELIMITER |
CREATE PROCEDURE update_item(  
    IN initem_id INT,
    IN additem_name VARCHAR(50),
    IN additem_description VARCHAR(250),
    IN addquantity INT,
    IN addbuy_now_price FLOAT,
    IN addauction_start_price DOUBLE,
    IN addstart_time DATETIME,
    IN addend_time DATETIME,
    IN addsale_option INT,
    IN addcategory VARCHAR(50)
)
BEGIN
    UPDATE Items
    SET item_name = additem_name, 
        item_description = additem_description, 
        quantity = addquantity,
        buy_now_price = addbuy_now_price,
        auction_start_price = addauction_start_price,
        start_time = addstart_time,
        end_time = addend_time,
        sale_option = addsale_option,
        category = addcategory
    WHERE item_id = initem_id;
    SELECT initem_id;
END; |
DELIMITER ;



DROP PROCEDURE IF EXISTS search_item;
DELIMITER |
CREATE PROCEDURE search_item(  
    IN keyword  VARCHAR(50)
)
BEGIN
    SELECT * FROM Items WHERE item_name LIKE CONCAT('%', keyword, '%') 
    OR item_description LIKE CONCAT('%', keyword, '%') 
    OR category LIKE CONCAT('%', keyword, '%');
END; |
DELIMITER ;
