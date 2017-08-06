-- ELIMINAR TABLAS

DROP TABLE ENCARGADO CASCADE CONSTRAINTS;
DROP TABLE ESTUDIANTE CASCADE CONSTRAINTS;
DROP TABLE PROFESOR CASCADE CONSTRAINTS;
DROP TABLE MATERIA CASCADE CONSTRAINTS;
DROP TABLE PROFESOR_MATERIA CASCADE CONSTRAINTS;
DROP TABLE CALIFICACION CASCADE CONSTRAINTS;
DROP TABLE AUSENCIA CASCADE CONSTRAINTS;
DROP TABLE CONVOCATORIA CASCADE CONSTRAINTS;

--CREAR TABLAS

CREATE TABLE ENCARGADO
(
	IDENTIFICACION VARCHAR2(20) 	PRIMARY KEY,
	NOMBRE_COMPLETO VARCHAR2(40)	NOT NULL,
	TELEFONO NUMBER(8) 				NOT NULL,
	PARENTESCO VARCHAR2(10)			NOT NULL,
	DIRECCION VARCHAR2(20)			NOT NULL,
	CORREO VARCHAR2(30),
	CONSTRAINT CK_ENCARGADO_NOMBRE CHECK (NOMBRE_COMPLETO NOT LIKE '%[^Aa-Zz]%'),
	CONSTRAINT CK_ENCARGADO_TELEFONO CHECK (TELEFONO > 0),
	CONSTRAINT CK_ENCARGADO_PARENTESCO CHECK (PARENTESCO NOT LIKE '%[^Aa-Zz]%'),
	CONSTRAINT CK_CORREO CHECK (REGEXP_LIKE (CORREO, '^(\S+)\@(\S+)\.(\S+)$'))
);

CREATE TABLE PROFESOR
(
	IDENTIFICACION VARCHAR2(20) 	PRIMARY KEY,
	NOMBRE VARCHAR2(15)				NOT NULL,
	APELLIDO1 VARCHAR2(15)			NOT NULL,
	APELLIDO2 VARCHAR2(15),
	TELEFONO NUMBER(8),
	CORREO VARCHAR2(30),
	CONSTRAINT CK_PROFESOR_NOMBRE CHECK (NOMBRE NOT LIKE '%[^Aa-Zz]%'),
    CONSTRAINT CK_PROFESOR_APELLIDO1 CHECK (APELLIDO1 NOT LIKE '%[^Aa-Zz]%'),
	CONSTRAINT CK_PROFESOR_APELLIDO2 CHECK (APELLIDO2 NOT LIKE '%[^Aa-Zz]%'),
	CONSTRAINT CK_PROFESOR_TELEFONO CHECK (TELEFONO > 0),
	CONSTRAINT CK_PROFESOR_CORREO CHECK (REGEXP_LIKE (CORREO, '^(\S+)\@(\S+)\.(\S+)$'))
);

CREATE TABLE ESTUDIANTE
(
    IDENTIFICACION VARCHAR2(20) 	PRIMARY KEY,
    NOMBRE VARCHAR2(20)             NOT NULL,
    APELLIDO1 VARCHAR2(15)          NOT NULL,
	APELLIDO2 VARCHAR2(15),
    SEXO CHAR(1)         			NOT NULL,
	FECHA_NACIMIENTO DATE			NOT NULL,
    CICLO VARCHAR2(7) 		        NOT NULL,
	NIVEL NUMBER(2)					NOT NULL,
	SECCION VARCHAR2(20)			NOT NULL,
	ENCARGADO VARCHAR2(20)			NOT NULL,
	CONSTRAINT FK_ESTUDIANTE FOREIGN KEY (ENCARGADO) REFERENCES ENCARGADO(IDENTIFICACION),
    CONSTRAINT CK_ESTUDIANTE_NOMBRE CHECK (NOMBRE NOT LIKE '%[^Aa-Zz]%'),
    CONSTRAINT CK_ESTUDIANTE_APELLIDO1 CHECK (APELLIDO1 NOT LIKE '%[^Aa-Zz]%'),
	CONSTRAINT CK_ESTUDIANTE_APELLIDO2 CHECK (APELLIDO2 NOT LIKE '%[^Aa-Zz]%'),
	CONSTRAINT CK_ESTUDIANTE_SEXO CHECK (SEXO IN ('M', 'F')),
	CONSTRAINT CK_ESTUDIANTE_CICLO CHECK (CICLO IN ('PRIMER', 'SEGUNDO','TERCER','CUARTO')),
	CONSTRAINT CK_ESTUDIANTE_NIVEL CHECK (NIVEL BETWEEN 1 AND 11)
);

