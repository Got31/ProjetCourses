-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : Dim 24 avr. 2022 à 14:55
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `menu`
--

-- --------------------------------------------------------

--
-- Structure de la table `composer`
--

DROP TABLE IF EXISTS `composer`;
CREATE TABLE IF NOT EXISTS `composer` (
  `id_recette` varchar(50) COLLATE utf8_bin NOT NULL,
  `id_ingredient` varchar(50) COLLATE utf8_bin NOT NULL,
  `Quantite` decimal(15,2) DEFAULT NULL,
  PRIMARY KEY (`id_recette`,`id_ingredient`),
  KEY `id_ingredient` (`id_ingredient`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `composer`
--

INSERT INTO `composer` (`id_recette`, `id_ingredient`, `Quantite`) VALUES
('1', '3', '200.00'),
('1', '1', '400.00'),
('2', '1', '600.00'),
('2', '3', '100.00'),
('2', '4', '242.00'),
('2', '6', '420.00'),
('3', '2', '230.00'),
('3', '4', '1020.00'),
('3', '5', '300.00'),
('3', '6', '2000.00'),
('3', '7', '50.00'),
('5', '3', '1333.00'),
('5', '4', '460.00'),
('1', '7', '40.00');

-- --------------------------------------------------------

--
-- Structure de la table `contenir`
--

DROP TABLE IF EXISTS `contenir`;
CREATE TABLE IF NOT EXISTS `contenir` (
  `id_repas` int(50) NOT NULL,
  `id_recette` int(50) NOT NULL,
  PRIMARY KEY (`id_recette`,`id_repas`),
  KEY `id_repas` (`id_repas`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `contenir`
--

INSERT INTO `contenir` (`id_repas`, `id_recette`) VALUES
(1, 1),
(47, 1),
(1, 2),
(4, 2),
(7, 2),
(9, 2),
(10, 3),
(48, 3),
(49, 3),
(4, 4),
(7, 4),
(9, 4),
(4, 5),
(7, 5),
(47, 5);

-- --------------------------------------------------------

--
-- Structure de la table `ingredient`
--

DROP TABLE IF EXISTS `ingredient`;
CREATE TABLE IF NOT EXISTS `ingredient` (
  `id_ingredient` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `Prix` float DEFAULT NULL,
  PRIMARY KEY (`id_ingredient`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `ingredient`
--

INSERT INTO `ingredient` (`id_ingredient`, `Nom`, `Prix`) VALUES
(1, 'tomate', 1.2),
(4, 'Salada', 1.2),
(3, 'Oignon', 1.35),
(6, 'Haricots rouge', 2.42),
(7, 'Huile d\'olive', 5.14),
(16, 'Carottes', 11.39);

-- --------------------------------------------------------

--
-- Structure de la table `recette`
--

DROP TABLE IF EXISTS `recette`;
CREATE TABLE IF NOT EXISTS `recette` (
  `id_recette` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `Deroule` text COLLATE utf8_bin,
  PRIMARY KEY (`id_recette`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `recette`
--

INSERT INTO `recette` (`id_recette`, `Nom`, `Deroule`) VALUES
(1, 'Raclette', 'Pour faire une raclette il faut :\r\nfromage,\r\nPatate,\r\nPuis si tout'),
(2, 'Ramen', 'Du lorem ipsum enrgfioern,g'),
(3, 'Couscous', NULL),
(4, 'Tacos', NULL),
(5, 'Pates', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `repas`
--

DROP TABLE IF EXISTS `repas`;
CREATE TABLE IF NOT EXISTS `repas` (
  `id_repas` int(11) NOT NULL AUTO_INCREMENT,
  `Invites` int(11) DEFAULT NULL,
  `Date_repas` date DEFAULT NULL,
  PRIMARY KEY (`id_repas`)
) ENGINE=MyISAM AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `repas`
--

INSERT INTO `repas` (`id_repas`, `Invites`, `Date_repas`) VALUES
(1, 3, '2022-04-13'),
(49, 2, '2022-04-23'),
(9, 3, '2022-04-29'),
(7, 7, '2022-02-02'),
(21, 14, '2022-04-16'),
(10, 6, '2022-04-21'),
(30, 3, '2022-04-22'),
(47, 2, '2022-04-01'),
(48, 5, '2022-04-30'),
(43, 3, '2022-04-01');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
