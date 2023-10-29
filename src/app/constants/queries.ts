export const createTablePatient: string = `
DROP TABLE IF EXISTS patients;
CREATE TABLE IF NOT EXISTS patients (
  PatientId INTEGER PRIMARY KEY NOT NULL,
  PatientName TEXT NOT NULL
);`;

export const createTableImages: string = `
DROP TABLE IF EXISTS images;
CREATE TABLE IF NOT EXISTS images (
  ImageId INTEGER PRIMARY KEY NOT NULL,
  ImageName TEXT NOT NULL,
  Path TEXT  NULL
);`;