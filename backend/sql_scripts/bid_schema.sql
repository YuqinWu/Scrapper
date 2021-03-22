DROP TABLE IF EXISTS BidItems;
CREATE TABLE BidItems (
	bid_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    item_id INT NOT NULL,
	PRIMARY KEY (bid_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (item_id) REFERENCES Items(item_id)
);

DROP PROCEDURE IF EXISTS get_bid;
DELIMITER |
CREATE PROCEDURE get_bid(  
    IN inuser_id  INT
)
BEGIN
    SELECT * FROM BidItems WHERE user_id=inuser_id;
END; |
DELIMITER ;


DROP PROCEDURE IF EXISTS add_bid;
DELIMITER |
CREATE PROCEDURE add_bid(  
    IN adduser_id INT,
    IN additem_id INT
)
BEGIN
    INSERT INTO BidItems (user_id, item_id)
    VALUES(adduser_id, additem_id);
    SELECT LAST_INSERT_ID();
END; |
DELIMITER ;

DROP PROCEDURE IF EXISTS select_bid;
DELIMITER |
CREATE PROCEDURE select_bid(  
    IN inuser_id INT,
    IN initem_id INT
)
BEGIN
    SELECT * FROM BidItems WHERE user_id = inuser_id and item_id = initem_id;
END; |
DELIMITER ;