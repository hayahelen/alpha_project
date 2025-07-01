--table creation



CREATE TABLE "user" (

id SERIAL PRIMARY KEY,  
firstName VARCHAR(100) NOT NULL, 
lastName VARCHAR(100) NOT NULL, 
email VARCHAR(255) UNIQUE NOT NULL, 
password TEXT NOT NULL, 
refreshToken TEXT NOT NULL,
isActive BOOLEAN NOT NULL DEFAULT TRUE, 
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- --functions

-- --get by email

-- CREATE FUNCTION getByEmail(uemail TEXT)
-- RETURNS users_table
-- AS
-- $$

-- BEGIN
-- RETURN (SELECT * FROM user WHERE email = uemail);
-- END;

-- $$
-- LANGUAGE plpgsql;


-- -- get by id

-- CREATE FUNCTION getById(uId INT)
-- RETURNS user
-- AS
-- $$
-- BEGIN

-- RETURN (SELECT * FROM user WHERE id = uId);

-- END;

-- $$
-- LANGUAGE plpgsql;


-- --get multiple or all

-- CREATE FUNCTION getAll()
-- RETURNS text
-- AS
-- $$
-- BEGIN

-- SELECT * from user;

-- END;
-- $$
-- LANGUAGE plpgsql;


-- --create

-- CREATE FUNCTION createUser(fname TEXT, lname TEXT, uemail TEXT, upassword CHAR(50), refresht TEXT, uisactive BOOLEAN)
-- RETURNS INT
-- AS
-- $$

-- -- DECLARE
-- --     newId INT;

-- BEGIN

--     INSERT INTO user (
--         firstName TEXT, 
--         lastName TEXT, 
--         email TEXT, 
--         password CHAR(50), 
--         refreshToken TEXT, 
--         isActive BOOLEAN, 
--         createdAt DATETIME, 
--         updatedAt DATETIME ) 
        
--         VALUES (
--             fname TEXT, 
--             lname TEXT, 
--             uemail TEXT, 
--             upassword CHAR(50), 
--             refresht TEXT, 
--             uisactive BOOLEAN) 
            
--             RETURNING *
--             --RETURNING id INTO newId;
--             --RETURN newId;



-- END;

-- $$

-- LANGUAGE plpgsql;



-- --update

-- CREATE FUNCTION updateUser(uId INT, fname TEXT, lname TEXT, uemail TEXT, upassword CHAR(50), refresht TEXT, uisactive BOOLEAN)
-- RETURNS VOID
-- AS
-- $$
-- BEGIN

-- UPDATE user SET 
-- firstName = fname, 
-- lastName - lname, 
-- email = uemail, 
-- password = upassword, 
-- refreshToken = refresht, 
-- isActive = uisactive, 
-- updatedAt = CURRENT_TIMESTAMP  

-- WHERE id = uId
-- END;

-- $$
-- LANGUAGE plpgsql;



-- --delete

-- CREATE FUNCTION deleteUser(uId INT)
-- RETURNS VOID
-- AS
-- $$
-- BEGIN
 
-- DELETE FROM user WHERE id = uId

-- -- OR UPDATE user SET isActive = FALSE WHERE id = uId

-- END;

-- $$
-- LANGUAGE plpgsql;



