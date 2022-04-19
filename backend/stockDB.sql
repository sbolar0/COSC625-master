-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema StockdB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema StockdB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `StockdB` DEFAULT CHARACTER SET utf8 ;
USE `StockdB` ;

-- -----------------------------------------------------
-- Table `StockdB`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `StockdB`.`roles` (
  `role` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`role`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `StockdB`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `StockdB`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `mobile` VARCHAR(10) NOT NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `role` VARCHAR(10) NULL COMMENT 'Admin\nGU\nBlogger',
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `mobile_UNIQUE` (`mobile` ASC) VISIBLE,
  INDEX `role_idx` (`role` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_role`
    FOREIGN KEY (`role`)
    REFERENCES `StockdB`.`roles` (`role`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `StockdB`.`tickerList`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `StockdB`.`tickerList` (
  `ticker_symbol` VARCHAR(10) NOT NULL,
  `display_to_nonuser` TINYINT NULL DEFAULT 0,
  `ticker_desc` VARCHAR(60) NULL,
  PRIMARY KEY (`ticker_symbol`),
  UNIQUE INDEX `ticker_symbol_UNIQUE` (`ticker_symbol` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `StockdB`.`newsFeed`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `StockdB`.`newsFeed` (
  `article_url` INT NOT NULL,
  PRIMARY KEY (`article_url`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `StockdB`.`blog`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `StockdB`.`blog` (
  `blog_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `blog_post` BLOB NULL,
  PRIMARY KEY (`blog_id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `StockdB`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `StockdB`.`favorites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `StockdB`.`favorites` (
  `user_id` INT NOT NULL,
  `ticker_symbol` VARCHAR(10) NOT NULL,
  `ticker_desc` VARCHAR(45) NULL,
  PRIMARY KEY (`user_id`, `ticker_symbol`),
  UNIQUE INDEX `ticker_desc_UNIQUE` (`ticker_desc` ASC) VISIBLE,
  CONSTRAINT `fk_ticker_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `StockdB`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE USER 'user1';


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
