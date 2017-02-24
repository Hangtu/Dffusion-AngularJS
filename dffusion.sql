-- phpMyAdmin SQL Dump
-- version 2.8.0.1
-- http://www.phpmyadmin.net
-- 
-- Servidor: custsql-ipg34.eigbox.net
-- Tiempo de generación: 25-12-2015 a las 12:57:09
-- Versión del servidor: 5.5.43
-- Versión de PHP: 4.4.9
-- 
-- Base de datos: `new_difusion`
-- 

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `categoria`
-- 

CREATE TABLE `categoria` (
  `idcategoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombreCategoria` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idcategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

-- 
-- Volcar la base de datos para la tabla `categoria`
-- 

INSERT INTO `categoria` VALUES (1, 'Antros');
INSERT INTO `categoria` VALUES (2, 'Bares');
INSERT INTO `categoria` VALUES (3, 'Restaurantes');
INSERT INTO `categoria` VALUES (4, 'Otros');

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `comentarioM`
-- 

CREATE TABLE `comentarioM` (
  `idcomentarioM` int(11) NOT NULL AUTO_INCREMENT,
  `comentario` varchar(500) DEFAULT NULL,
  `fechaC` datetime DEFAULT NULL,
  `fk_user` int(11) NOT NULL,
  `fk_momento` int(11) NOT NULL,
  PRIMARY KEY (`idcomentarioM`),
  KEY `fk_comentarioM_usuario1_idx` (`fk_user`),
  KEY `fk_comentarioM_momento1_idx` (`fk_momento`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8 AUTO_INCREMENT=36 ;

-- 
-- Volcar la base de datos para la tabla `comentarioM`
-- 

INSERT INTO `comentarioM` VALUES (29, 'Qué rico!!! ', '2015-11-28 14:36:57', 21, 184);
INSERT INTO `comentarioM` VALUES (30, 'Muy bien', '2015-11-28 19:15:48', 23, 185);
INSERT INTO `comentarioM` VALUES (31, 'buenisimo', '2015-11-28 19:32:42', 24, 185);
INSERT INTO `comentarioM` VALUES (32, 'hasta cuando son validas las promociones ?', '2015-12-02 12:34:28', 10, 187);
INSERT INTO `comentarioM` VALUES (33, 'Que ricooo!!!', '2015-12-10 22:23:43', 21, 190);
INSERT INTO `comentarioM` VALUES (35, 'Testing', '2015-12-24 17:03:23', 5, 206);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `empresa`
-- 

CREATE TABLE `empresa` (
  `idempresa` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `domicilio` varchar(200) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `horarios` varchar(300) DEFAULT NULL,
  `disponible` varchar(20) DEFAULT NULL,
  `mapa` varchar(100) DEFAULT NULL,
  `carpeta` varchar(150) DEFAULT NULL,
  `star` int(11) NOT NULL,
  `fk_user` int(11) NOT NULL,
  `fk_zona` int(11) NOT NULL,
  `fk_categoria` int(11) NOT NULL,
  PRIMARY KEY (`idempresa`),
  KEY `fk_empresa_usuario1_idx` (`fk_user`),
  KEY `fk_empresa_zona1_idx` (`fk_zona`),
  KEY `fk_empresa_categoria1_idx` (`fk_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8 AUTO_INCREMENT=81 ;

-- 
-- Volcar la base de datos para la tabla `empresa`
-- 

INSERT INTO `empresa` VALUES (65, 'Dffusion', 'Andador islitas #37 Colonia Fovissste', '3111070971', 'Difusion app es una aplicación que ayudará a las  empresas a promocionarse de una manera totalmente diferente, como también queremos que nuestros usuarios puedan beneficiarse de esta tecnología.', '9:0-18:0-Lunes-Martes-Miercoles-Jueves-Viernes-Sabado-', 'Disponible', '-', 'Difusion', 5, 5, 1, 4);
INSERT INTO `empresa` VALUES (70, 'Platinum Gym', 'Calzada del ejército #343 Col. Tecolote', '3111335524', '', '5:0-23:0-Lunes-Martes-Miercoles-Jueves-Viernes-Sabado-Domingo', 'Disponible', '-', 'Platinum Gym', 5, 7, 1, 4);
INSERT INTO `empresa` VALUES (71, 'La Paperia Snack & Drink', 'avenida de la cultura 94', '3114569722', 'Restaurante Bar', '10:0-0:0-Lunes-Martes-Miercoles-Jueves-Viernes-Sabado-Domingo', 'Disponible', '-', 'La Paperia Snack & Drink', 3, 11, 1, 3);
INSERT INTO `empresa` VALUES (72, 'drunken coffee & beer station', 'Av. de la cultura, plaza manglar planta alta', '3112104505', '', '8:0-12:0-Lunes-Martes-Miercoles-Jueves-Viernes-Sabado-Domingo', 'Disponible', '-', 'drunken coffee & beer station', 3, 12, 1, 2);
INSERT INTO `empresa` VALUES (73, 'JUVENTUS PLAZA MANGLAR', 'Av. de la Cultura, Plaza Manglar (segunda planta)', '', 'Desayunos,comidas, antojitos, lonchería y fuente de sodas', '8:0-18:0-Lunes-Martes-Miercoles-Jueves-Viernes-Sabado-', 'Disponible', '-', 'JUVENTUS', 3, 15, 1, 3);
INSERT INTO `empresa` VALUES (77, 'Niticolor', 'Av de la cultura 94 int 28', '3111694994', 'Recarga de cartuchos para impresora.', '9:0-19:0-Lunes-Martes-Miercoles-Jueves-Viernes--', 'Disponible', '-', 'Niticolor', 3, 18, 1, 4);
INSERT INTO `empresa` VALUES (78, 'Napa Cream Café', 'Av. De Cultura No. 27 Entre Portugal y Atenas', '3111229897', 'Nieve de comal, baguettes, chapatas, café y sabor.', '7:30-21:30-Lunes-Martes-Miercoles-Jueves-Viernes-Sabado-Domingo', 'Disponible', '-', 'Napa Cream Café', 3, 25, 1, 3);
INSERT INTO `empresa` VALUES (80, 'Tesla Apps', '', '3111070971', 'Tesla app''s es un empresa que dedicada al desarrollo  de aplicaciones web como para dispositivos móviles (android &  ios).', '0:0-12:0-Lunes-Martes-Miercoles-Jueves-Viernes-Sabado-Domingo', 'Disponible', '-', 'Tesla Apps', 3, 34, 1, 4);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `likesM`
-- 

CREATE TABLE `likesM` (
  `idlikesM` int(11) NOT NULL AUTO_INCREMENT,
  `fk_idmomento` int(11) NOT NULL,
  `fk_iduser` int(11) NOT NULL,
  PRIMARY KEY (`idlikesM`),
  KEY `fk_likesM_momento1_idx` (`fk_idmomento`),
  KEY `fk_likesM_usuario1_idx` (`fk_iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=362 DEFAULT CHARSET=utf8 AUTO_INCREMENT=362 ;

-- 
-- Volcar la base de datos para la tabla `likesM`
-- 

INSERT INTO `likesM` VALUES (143, 156, 5);
INSERT INTO `likesM` VALUES (144, 156, 7);
INSERT INTO `likesM` VALUES (145, 155, 7);
INSERT INTO `likesM` VALUES (146, 122, 7);
INSERT INTO `likesM` VALUES (147, 156, 8);
INSERT INTO `likesM` VALUES (149, 155, 8);
INSERT INTO `likesM` VALUES (152, 122, 10);
INSERT INTO `likesM` VALUES (154, 155, 10);
INSERT INTO `likesM` VALUES (163, 155, 15);
INSERT INTO `likesM` VALUES (166, 183, 21);
INSERT INTO `likesM` VALUES (168, 184, 22);
INSERT INTO `likesM` VALUES (169, 183, 22);
INSERT INTO `likesM` VALUES (174, 184, 20);
INSERT INTO `likesM` VALUES (176, 185, 20);
INSERT INTO `likesM` VALUES (183, 184, 23);
INSERT INTO `likesM` VALUES (197, 183, 24);
INSERT INTO `likesM` VALUES (244, 184, 5);
INSERT INTO `likesM` VALUES (251, 155, 22);
INSERT INTO `likesM` VALUES (267, 158, 5);
INSERT INTO `likesM` VALUES (272, 185, 22);
INSERT INTO `likesM` VALUES (277, 122, 5);
INSERT INTO `likesM` VALUES (285, 155, 23);
INSERT INTO `likesM` VALUES (286, 122, 23);
INSERT INTO `likesM` VALUES (290, 185, 5);
INSERT INTO `likesM` VALUES (291, 185, 23);
INSERT INTO `likesM` VALUES (293, 155, 5);
INSERT INTO `likesM` VALUES (295, 186, 22);
INSERT INTO `likesM` VALUES (307, 185, 21);
INSERT INTO `likesM` VALUES (308, 184, 21);
INSERT INTO `likesM` VALUES (309, 186, 21);
INSERT INTO `likesM` VALUES (312, 186, 5);
INSERT INTO `likesM` VALUES (313, 187, 5);
INSERT INTO `likesM` VALUES (315, 187, 21);
INSERT INTO `likesM` VALUES (316, 187, 22);
INSERT INTO `likesM` VALUES (318, 187, 10);
INSERT INTO `likesM` VALUES (320, 186, 23);
INSERT INTO `likesM` VALUES (321, 187, 23);
INSERT INTO `likesM` VALUES (322, 188, 5);
INSERT INTO `likesM` VALUES (324, 188, 21);
INSERT INTO `likesM` VALUES (325, 188, 23);
INSERT INTO `likesM` VALUES (326, 190, 25);
INSERT INTO `likesM` VALUES (327, 189, 25);
INSERT INTO `likesM` VALUES (328, 190, 22);
INSERT INTO `likesM` VALUES (329, 189, 22);
INSERT INTO `likesM` VALUES (330, 188, 22);
INSERT INTO `likesM` VALUES (331, 190, 21);
INSERT INTO `likesM` VALUES (333, 189, 21);
INSERT INTO `likesM` VALUES (334, 191, 22);
INSERT INTO `likesM` VALUES (338, 191, 21);
INSERT INTO `likesM` VALUES (339, 191, 5);
INSERT INTO `likesM` VALUES (340, 190, 5);
INSERT INTO `likesM` VALUES (341, 189, 5);
INSERT INTO `likesM` VALUES (346, 192, 22);
INSERT INTO `likesM` VALUES (347, 193, 23);
INSERT INTO `likesM` VALUES (348, 183, 29);
INSERT INTO `likesM` VALUES (349, 155, 29);
INSERT INTO `likesM` VALUES (350, 122, 29);
INSERT INTO `likesM` VALUES (351, 193, 29);
INSERT INTO `likesM` VALUES (352, 193, 21);
INSERT INTO `likesM` VALUES (353, 188, 32);
INSERT INTO `likesM` VALUES (354, 194, 22);
INSERT INTO `likesM` VALUES (355, 193, 22);
INSERT INTO `likesM` VALUES (356, 194, 5);
INSERT INTO `likesM` VALUES (360, 206, 5);
INSERT INTO `likesM` VALUES (361, 206, 22);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `momento`
-- 

CREATE TABLE `momento` (
  `idmomento` int(11) NOT NULL AUTO_INCREMENT,
  `descripcionM` varchar(500) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `imagenM` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `fechaPublicacion` datetime DEFAULT NULL,
  `likeCount` int(11) NOT NULL,
  `fk_empresa` int(11) NOT NULL,
  PRIMARY KEY (`idmomento`),
  KEY `fk_momento_empresa_idx` (`fk_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=207 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci AUTO_INCREMENT=207 ;

-- 
-- Volcar la base de datos para la tabla `momento`
-- 

INSERT INTO `momento` VALUES (122, 'Esto es Difusion', 'FD53bvh3Sd.png', '2015-10-26 22:34:54', 5, 65);
INSERT INTO `momento` VALUES (155, 'Hoy arrancamos', 'iwN1Ju0hNe.png', '2015-11-11 17:00:46', 8, 65);
INSERT INTO `momento` VALUES (156, 'He aquí el primer registro..', 'EpVlPwOK9G.png', '2015-11-11 18:59:25', 3, 70);
INSERT INTO `momento` VALUES (158, 'Comida del diA X $65 SopAs guisado postre agua fresca', NULL, '2015-11-24 13:42:57', 1, 73);
INSERT INTO `momento` VALUES (183, 'Buenos días! Te esperamos en Juventus Plaza Manglar desde las 8am para que pruebes de nuestros exquisitos platillos que tenemos para ti☕️', NULL, '2015-11-28 08:46:12', 4, 73);
INSERT INTO `momento` VALUES (184, 'Te presentamos el Especial Juventus, está riquísimo', '1wiS7GdEI7.png', '2015-11-28 08:51:44', 5, 73);
INSERT INTO `momento` VALUES (185, 'Ya está haciendo hambre', 'CCGz1SBh1s.png', '2015-11-28 13:20:23', 17, 73);
INSERT INTO `momento` VALUES (186, 'Buenos días!! Excelente inicio de semana les desea Napa Cream!!!', 'UmvMAlVJzE.png', '2015-11-30 10:39:05', 15, 78);
INSERT INTO `momento` VALUES (187, 'Conoce nuestras promociones decembrinas y vive una feliz navidad con una nueva figura.', 'VAUh2yEuUg.png', '2015-12-01 18:35:45', 8, 70);
INSERT INTO `momento` VALUES (188, 'Preparación de una ciabata ó chapata, aquí en tú casa Napa Cream!!!', 'aPAdd38xmY.png', '2015-12-04 14:24:54', 5, 78);
INSERT INTO `momento` VALUES (189, 'Te esperamos mañana a partir de las 8am para que disfrutes de unos deliciosos y esponjositos hot cakes acompañados de un rico chocomilk.', '8fFDyOMVDs.png', '2015-12-08 21:18:39', 21, 73);
INSERT INTO `momento` VALUES (190, 'Buenos días Tepic!! Great day!! Para todos!! Y todas!!', '7kafhQgu9U.png', '2015-12-09 09:16:33', 15, 78);
INSERT INTO `momento` VALUES (191, 'Ya huele a viernes ', 'f2Jkc8KXPf.png', '2015-12-10 21:11:28', 9, 73);
INSERT INTO `momento` VALUES (192, 'Empieza el Sábado con un delicioso omelette du fromage y un rico café 100% Nayarita para disfrutar este día lluvioso. Te esperamos en Juventus Plaza Manglar', 'Qouow1iuQG.png', '2015-12-12 08:53:43', 5, 73);
INSERT INTO `momento` VALUES (193, 'Para este clima!! Napa Cream Café', 'fukntoKkQY.png', '2015-12-12 12:07:08', 10, 78);
INSERT INTO `momento` VALUES (194, '¡Buenos diiiiiiiiiaaaaaaaaas! ¡Ya estamos en el ombligo de la semana! Y puedes empezar el día con un riquísimo desayuno de Hígado encebollado acompañado de una taza con café 100% Nayarita.¿En dónde? En Juventus Plaza Manglar... ¡Te esperamos!8am-6pm', 'gMkaFyHwZy.png', '2015-12-16 07:36:48', 21, 73);
INSERT INTO `momento` VALUES (206, 'El equipo Dffusion esta trabajando para darte un mejor servicio y brindarte la mejor experiencia posible, en los siguientes dias algunas funcionalidades de la app no estaran disponibles ya que estaran en mantenimiento,  por su compresion gracias, les deseamos una feliz navidad y prospero año nuevo.', NULL, '2015-12-24 02:21:09', 2, 65);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `premium`
-- 

CREATE TABLE `premium` (
  `idpremium` int(11) NOT NULL AUTO_INCREMENT,
  `fk_idempresa` int(11) NOT NULL,
  PRIMARY KEY (`idpremium`),
  KEY `fk_premium_empresa1_idx` (`fk_idempresa`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

-- 
-- Volcar la base de datos para la tabla `premium`
-- 

INSERT INTO `premium` VALUES (2, 65);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `usuario`
-- 

CREATE TABLE `usuario` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL COMMENT '				',
  `apellido` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 AUTO_INCREMENT=35 ;

-- 
-- Volcar la base de datos para la tabla `usuario`
-- 

INSERT INTO `usuario` VALUES (5, 'Hang Tu', 'Wong Ley', 'hangtuwlf@gmail.com', '1234');
INSERT INTO `usuario` VALUES (6, 'Prueba', 'Prueba', 'prueba1@gmail.com', '1234');
INSERT INTO `usuario` VALUES (7, 'Roman', 'Alegría', 'platinumgym@gmail.com', 'gimnasiotepic');
INSERT INTO `usuario` VALUES (8, 'Barbara', 'Guzman', 'barbara.gr@outlook.com', 'galleta1311');
INSERT INTO `usuario` VALUES (9, 'Juan', 'Wong Ley', 'jmanuelwld@hotmail.com', 'Juan19');
INSERT INTO `usuario` VALUES (10, 'estefania', 'corrales', 'mariam_048@hotmail.com', 'molina');
INSERT INTO `usuario` VALUES (11, 'Leonardo', 'Alvarez', 'paperiatepic@gmail.com', 'michepapas49');
INSERT INTO `usuario` VALUES (12, 'José Angel', 'Carrillo Torres', 'cafedenayarit@hotmail.com', 'ECNSA1997');
INSERT INTO `usuario` VALUES (14, 'veronica', 'alonso garcia', 'veronic.alonso@hotmail.com', 'meritxel');
INSERT INTO `usuario` VALUES (15, 'veronica', 'alonso garcia', 'rogeirora@hotmail.com', 'PROFECO');
INSERT INTO `usuario` VALUES (16, 'Jaja', 'Hola', 'jaja@hotmail.com', '1234');
INSERT INTO `usuario` VALUES (17, 'yereli', 'camacho', '11558@dominos.com.mx', '28672669');
INSERT INTO `usuario` VALUES (18, 'Niticolor', 'Recarga de cartuchos', 'contacto@niticolor.com', '12345');
INSERT INTO `usuario` VALUES (19, 'Prueba2', 'Tete', 'domino@domino.com', '123456789');
INSERT INTO `usuario` VALUES (20, 'Nora', 'Cortés', 'psicnoracm.13@hotmail.com', '39672669');
INSERT INTO `usuario` VALUES (21, 'Jessica', 'Ortega', 'jessica93ortega@gmail.com', '11400303');
INSERT INTO `usuario` VALUES (22, 'Cesar', 'Navarrete', 'cesar_5513@hotmail.com', 'TENGOSED');
INSERT INTO `usuario` VALUES (23, 'Juan', 'Wong', 'jmanuelwlf@hotmail.com', 'Juan19');
INSERT INTO `usuario` VALUES (24, 'ruby', 'Rico', 'rubi_rc09@outlook.com', 'libertad');
INSERT INTO `usuario` VALUES (25, 'Rodolfo', 'García', 'garciarodolfoorto@gmail.com', 'ortodoncia2');
INSERT INTO `usuario` VALUES (26, 'Hola', 'Jaja', 'hiho@hiho.com', '12');
INSERT INTO `usuario` VALUES (27, 'Mayrim', 'Lopez', 'lopezmercado.mayrim.prog@gmail.com', 'floricienta');
INSERT INTO `usuario` VALUES (28, 'Mayrim', 'Lopez', 'lopezmercado.mayrim.prog@gmail.com', 'floricienta');
INSERT INTO `usuario` VALUES (29, 'Fabiola Janeth', 'Ortega Torres', 'bifa-7@hotmail.com', 'tucara');
INSERT INTO `usuario` VALUES (30, 'Namey', 'Aplid', 'name@name.com', 'name1234');
INSERT INTO `usuario` VALUES (31, 'ivan', 'Martínez', 'ivanmartinez081297@gmail.com', 'Calletokionum66');
INSERT INTO `usuario` VALUES (32, 'Liz', 'Renteria', 'lilo_2366@hotmail.com', '789523Liss');
INSERT INTO `usuario` VALUES (33, 'carey', 'conchas', 'carey.alejandra@gmail.com', 'conchas25');
INSERT INTO `usuario` VALUES (34, 'Hang Tu', 'Wong Ley', 'hangtuwlf@hotmail.com', '1234');

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `zona`
-- 

CREATE TABLE `zona` (
  `idzona` int(11) NOT NULL AUTO_INCREMENT,
  `nombreZona` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idzona`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

-- 
-- Volcar la base de datos para la tabla `zona`
-- 

INSERT INTO `zona` VALUES (1, 'Tepic');
INSERT INTO `zona` VALUES (2, 'Xalisco');

-- 
-- Filtros para las tablas descargadas (dump)
-- 

-- 
-- Filtros para la tabla `comentarioM`
-- 
ALTER TABLE `comentarioM`
  ADD CONSTRAINT `fk_comentarioM_momento1` FOREIGN KEY (`fk_momento`) REFERENCES `momento` (`idmomento`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_comentarioM_usuario1` FOREIGN KEY (`fk_user`) REFERENCES `usuario` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- 
-- Filtros para la tabla `empresa`
-- 
ALTER TABLE `empresa`
  ADD CONSTRAINT `fk_empresa_categoria1` FOREIGN KEY (`fk_categoria`) REFERENCES `categoria` (`idcategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_empresa_usuario1` FOREIGN KEY (`fk_user`) REFERENCES `usuario` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_empresa_zona1` FOREIGN KEY (`fk_zona`) REFERENCES `zona` (`idzona`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- 
-- Filtros para la tabla `likesM`
-- 
ALTER TABLE `likesM`
  ADD CONSTRAINT `fk_likesM_momento1` FOREIGN KEY (`fk_idmomento`) REFERENCES `momento` (`idmomento`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_likesM_usuario1` FOREIGN KEY (`fk_iduser`) REFERENCES `usuario` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- 
-- Filtros para la tabla `momento`
-- 
ALTER TABLE `momento`
  ADD CONSTRAINT `fk_momento_empresa` FOREIGN KEY (`fk_empresa`) REFERENCES `empresa` (`idempresa`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- 
-- Filtros para la tabla `premium`
-- 
ALTER TABLE `premium`
  ADD CONSTRAINT `fk_premium_empresa1` FOREIGN KEY (`fk_idempresa`) REFERENCES `empresa` (`idempresa`) ON DELETE NO ACTION ON UPDATE NO ACTION;