CREATE TABLE MATERIA
(
	IDENTIFICACION VARCHAR2(8) 	PRIMARY KEY,
	NOMBRE VARCHAR2(30)			NOT NULL,
	NIVEL NUMBER(2)				NOT NULL
);

CREATE TABLE PROFESOR_MATERIA
(
	PROFESOR VARCHAR2(20),
    MATERIA VARCHAR2(8),
    GUIA  CHAR(1),
    CONSTRAINT PK_PROFESOR_MATERIA PRIMARY KEY (PROFESOR, MATERIA),
    CONSTRAINT FK_PROFESOR_MATERIA FOREIGN KEY (PROFESOR) REFERENCES PROFESOR(IDENTIFICACION),
    CONSTRAINT FK_MATERIA_PROFESOR FOREIGN KEY (MATERIA) REFERENCES MATERIA(IDENTIFICACION),
    CONSTRAINT CK_GUIA CHECK (GUIA IN ('S', 'N'))
);

CREATE TABLE CALIFICACION
(
	ESTUDIANTE VARCHAR2(20),
    MATERIA VARCHAR2(8),
	PERIODO1 NUMBER(3),
	PERIODO2 NUMBER(3),
	PERIODO3 NUMBER(3),
	RESULTADO_FINAL NUMBER(3),
	CONDICION VARCHAR2(10) NOT NULL,
	ANO NUMBER(4),
    CONSTRAINT PK_ESTUDIANTE_MATERIA PRIMARY KEY (ESTUDIANTE, MATERIA, ANO),
    CONSTRAINT FK_ESTUDIANTE_MATERIA FOREIGN KEY (ESTUDIANTE) REFERENCES ESTUDIANTE(IDENTIFICACION),
    CONSTRAINT FK_MATERIA_ESTUDIANTE FOREIGN KEY (MATERIA) REFERENCES MATERIA(IDENTIFICACION),
	CONSTRAINT CK_CALIFICACION_PERIODO1 CHECK (PERIODO1 BETWEEN 0 AND 100),
	CONSTRAINT CK_CALIFICACION_PERIODO2 CHECK (PERIODO2 BETWEEN 0 AND 100),
	CONSTRAINT CK_CALIFICACION_PERIODO3 CHECK (PERIODO3 BETWEEN 0 AND 100),
	CONSTRAINT CK_CALIFICACION_FINAL CHECK (RESULTADO_FINAL BETWEEN 0 AND 100),
	CONSTRAINT CK_CALIFICACION_CONDICION CHECK (CONDICION IN ('APROBADO', 'REPROBADO','EN PROCESO')),
	CONSTRAINT CK_CALIFICACION_ANO CHECK (ANO > 0)
);

