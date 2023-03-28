DROP DATABASE IF EXISTS `property`;

CREATE DATABASE `blog`;


DROP TABLE IF EXISTS `Property`;
DROP TABLE IF EXISTS `Users`;



CREATE TABLE `Property` (
    `property_id` BINARY(36) NOT NULL,
    `property_name` VARCHAR(255) NOT NULL,
    `property_location` VARCHAR(255) NOT NULL,
    `property_price` INT(255) NOT NULL,
    `property_image` MEDIUMBLOB NOT NULL,
    `property_listed_day` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `property_type` VARCHAR(255) NOT NULL,
    `property_purpose` VARCHAR(255) NOT NULL,
    `property_image_rooms`,
    PRIMARY KEY(`property_id`),
    CONSTRAINT FOREIGN KEY (`user_id`),
    REFERENCES Users(`user_id`)
);


CREATE TABLE `Sessions` (
    `session_id` varchar(128) COLLATE utf8mb4_bin NOT NULL,
    `expires` int(11) unsigned NOT NULL,
    `data` mediumtext COLLATE utf8mb4_bin,
    PRIMARY KEY (`session_id`)
);