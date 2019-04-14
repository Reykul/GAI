
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE database 'drivers';
use drivers;

CREATE TABLE IF NOT EXISTS `driver` (
  `driver_id` int(11) NOT NULL AUTO_INCREMENT,
  `driver_name` varchar(200) DEFAULT NULL,
  `driver_license` tinyint DEFAULT NULL,
  `deprived_of_license` tinyint DEFAULT NULL,
  PRIMARY KEY (`driver_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

INSERT INTO `driver` (`driver_id`, `driver_name`, `driver_license`, `deprived_of_license`) VALUES
(1, 'Bob', 1, 1),
(2, 'John', 0, 0),
(3, 'Mike', 1, 1),
(4, 'Dean', 1, 1),
(5, 'Mark', 1, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
