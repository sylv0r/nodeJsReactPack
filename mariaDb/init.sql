-- Adminer 4.8.1 MySQL 11.2.2-MariaDB-1:11.2.2+maria~ubu2204 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `data`;
CREATE TABLE `data` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `value` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `data` (`id`, `user_id`, `value`) VALUES
(101,	30,	'aaa'),
(102,	30,	'bbb');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `admin` int(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `email`, `password`, `admin`) VALUES
(1,	'aaa@gmail.com',	'$2a$10$sEm1Ojru8sMsv1zDZn.IZeGqd5wkAXez9mqlpl.Dkn9QjBMfCTwJu',	0);

-- 2023-12-16 13:34:29