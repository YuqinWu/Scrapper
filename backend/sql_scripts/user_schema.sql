
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

#add a user record 
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

DROP PROCEDURE IF EXISTS update_user;
DELIMITER |
CREATE PROCEDURE update_user(  
    IN inuser_id  INT,
    IN addemail VARCHAR(50),
    IN addpassword VARCHAR(50), 
    IN adddescription VARCHAR(250)
)
BEGIN
    UPDATE Users
    SET email = addemail, 
        password = addpassword, 
        description = adddescription
    WHERE user_id = inuser_id;
    SELECT inuser_id;
END; |
DELIMITER ;


#log in user
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

# get a user record
DROP PROCEDURE IF EXISTS get_user;
DELIMITER |
CREATE PROCEDURE get_user(  
    IN inuser_id  INT
)
BEGIN
    SELECT * FROM Users WHERE user_id=inuser_id;
END; |
DELIMITER ;

#remove a user record 
DROP PROCEDURE IF EXISTS remove_user;
DELIMITER |
CREATE PROCEDURE remove_user(  
    IN rmuser_id INT
)
BEGIN
    DELETE FROM Users WHERE user_id=rmuser_id;
    SELECT rmuser_id;
END; |
DELIMITER ;


DROP PROCEDURE IF EXISTS suspend_user;
DELIMITER |
CREATE PROCEDURE suspend_user(  
    IN inuser_id  INT
)
BEGIN
    UPDATE Users
    SET status = 2
    WHERE user_id = inuser_id;
    SELECT inuser_id;
END; |
DELIMITER ;

DROP PROCEDURE IF EXISTS reactivate_user;
DELIMITER |
CREATE PROCEDURE reactivate_user(  
    IN inuser_id  INT
)
BEGIN
    UPDATE Users
    SET status = 1
    WHERE user_id = inuser_id;
    SELECT inuser_id;
END; |
DELIMITER ;