CREATE TABLE AUSENCIA
(
	ESTUDIANTE VARCHAR2(20),
	PERIODO VARCHAR2(3),
	ANO NUMBER(4),
	TARDIAS NUMBER(3),
	MOTIVADAS NUMBER(3),
	INMOTIVADAS NUMBER(3),
	CONSTRAINT PK_AUSENCIA PRIMARY KEY (ESTUDIANTE, PERIODO, ANO),
	CONSTRAINT FK_AUSENCIA FOREIGN KEY (ESTUDIANTE) REFERENCES ESTUDIANTE(IDENTIFICACION),
	CONSTRAINT CK_AUSENCIA_PERIODO CHECK (PERIODO IN ('I', 'II','III')),
	CONSTRAINT CK_AUSENCIA_ANO CHECK (ANO > 0),
	CONSTRAINT CK_AUSENCIA_TARDIAS CHECK (TARDIAS > 0),
	CONSTRAINT CK_AUSENCIA_MOTIVADAS CHECK (MOTIVADAS > 0),
	CONSTRAINT CK_AUSENCIA_INMOTIVADAS CHECK (INMOTIVADAS > 0)
);

CREATE TABLE CONVOCATORIA
(
	ESTUDIANTE VARCHAR2(20),
	MATERIA VARCHAR2(20),
	NUMERO VARCHAR2(2),
	ANO NUMBER(4),
	NOTA NUMBER(3)				NOT NULL,
	CONDICION VARCHAR2(10)		NOT NULL,
	CONSTRAINT PK_CONVOCATORIA PRIMARY KEY (ESTUDIANTE, MATERIA, NUMERO, ANO),
	CONSTRAINT FK_CONVOCATORIA_ESTUDIANTE FOREIGN KEY (ESTUDIANTE) REFERENCES ESTUDIANTE(IDENTIFICACION),
	CONSTRAINT FK_CONVOCATORIA_MATERIA FOREIGN KEY (MATERIA) REFERENCES MATERIA(IDENTIFICACION),
	CONSTRAINT CK_CONVOCATORIA_NUMERO CHECK (NUMERO IN ('I', 'II')),
	CONSTRAINT CK_CONVOCATORIA_ANO CHECK (ANO > 0),
	CONSTRAINT CK_CONVOCATORIA_NOTA CHECK (NOTA BETWEEN 0 AND 100),
	CONSTRAINT CK_CONVOCATORIA_CONDICION CHECK (CONDICION IN ('APROBADO', 'REPROBADO'))
);

-- INGRESAR REGISTROS 

INSERT INTO ENCARGADO VALUES ('11111111','Temporal',88888888,'Temporal','Temporal','temp@temp.com');

-- PRIMERO UNO
INSERT INTO ESTUDIANTE VALUES ('120790159','CELESTE','ACUÑA','CADRANO','M','04/02/2010','SEGUNDO',1,'1-1','11111111');
INSERT INTO ESTUDIANTE VALUES ('120840897','JUNIOR ANDRES','AMADOR','HERNANDEZ','H','23/04/2010','SEGUNDO',1,'1-1','155819859916');
INSERT INTO ESTUDIANTE VALUES ('120760674','CELINA JIMENA','ARROYO','VARGAS','M','19/01/2010','SEGUNDO',1,'1-1','109430586');
INSERT INTO ESTUDIANTE VALUES ('120780341','KEHIRAN JOEL','CASARES','GUEVARA','H','06/02/2010','SEGUNDO',1,'1-1','112310461');
INSERT INTO ESTUDIANTE VALUES ('120830537','KRISTEN','FERNANDEZ','ARAYA','M','23/03/2010','SEGUNDO',1,'1-1','108790542');
INSERT INTO ESTUDIANTE VALUES ('120740971','DIANA VALERIA','FONCECA','CAMBRONERO','M','16/12/2009','SEGUNDO',1,'1-1','11111111');
INSERT INTO ESTUDIANTE VALUES ('120960201','SARAY','MORALES','PEREZ','M','15/09/2010','SEGUNDO',1,'1-1','155802483811');
INSERT INTO ESTUDIANTE VALUES ('120900230','GENESIS','OBANDO','CEDEÑO','M','17/10/2010','SEGUNDO',1,'1-1','111140467');
INSERT INTO ESTUDIANTE VALUES ('120760279','KENDALL ISAAC','PORRAS','RAYO','H','25/12/2009','SEGUNDO',1,'1-1','11111111');
INSERT INTO ESTUDIANTE VALUES ('120180271','JEREMY JOSAN','QUINTERO','KUANT','H','19/02/2008','SEGUNDO',1,'1-1','155810592500');
INSERT INTO ESTUDIANTE VALUES ('120980870','JOSMELL','SOTO','HERNANDEZ','H','25/10/2010','SEGUNDO',1,'1-1','115810723');
INSERT INTO ESTUDIANTE VALUES ('120510163','NAOMY','ALVAREZ','VALLE','M','28/03/2009','SEGUNDO',1,'1-1','114830327');

