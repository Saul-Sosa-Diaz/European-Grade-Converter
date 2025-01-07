DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE COUNTRY (
    countryID SERIAL UNIQUE,
    countryName VARCHAR(255) NOT NULL,
	countryCode VARCHAR(4) NOT NULL,
    PRIMARY KEY (countryID)
);

CREATE TABLE UNIVERSITY (
    universityID SERIAL UNIQUE,
    countryID INT NOT NULL REFERENCES COUNTRY(countryID)  ON DELETE CASCADE ON UPDATE CASCADE,
	universityName VARCHAR(255),
    PRIMARY KEY (universityID)
);

CREATE TYPE EVALUATION_TYPE AS ENUM(
  'continuous',
  'discrete'
);

CREATE TABLE EVALUATION_SYSTEM (
    evaluationSystemID SERIAL,
	universityID INT NOT NULL REFERENCES UNIVERSITY(universityID) ON DELETE CASCADE ON UPDATE CASCADE,
	evaluationType EVALUATION_TYPE not NULL,
    validGrades TEXT [],
    evaluationSystemName VARCHAR(255),
    PRIMARY KEY (evaluationSystemID)
);

CREATE TABLE GRADE_CONVERSION (
    gradeConversionID SERIAL,
    evaluationSystemID INT NOT NULL REFERENCES EVALUATION_SYSTEM(evaluationSystemID) ON DELETE CASCADE ON UPDATE CASCADE,
	MinIntervalGrade NUMERIC(5,2) NOT NULL,
	MaxIntervalGrade NUMERIC(5,2) NOT NULL, 
	baseEquivalentSpanishGrade NUMERIC(5,2) NOT NULL,
	topEquivalentSpanishGrade NUMERIC(5,2) NOT NULL,
	factor NUMERIC(5,2) NOT NULL,
	gradeName VARCHAR(255),
    PRIMARY KEY (gradeConversionID)
);