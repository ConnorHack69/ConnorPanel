BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS `personacorreo` (
	`idPersCorr`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`idPers`	INTEGER,
	`idCorr`	INTEGER,
	FOREIGN KEY(`idPers`) REFERENCES `persona`(`idPers`),
	FOREIGN KEY(`idCorr`) REFERENCES `correo`(`idCorreo`)
);
CREATE TABLE IF NOT EXISTS `persona` (
	`idPers`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`nombre`	TEXT NOT NULL,
	`ap1`	TEXT,
	`ape2`	TEXT,
	`dni`	TEXT,
	`fechaNacimiento`	NUMERIC,
	`twitter`	TEXT,
	`facebook`	TEXT,
	`linkedin`	TEXT
);
CREATE TABLE IF NOT EXISTS `entidadpersona` (
	`idEntiPers`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`idEnti`	INTEGER,
	`idPers`	INTEGER,
	FOREIGN KEY(`idEnti`) REFERENCES `entidad`(`idEnt`),
	FOREIGN KEY(`idPers`) REFERENCES `persona`(`idPers`)
);
CREATE TABLE IF NOT EXISTS `entidadcorreo` (
	`idEntiCorr`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`idEnti`	INTEGER,
	`idCorr`	INTEGER,
	FOREIGN KEY(`idCorr`) REFERENCES `correo`(`idCorreo`),
	FOREIGN KEY(`idEnti`) REFERENCES `entidad`(`idEnt`)
);
CREATE TABLE IF NOT EXISTS `entidad` (
	`idEnt`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`fechaCreacion`	NUMERIC NOT NULL,
	`nombre`	TEXT NOT NULL,
	`descripcion`	TEXT
);
CREATE TABLE IF NOT EXISTS `dominio` (
	`idDominio`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`dominio`	TEXT NOT NULL,
	`ip`	TEXT,
	`location`	TEXT,
	`lon`	NUMERIC,
	`lat`	NUMERIC,
	`idDominioPadre`	INTEGER
);
INSERT INTO `dominio` VALUES (1,'geograma.com',NULL,NULL,NULL,NULL,NULL);
CREATE TABLE IF NOT EXISTS `correo` (
	`idCorreo`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`correo`	TEXT,
	`empresaCorreo`	TEXT,
	`servidorCorreoIP`	TEXT,
	`lon`	NUMERIC,
	`lat`	NUMERIC
);
COMMIT;
