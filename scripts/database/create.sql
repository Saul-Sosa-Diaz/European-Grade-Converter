DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE COUNTRY (
    countryID SERIAL UNIQUE,
    countryName VARCHAR(255) UNIQUE NOT NULL,
    countryCode VARCHAR(4) UNIQUE NOT NULL,
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
    fixed NUMERIC not null,
    PRIMARY KEY (evaluationSystemID)
);

CREATE TYPE EUROPEAN_EQUIVALENCE_TYPE AS ENUM(
  'A',
  'B',
  'C',
  'D',
  'E',
  'Fx',
  'F'
);

CREATE TABLE CONTINUOUS_GRADE_CONVERSION (
    gradeConversionID SERIAL,
    evaluationSystemID INT NOT NULL REFERENCES EVALUATION_SYSTEM(evaluationSystemID) ON DELETE CASCADE ON UPDATE CASCADE,
    MinIntervalGrade NUMERIC(5,2) NOT NULL,
    MaxIntervalGrade NUMERIC(5,2) NOT NULL, 
    baseEquivalentSpanishGrade NUMERIC(5,2) NOT NULL,
    topEquivalentSpanishGrade NUMERIC(5,2) NOT NULL,
    gradeName VARCHAR(255),
	europeanEquivalence EUROPEAN_EQUIVALENCE_TYPE NOT NULL,
    PRIMARY KEY (gradeConversionID)
);

CREATE TABLE DISCRETE_GRADE_CONVERSION (
    discreteGradeID SERIAL,
    evaluationSystemID INT NOT NULL REFERENCES EVALUATION_SYSTEM(evaluationSystemID) ON DELETE CASCADE ON UPDATE CASCADE,
    gradeValue VARCHAR(50) NOT NULL,
    baseEquivalentSpanishGrade NUMERIC(5,2) NOT NULL,
    topEquivalentSpanishGrade NUMERIC(5,2) NOT NULL,
	europeanEquivalence EUROPEAN_EQUIVALENCE_TYPE NOT NULL,
    PRIMARY KEY (discreteGradeID)
);