-- PRIMERO DOS
INSERT INTO ESTUDIANTE VALUES ('120780896','ASHLEY GABRIELA','ACEVEDO','PAISANO','M','16/02/2010','SEGUNDO',1,'1-2','113830097');
INSERT INTO ESTUDIANTE VALUES ('120790708','LUNA SUSANA','AGUILAR','ACOSTA','M','23/02/2010','SEGUNDO',1,'1-2','113030259');
INSERT INTO ESTUDIANTE VALUES ('120850122','GERALYN ALEJANDRA','AGUILAR','MORA','M','21/04/2010','SEGUNDO',1,'1-2','111460436');
INSERT INTO ESTUDIANTE VALUES ('120930761','MONSERRAT NAOMY','CHACON','ESQUIVEL','M','14/08/2010','SEGUNDO',1,'1-2','115240659');
INSERT INTO ESTUDIANTE VALUES ('120970192','DANIEL','CORRALES','SOLANO','H','03/10/2010','SEGUNDO',1,'1-2','113400170');
INSERT INTO ESTUDIANTE VALUES ('1208990629','JOEL SEBASTIAN','FLORES','ALVARES','H','29/06/2010','SEGUNDO',1,'1-2','155821697730');
INSERT INTO ESTUDIANTE VALUES ('120860549','MELANY YAIRELL','GARCIA','OROZCO','M','22/05/2010','SEGUNDO',1,'1-2','111111111');
INSERT INTO ESTUDIANTE VALUES ('120780614','NATALY FERNANDA','GARITA','CLASTON','M','10/02/2010','SEGUNDO',1,'1-2','112730157');
INSERT INTO ESTUDIANTE VALUES ('120890552','KEYLOR RANCES','HERRERA','DUARTE','H','17/06/2010','SEGUNDO',1,'1-2','111111111');
INSERT INTO ESTUDIANTE VALUES ('C01752140','JEFERSON','HURTADO','OBANDO','H','25/10/2010','SEGUNDO',1,'1-2','C01752161');
INSERT INTO ESTUDIANTE VALUES ('120780764','JOHAN ALEJANDRO','LACAYO','JIMENEZ','H','16/02/2010','SEGUNDO',1,'1-2','155807458421');
INSERT INTO ESTUDIANTE VALUES ('120740837','NORVIN REINALDO','LOAISIGA','GOMEZ','H','21/12/2009','SEGUNDO',1,'1-2','80740946');
INSERT INTO ESTUDIANTE VALUES ('121080007','MATTHEW JESUS','MANZANARES','PINEDA','H','14/02/2011','SEGUNDO',1,'1-2','111111111');
INSERT INTO ESTUDIANTE VALUES ('120920341','SHEILYN SOFIA','MARTINEZ','DURAN','M','26/07/2010','SEGUNDO',1,'1-2','109690303');
INSERT INTO ESTUDIANTE VALUES ('120950594','JIRLANY ALEXANDRA','MENDEZ','ELIZONDO','M','08/09/2010','SEGUNDO',1,'1-2','303720648');
INSERT INTO ESTUDIANTE VALUES ('120810087','NIXY NATASHA','OROZCO','NUÑEZ','M','17/03/2010','SEGUNDO',1,'1-2','114010533');
INSERT INTO ESTUDIANTE VALUES ('120930336','HEINER ALEXANDRE','QUESADA','TRIGUEROS','H','11/08/2010','SEGUNDO',1,'1-2','113750580');
INSERT INTO ESTUDIANTE VALUES ('120840644','AMSI','RODRIGUEZ','AGUILAR','M','20/04/2010','SEGUNDO',1,'1-2','114550447');
INSERT INTO ESTUDIANTE VALUES ('120750965','MARIANA','SEGURA','CASTRO','M','31/12/2009','SEGUNDO',1,'1-2','114450856');
INSERT INTO ESTUDIANTE VALUES ('120950363','JEFFERSON EDUARDO','SOLANO','PESSOA','H','14/09/2010','SEGUNDO',1,'1-2','113350495');
INSERT INTO ESTUDIANTE VALUES ('120760486','CHRISTOPER','URBINA','SOLANO','H','13/01/2010','SEGUNDO',1,'1-2','110930952');
INSERT INTO ESTUDIANTE VALUES ('120840442','JOATH CALEB','VENEGAS','LOPEZ','H','25/04/2010','SEGUNDO',1,'1-2','113980515');
INSERT INTO ESTUDIANTE VALUES ('121030323','JADEN DAVID','YANEZ','AGUILAR','H','15/12/2010','SEGUNDO',1,'1-2','13400183231');

