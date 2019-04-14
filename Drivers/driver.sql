
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE database drivers;
use drivers;

CREATE TABLE IF NOT EXISTS `driver` (
  `driver_id` int(11) NOT NULL AUTO_INCREMENT,
  `driver_name` varchar(200) DEFAULT NULL,
  `driver_license` tinyint DEFAULT NULL,
  `deprived_of_license` tinyint DEFAULT NULL,
  PRIMARY KEY (`driver_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


