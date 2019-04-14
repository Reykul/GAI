
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE database offences;
use offences;

CREATE TABLE IF NOT EXISTS `offence` (
  `offence_id` int(11) NOT NULL AUTO_INCREMENT,
  `driver_id` int(11) DEFAULT NULL,
  `offence_description` varchar(200) DEFAULT NULL,
  `offence_cost` int DEFAULT NULL,
  `deprived_of_license` tinyint DEFAULT NULL,
  PRIMARY KEY (`offence_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