-- SEGUNDO UNO
INSERT INTO ESTUDIANTE VALUES ('','','','','H','','SEGUNDO',2,'2-1','');

-- SEGUNDO DOS
INSERT INTO ESTUDIANTE VALUES ('','','','','H','','SEGUNDO',2,'2-2','');

-- TERCERO UNO
INSERT INTO ESTUDIANTE VALUES ('','','','','H','','SEGUNDO',2,'3-1','');

-- CUARTO UNO
INSERT INTO ESTUDIANTE VALUES ('','','','','H','','SEGUNDO',2,'4-1','');

-- QUINTO UNO
INSERT INTO ESTUDIANTE VALUES ('','','','','H','','SEGUNDO',2,'5-1','');

-- SEXTO UNO
INSERT INTO ESTUDIANTE VALUES ('','','','','H','','SEGUNDO',2,'6-1','');

-- PROFESOR
INSERT INTO PROFESOR VALUES ('114990315','Stacy','Marin','Garcia', null, '');
INSERT INTO PROFESOR VALUES ('110700031','Rebeca','Vega','Porras', null,'');
INSERT INTO PROFESOR VALUES ('109430199','Susana','Gutierrez','Ruiz', null,'');
INSERT INTO PROFESOR VALUES ('107910216','Kembly','Hernandez','Mena', null,'');
INSERT INTO PROFESOR VALUES ('114900323','Griselda','Martinez','Salazar', null,'');
INSERT INTO PROFESOR VALUES ('601910012','Alicia','Perez','Alvarez', null,'');
INSERT INTO PROFESOR VALUES ('304770424','Maria Jose','Fallas','Calvo', null,'');
INSERT INTO PROFESOR VALUES ('160400309009','Cesia','Leandro','Castro', null,'');
INSERT INTO PROFESOR VALUES ('105000053','Carlos','Zeledon','Calderon', null,'');
INSERT INTO PROFESOR VALUES ('112690814','Kimberly','Muñoz','Araya', null,'');
INSERT INTO PROFESOR VALUES ('106060720','Daniel','Arguijo','Miranda', null,'');
INSERT INTO PROFESOR VALUES ('603210963','Dalia','Ramirez','Leiton', null,'');
INSERT INTO PROFESOR VALUES ('109070577','Mainor','Vasquez','Sanchez', null,'');
INSERT INTO PROFESOR VALUES ('111300488','Roy','Campos','Castro', null,'');
INSERT INTO PROFESOR VALUES ('109380537','Sylvia','Bermudez','Calderon', null,'');
INSERT INTO PROFESOR VALUES ('800830390','Nelson','Germain','Rodriguez', null,'');
INSERT INTO PROFESOR VALUES ('110330869','Joel','Diaz','Corrales', null,'');
INSERT INTO PROFESOR VALUES ('115750097','Alejandra','Cartin','Saborio', null,'');
INSERT INTO PROFESOR VALUES ('800840708','Luis','Herbozo','Regrat', null,'');
INSERT INTO PROFESOR VALUES ('112150761','Lilliam','Camacho','Benavides', null,'');

