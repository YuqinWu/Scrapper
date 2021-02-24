
DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
	user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    # stataus: 1=active, 2=suspend(user), 3=block(admin)
    status INT,
    description VARCHAR(250),
    role VARCHAR(50),
    rating INT DEFAULT 0,
	PRIMARY KEY (user_id)
);

DROP PROCEDURE IF EXISTS add_user;
DELIMITER |
CREATE PROCEDURE add_user(  
    IN addusername  VARCHAR(50),    
    IN addpassword VARCHAR(50), 
    IN addemail VARCHAR(50),
    IN addstatus INT,
    IN adddescription VARCHAR(250),
    IN addrole VARCHAR(50)
)
BEGIN
    INSERT INTO Users (username, password, email, status, description, role)
    VALUES(addusername, addpassword, addemail, addstatus, adddescription, addrole);
    SELECT addusername;
END; |
DELIMITER ;

DROP PROCEDURE IF EXISTS login;
DELIMITER |
CREATE PROCEDURE login(  
    IN inusername  VARCHAR(50),    
    IN inpassword VARCHAR(50)
)
BEGIN
    SELECT * FROM Users WHERE username=inusername and password=inpassword;
END; |
DELIMITER ;

DROP PROCEDURE IF EXISTS get_user;
DELIMITER |
CREATE PROCEDURE get_user(  
    IN inuser_id  VARCHAR(50)
)
BEGIN
    SELECT * FROM Users WHERE user_id=inuser_id;
END; |
DELIMITER ;