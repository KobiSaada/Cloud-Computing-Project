//fix problem with password
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456789';

/*
  DB
*/
CREATE DATABASE callcenter 


/*
  users
*/
CREATE TABLE `callcenter`.`users` (
  `id` VARCHAR(45) NOT NULL UNIQUE,
  `userId` VARCHAR(45) NOT NULL UNIQUE,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `birthday` DATE NOT NULL,
  `age` INT NOT NULL,
  `gender` VARCHAR(45) NULL,
  PRIMARY KEY ( `userId`,`id`));
  

  /*
  products
*/
CREATE TABLE `callcenter`.`products` (
  `id` INT NOT NULL UNIQUE AUTO_INCREMENT,
  `productId` VARCHAR(45) NOT NULL UNIQUE,
  `userId` VARCHAR(45) NOT NULL ,
  `productText` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`, `productId`, `userId`),
  FOREIGN KEY (`userId`) REFERENCES users(`userId`));