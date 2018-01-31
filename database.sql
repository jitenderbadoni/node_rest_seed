SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE DATABASE `planDB` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `planDB`;


CREATE TABLE IF NOT EXISTS `todos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(400) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;