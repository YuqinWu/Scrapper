DROP TABLE IF EXISTS Items;
CREATE TABLE Items (
	item_id INT NOT NULL AUTO_INCREMENT,
    owner_id INT NOT NULL,
    item_name VARCHAR(50),
    item_description VARCHAR(250),
    # status: 1=active, 2=suspend(user), 3=block(admin)
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

DROP PROCEDURE IF EXISTS add_user;
DELIMITER |
CREATE PROCEDURE add_user(	
	IN addusername	VARCHAR(50),    
	IN addpassword VARCHAR(50),	
	IN addemail VARCHAR(50),
    IN addstatus INT,
    IN adddescription VARCHAR(250),
    IN addrole VARCHAR(50)
)
BEGIN
	INSERT INTO Users (username, password, email, status, description, role)
	VALUES(addusername, addpassword, addemail, addstatus, adddescription, addrole);
END; |
DELIMITER ;