INSERT INTO MATERIA VALUES ('ECI-01','Educacion Cientifica',1);
INSERT INTO MATERIA VALUES ('ECI-02','Educacion Cientifica',2);
INSERT INTO MATERIA VALUES ('ECI-03','Educacion Cientifica',3);
INSERT INTO MATERIA VALUES ('ECI-04','Educacion Cientifica',4);
INSERT INTO MATERIA VALUES ('ECI-05','Educacion Cientifica',5);
INSERT INTO MATERIA VALUES ('ECI-06','Educacion Cientifica',6);
INSERT INTO MATERIA VALUES ('CIE-07','Ciencias',7);
INSERT INTO MATERIA VALUES ('CIE-08','Ciencias',8);
INSERT INTO MATERIA VALUES ('CIE-09','Ciencias',9);
INSERT INTO MATERIA VALUES ('BIO-10','Biologia',10);
INSERT INTO MATERIA VALUES ('QUI-10','Quimica',10);
INSERT INTO MATERIA VALUES ('FIS-10','Fisica',10);
INSERT INTO MATERIA VALUES ('BIO-11','Biologia',11);
INSERT INTO MATERIA VALUES ('QUI-11','Quimica',11);
INSERT INTO MATERIA VALUES ('FIS-11','Fisica',11);

INSERT INTO MATERIA VALUES ('SOC-01','Estudios Sociales',1);
INSERT INTO MATERIA VALUES ('SOC-02','Estudios Sociales',2);
INSERT INTO MATERIA VALUES ('SOC-03','Estudios Sociales',3);
INSERT INTO MATERIA VALUES ('SOC-04','Estudios Sociales',4);
INSERT INTO MATERIA VALUES ('SOC-05','Estudios Sociales',5);
INSERT INTO MATERIA VALUES ('SOC-06','Estudios Sociales',6);
INSERT INTO MATERIA VALUES ('SOC-07','Estudios Sociales',7);
INSERT INTO MATERIA VALUES ('SOC-08','Estudios Sociales',8);
INSERT INTO MATERIA VALUES ('SOC-09','Estudios Sociales',9);
INSERT INTO MATERIA VALUES ('SOC-10','Estudios Sociales',10);
INSERT INTO MATERIA VALUES ('SOC-11','Estudios Sociales',11);

INSERT INTO MATERIA VALUES ('ESP-01','Espanol',1);
INSERT INTO MATERIA VALUES ('ESP-02','Espanol',2);
INSERT INTO MATERIA VALUES ('ESP-03','Espanol',3);
INSERT INTO MATERIA VALUES ('ESP-04','Espanol',4);
INSERT INTO MATERIA VALUES ('ESP-05','Espanol',5);
INSERT INTO MATERIA VALUES ('ESP-06','Espanol',6);
INSERT INTO MATERIA VALUES ('ESP-07','Espanol',7);
INSERT INTO MATERIA VALUES ('ESP-08','Espanol',8);
INSERT INTO MATERIA VALUES ('ESP-09','Espanol',9);
INSERT INTO MATERIA VALUES ('ESP-10','Espanol',10);
INSERT INTO MATERIA VALUES ('ESP-11','Espanol',11);

INSERT INTO MATERIA VALUES ('MAT-01','Matematica',1);
INSERT INTO MATERIA VALUES ('MAT-02','Matematica',2);
INSERT INTO MATERIA VALUES ('MAT-03','Matematica',3);
INSERT INTO MATERIA VALUES ('MAT-04','Matematica',4);
INSERT INTO MATERIA VALUES ('MAT-05','Matematica',5);
INSERT INTO MATERIA VALUES ('MAT-06','Matematica',6);
INSERT INTO MATERIA VALUES ('MAT-07','Matematica',7);
INSERT INTO MATERIA VALUES ('MAT-08','Matematica',8);
INSERT INTO MATERIA VALUES ('MAT-09','Matematica',9);
INSERT INTO MATERIA VALUES ('MAT-10','Matematica',10);
INSERT INTO MATERIA VALUES ('MAT-11','Matematica',11);

