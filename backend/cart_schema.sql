DROP TABLE IF EXISTS Carts;
CREATE TABLE Carts (
    user_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT,
    time_stamp DATETIME,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (item_id) REFERENCES Items(item_id)
);


DROP PROCEDURE IF EXISTS add_to_shopping_cart;
DELIMITER |
CREATE PROCEDURE add_to_shopping_cart(  
    IN adduser_id INT,
    IN additem_id INT,
    IN addquantity INT,
    IN addtime_stamp DATETIME
)
BEGIN
    INSERT INTO Carts(user_id, item_id, quantity, time_stamp)
    VALUES(adduser_id, additem_id, addquantity, addtime_stamp);
    SELECT 1;
END; |
DELIMITER ;


# remove a item record 
DROP PROCEDURE IF EXISTS remove_from_shopping_cart;
DELIMITER |
CREATE PROCEDURE remove_from_shopping_cart(  
	IN rmuser_id INT,
    IN rmitem_id INT
)
BEGIN
    DELETE FROM Carts WHERE item_id=rmitem_id and user_id=rmuser_id;
    SELECT 1;
END; |
DELIMITER ;

# get a user shopping cart
DROP PROCEDURE IF EXISTS get_shopping_cart;
DELIMITER |
CREATE PROCEDURE get_shopping_cart(  
    IN inuser_id  INT
)
BEGIN
    SELECT item_id, quantity FROM Carts WHERE user_id=inuser_id;
END; |
DELIMITER ;


DROP PROCEDURE IF EXISTS update_shopping_cart;
DELIMITER |
CREATE PROCEDURE update_shopping_cart(  
    IN inuser_id INT,
    IN initem_id INT,
    IN inquantity INT,
    IN intime_stamp DATETIME
)
BEGIN
    UPDATE Carts
    SET quantity = inquantity,
        time_stamp = intime_stamp
    WHERE item_id = initem_id AND user_id = inuser_id;
    SELECT 1;
END; |
DELIMITER ;