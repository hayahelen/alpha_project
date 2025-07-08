-- roles

--admin role who has all permissions
CREATE TABLE role (
    id SERIAL PRIMARY KEY,  
    name VARCHAR(100), 
    merchantId INT REFERENCES merchant(id) ON DELETE CASCADE ON UPDATE CASCADE,
    isActive BOOLEAN NOT NULL DEFAULT TRUE, 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- permissions
CREATE TABLE permission (
    id SERIAL PRIMARY KEY,  
    entity VARCHAR(255),
    action VARCHAR(255),
    name VARCHAR(100), 
    isActive BOOLEAN NOT NULL DEFAULT TRUE, 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- roles-permissions


CREATE TABLE rolePermissionAssignment (
    roleId INT REFERENCES role(id) ON DELETE CASCADE ON UPDATE CASCADE,
    permissionId INT REFERENCES permission(id) ON DELETE CASCADE ON UPDATE CASCADE,
    isActive BOOLEAN NOT NULL DEFAULT TRUE, 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (roleId, permissionId)
);

--here we delete the role directly (implement hard delete in crud)
ALTER TABLE "user" ADD COLUMN roleId INT REFERENCES role(id) ON DELETE CASCADE ON UPDATE CASCADE;