INSERT INTO MATERIA VALUES ('ING-01','Ingles',1);
INSERT INTO MATERIA VALUES ('ING-02','Ingles',2);
INSERT INTO MATERIA VALUES ('ING-03','Ingles',3);
INSERT INTO MATERIA VALUES ('ING-04','Ingles',4);
INSERT INTO MATERIA VALUES ('ING-05','Ingles',5);
INSERT INTO MATERIA VALUES ('ING-06','Ingles',6);
INSERT INTO MATERIA VALUES ('ING-07','Ingles',7);
INSERT INTO MATERIA VALUES ('ING-08','Ingles',8);
INSERT INTO MATERIA VALUES ('ING-09','Ingles',9);
INSERT INTO MATERIA VALUES ('ING-10','Ingles',10);
INSERT INTO MATERIA VALUES ('ING-11','Ingles',11);

INSERT INTO MATERIA VALUES ('EFI-01','Educacion Fisica',1);
INSERT INTO MATERIA VALUES ('EFI-02','Educacion Fisica',2);
INSERT INTO MATERIA VALUES ('EFI-03','Educacion Fisica',3);
INSERT INTO MATERIA VALUES ('EFI-04','Educacion Fisica',4);
INSERT INTO MATERIA VALUES ('EFI-05','Educacion Fisica',5);
INSERT INTO MATERIA VALUES ('EFI-06','Educacion Fisica',6);
INSERT INTO MATERIA VALUES ('EFI-07','Educacion Fisica',7);
INSERT INTO MATERIA VALUES ('EFI-08','Educacion Fisica',8);
INSERT INTO MATERIA VALUES ('EFI-09','Educacion Fisica',9);
INSERT INTO MATERIA VALUES ('EFI-10','Educacion Fisica',10);
INSERT INTO MATERIA VALUES ('EFI-11','Educacion Fisica',11);

INSERT INTO MATERIA VALUES ('MUS-01','Educacion Musical',1);
INSERT INTO MATERIA VALUES ('MUS-02','Educacion Musical',2);
INSERT INTO MATERIA VALUES ('MUS-03','Educacion Musical',3);
INSERT INTO MATERIA VALUES ('MUS-04','Educacion Musical',4);
INSERT INTO MATERIA VALUES ('MUS-05','Educacion Musical',5);
INSERT INTO MATERIA VALUES ('MUS-06','Educacion Musical',6);
INSERT INTO MATERIA VALUES ('MUS-07','Educacion Musical',7);
INSERT INTO MATERIA VALUES ('MUS-08','Educacion Musical',8);
INSERT INTO MATERIA VALUES ('MUS-09','Educacion Musical',9);
INSERT INTO MATERIA VALUES ('MUS-10','Educacion Musical',10);
INSERT INTO MATERIA VALUES ('MUS-11','Educacion Musical',11);

INSERT INTO MATERIA VALUES ('REL-01','Educacion Religiosa',1);
INSERT INTO MATERIA VALUES ('REL-02','Educacion Religiosa',2);
INSERT INTO MATERIA VALUES ('REL-03','Educacion Religiosa',3);
INSERT INTO MATERIA VALUES ('REL-04','Educacion Religiosa',4);
INSERT INTO MATERIA VALUES ('REL-05','Educacion Religiosa',5);
INSERT INTO MATERIA VALUES ('REL-06','Educacion Religiosa',6);

