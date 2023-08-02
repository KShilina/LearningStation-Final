
-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS tutors CASCADE;
DROP TABLE IF EXISTS classes CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS messages CASCADE;

-- CREATE DATABASE learningstation;

-- Create the "students" table
CREATE TABLE students (
  student_id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  location VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
);

-- Create the "tutors" table
CREATE TABLE tutors (
  tutor_id SERIAL PRIMARY KEY NOT NULL,
  expertise VARCHAR(255) NOT NULL,
  quick_bio TEXT,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  location VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  image TEXT,
);

-- Create the "classes" table
CREATE TABLE classes (
  class_id SERIAL PRIMARY KEY NOT NULL,
  tutor_id INT REFERENCES tutors(tutor_id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  subject VARCHAR(255) NOT NULL,
  class_price MONEY NOT NULL
);

-- Create the "bookings" table
CREATE TABLE bookings (
  booking_id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(student_id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  class_id INT REFERENCES classes(class_id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  booking_date TIMESTAMP DEFAULT NOW() NOT NULL,
  payment_confirmed BOOLEAN DEFAULT FALSE
);

-- Create the "messages" table
CREATE TABLE messages (
  message_id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(student_id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  tutor_id INT REFERENCES tutors(tutor_id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  content TEXT,
  sent_at TIMESTAMP DEFAULT NOW(),
  payment_confirmed BOOLEAN DEFAULT FALSE
);


