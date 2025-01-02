INSERT INTO COUNTRY (countryName, countryCode)
VALUES 
	('Spain', 'ES'),
	('France', 'FR'),
	('Italy', 'IT'),
  ('Ireland', 'IE'),
  ('United Kingdom', 'GB'),
  ('Belgium', 'BE'),
  ('Denmark', 'DK'),
  ('Austria', 'AT'),
  ('Bulgaria', 'BG'),
  ('Czech Republic', 'CZ'),
  ('Germany','DE'),
  ('Greece', 'GR'),
  ('Norway','NO'),
  ('Poland','PL'),
  ('Portugal','PT'),
  ('Switzerland', 'CH'),
  ('Slovenia', 'SI'),
RETURNING (countryName, countryID);

INSERT INTO COUNTRY (countryName, countryCode)
VALUES 
	('España', 'ES'),
	('Francia', 'FR')
RETURNING (countryName, countryID);

INSERT INTO UNIVERSITY (countryID, universityName)
	VALUES 
	(1, 'Universidad de La Laguna'), 
	(2, 'Universidad de Francia')
RETURNING (countryID, universityID);

INSERT INTO EVALUATION_SYSTEM (
   universityID, evaluationType
)
VALUES (
  1,               
  'continuous'
);


INSERT INTO GRADE_CONVERSION (
   evaluationSystemID, gradeMin, gradeMax, baseEquivalentSpanishGrade, factor, topEquivalentSpanishGrade, gradeName
)
VALUES (
  1,               
  0.1,               
  4.99,               
  0.1,                
  1,                 
  4.99,            
  'Suspenso'
);

INSERT INTO GRADE_CONVERSION (
   evaluationSystemID, gradeMin, gradeMax, baseEquivalentSpanishGrade, factor, topEquivalentSpanishGrade, gradeName
)
VALUES (
  1, 
  5.0,               
  6.99,               
  5.0,                
  1,                 
  6.99,            
  'Aprobado'
);

INSERT INTO GRADE_CONVERSION (
   evaluationSystemID, gradeMin, gradeMax, baseEquivalentSpanishGrade, factor, topEquivalentSpanishGrade, gradeName
)
VALUES (
  1, 
  7.0,               
  8.99,               
  7.0,                
  1,                 
  8.99,            
  'Notable'
);

INSERT INTO GRADE_CONVERSION (
   evaluationSystemID, gradeMin, gradeMax, baseEquivalentSpanishGrade, factor, topEquivalentSpanishGrade, gradeName
)
VALUES (
  1, 
  9.0,               
  10,               
  9.0,                
  1,                 
  10,            
  'Sobresaliente'
);

