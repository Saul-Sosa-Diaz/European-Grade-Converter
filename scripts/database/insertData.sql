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
  ('Slovenia', 'SI')
RETURNING (countryName, countryID);

INSERT INTO UNIVERSITY (countryID, universityName)
	VALUES 
	(1, null),  -- 1 Spain
	(2, null), -- 2 France
  (3, 'Salerno University'), -- 3 Italy 
  (3, 'Bolonia University'), -- 3 Italy
  (4, null), -- 4 Ireland
  (5, null) ,-- 5 United Kingdom
  (6, null) ,-- 6 Belgium
  (7, null) ,-- 7 Denmark
  (8, null) ,-- 8 Austria
  (9, null) ,-- 9 Bulgaria
  (10, null), -- 10 Czech Republic
  (11, null), -- 11 Germany
  (12, null), -- 12 Greece
  (13, null), -- 13 Norway
  (14, null), -- 14 Poland
  (15, null), -- 15 Portugal
  (16, null), -- 16 Switzerland
  (17, null) -- 17 Slovenia
RETURNING (countryID, universityID);

INSERT INTO EVALUATION_SYSTEM (
   universityID, evaluationType, minGrade, maxGrade, step
)
VALUES (
  1,   -- Spain 
  'continuous',
  0,
  10,
  0.01
);


INSERT INTO GRADE_CONVERSION (
   evaluationSystemID, MinIntervalGrade, MaxIntervalGrade, baseEquivalentSpanishGrade, factor, topEquivalentSpanishGrade, gradeName
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
   evaluationSystemID, MinIntervalGrade, MaxIntervalGrade, baseEquivalentSpanishGrade, factor, topEquivalentSpanishGrade, gradeName
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
   evaluationSystemID, MinIntervalGrade, MaxIntervalGrade, baseEquivalentSpanishGrade, factor, topEquivalentSpanishGrade, gradeName
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
   evaluationSystemID, MinIntervalGrade, MaxIntervalGrade, baseEquivalentSpanishGrade, factor, topEquivalentSpanishGrade, gradeName
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