INSERT INTO MATERIA VALUES ('CIV-07','Educacion Civica',7);
INSERT INTO MATERIA VALUES ('CIV-08','Educacion Civica',8);
INSERT INTO MATERIA VALUES ('CIV-09','Educacion Civica',9);
INSERT INTO MATERIA VALUES ('CIV-10','Educacion Civica',10);
INSERT INTO MATERIA VALUES ('CIV-11','Educacion Civica',11);

INSERT INTO MATERIA VALUES ('FRA-07','Frances',7);
INSERT INTO MATERIA VALUES ('FRA-08','Frances',8);
INSERT INTO MATERIA VALUES ('FRA-09','Frances',9);
INSERT INTO MATERIA VALUES ('FRA-10','Frances',10);
INSERT INTO MATERIA VALUES ('FRA-11','Frances',11);

INSERT INTO MATERIA VALUES ('APL-07','Artes Plasticas',7);
INSERT INTO MATERIA VALUES ('APL-08','Artes Plasticas',8);
INSERT INTO MATERIA VALUES ('APL-09','Artes Plasticas',9);
INSERT INTO MATERIA VALUES ('APL-10','Artes Plasticas',10);
INSERT INTO MATERIA VALUES ('APL-11','Artes Plasticas',11);

INSERT INTO MATERIA VALUES ('IND-07','Industriales',7);
INSERT INTO MATERIA VALUES ('IND-08','Industriales',8);
INSERT INTO MATERIA VALUES ('IND-09','Industriales',9);

INSERT INTO MATERIA VALUES ('HOG-07','Educacion para el Hogar',7);
INSERT INTO MATERIA VALUES ('HOG-08','Educacion para el Hoga',8);
INSERT INTO MATERIA VALUES ('HOG-09','Educacion para el Hoga',9);

INSERT INTO MATERIA VALUES ('PSI-10','Psicologia Filosofia',10);
INSERT INTO MATERIA VALUES ('PSI-11','Psicologia Filosofia',11);

INSERT INTO MATERIA VALUES ('INF-01','Informatica',1);
INSERT INTO MATERIA VALUES ('INF-02','Informatica',2);
INSERT INTO MATERIA VALUES ('INF-03','Informatica',3);
INSERT INTO MATERIA VALUES ('INF-04','Informatica',4);
INSERT INTO MATERIA VALUES ('INF-05','Informatica',5);
INSERT INTO MATERIA VALUES ('INF-06','Informatica',6);
INSERT INTO MATERIA VALUES ('INF-07','Informatica',7);
INSERT INTO MATERIA VALUES ('INF-08','Informatica',8);
INSERT INTO MATERIA VALUES ('INF-09','Informatica',9);
INSERT INTO MATERIA VALUES ('INF-10','Informatica',10);
INSERT INTO MATERIA VALUES ('INF-11','Informatica',11);

INSERT INTO MATERIA VALUES ('CONV-07','Ingles conversacional',7);
INSERT INTO MATERIA VALUES ('CONV-08','Ingles conversacional',8);
INSERT INTO MATERIA VALUES ('CONV-09','Ingles conversacional',9);
INSERT INTO MATERIA VALUES ('CONV-10','Ingles conversacional',10);
INSERT INTO MATERIA VALUES ('CONV-11','Ingles conversacional',11);

INSERT INTO MATERIA VALUES ('COND-01','Conducta',1);
INSERT INTO MATERIA VALUES ('COND-02','Conducta',2);
INSERT INTO MATERIA VALUES ('COND-03','Conducta',3);
INSERT INTO MATERIA VALUES ('COND-04','Conducta',4);
INSERT INTO MATERIA VALUES ('COND-05','Conducta',5);
INSERT INTO MATERIA VALUES ('COND-06','Conducta',6);
INSERT INTO MATERIA VALUES ('COND-07','Conducta',7);
INSERT INTO MATERIA VALUES ('COND-08','Conducta',8);
INSERT INTO MATERIA VALUES ('COND-09','Conducta',9);
INSERT INTO MATERIA VALUES ('COND-10','Conducta',10);
INSERT INTO MATERIA VALUES ('COND-11','Conducta',11);