-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: project-lego
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `avatars`
--

LOCK TABLES `avatars` WRITE;
/*!40000 ALTER TABLE `avatars` DISABLE KEYS */;
/*!40000 ALTER TABLE `avatars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Diversos','Brinquedos Divertidos','diversos',1,'2025-12-03 13:41:15','2025-12-03 13:41:15');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (2,'LEGO Star Wars – Millennium Falcon','Icônica nave espacial com detalhes internos e figuras clássicas.',1599.90,1,'lego-star-wars-millennium-falcon',1353,9,4.8,5,0,1,'https://http2.mlstatic.com/D_NQ_NP_2X_661827-MLA100010314313_122025-F.webp','2025-12-03 13:41:22','2025-12-03 13:41:22'),(3,'LEGO Technic – Moto Esportiva','Modelo avançado de moto esportiva com suspensão funcional.',349.90,1,'lego-technic-moto-esportiva',467,10,4.7,18,0,1,'https://m.media-amazon.com/images/I/812ayBeUg0L._AC_SL1500_.jpg','2025-12-03 13:43:06','2025-12-03 13:43:06'),(4,'LEGO City – Caminhão dos Bombeiros','Caminhão clássico com escada extensível e acessórios de resgate.',199.90,1,'lego-city-caminhao-dos-bombeiros',290,5,4.6,25,0,1,'https://m.magazineluiza.com.br/a-static/420x420/lego-city-caminhao-dos-bombeiros-4x4-com-barco-de-resgate-60412-301-pecas/magazineluiza/238049000/2346e6e5ce06a72ce4ad47c8ef0d8e14.jpg','2025-12-03 13:43:37','2025-12-03 13:43:37'),(5,'LEGO Marvel – Armadura Hulkbuster','Armadura icônica do Homem de Ferro com articulações detalhadas.',429.90,1,'lego-marvel-armadura-hulkbuster',456,8,4.9,9,0,1,'https://images.tcdn.com.br/img/img_prod/765989/lego_marvel_o_caca_hulk_a_batalha_de_wakanda_76247_6000899_1_e81873d58faa4c640a5667d9a66f3723.jpg','2025-12-03 13:44:43','2025-12-03 13:44:43'),(6,'LEGO Creator – Casa Moderna 3 em 1','Casa modular com 3 variações de construção e detalhes realistas.',269.90,1,'lego-creator-casa-moderna-3-em-1',389,7,4.8,14,0,1,'https://m.media-amazon.com/images/I/81qrjmyla1L._AC_SL1500_.jpg','2025-12-03 13:45:24','2025-12-03 13:45:24');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sale_items`
--

LOCK TABLES `sale_items` WRITE;
/*!40000 ALTER TABLE `sale_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `sale_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `stocks`
--

LOCK TABLES `stocks` WRITE;
/*!40000 ALTER TABLE `stocks` DISABLE KEYS */;
/*!40000 ALTER TABLE `stocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Bryan Prinz','bryanprinz2008@gmail.com','$2b$10$a7XKnr/2utmEuk6cRSlLoOO/NEqtnbYJ.wkInZWOXx0WxhehzMy2y',48991375142,14325524908,'OWNER',1,0,NULL,'2025-12-03 13:36:14','2025-12-03 13:36:14');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-03 11:47:09
