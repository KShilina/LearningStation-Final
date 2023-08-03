
-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS tutors CASCADE;
DROP TABLE IF EXISTS classes CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;

-- CREATE DATABASE learningstation;

-- Create the "students" table
CREATE TABLE students (
  student_id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  location VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
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
  avg_rating NUMERIC DEFAULT 0,
  avg_class_prices MONEY DEFAULT 0,
  num_students_booked INTEGER DEFAULT 0
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
-- the reviews table
CREATE TABLE reviews (
  review_id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(student_id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  tutor_id INT REFERENCES tutors(tutor_id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  rating INT NOT NULL,
  comment TEXT,
  review_date TIMESTAMP DEFAULT NOW() NOT NULL
);



------------------- TRIGGER FUNCTION FOR AVG_RATING ------------------------


CREATE OR REPLACE FUNCTION update_avg_rating()
RETURNS TRIGGER AS
$$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE tutors
    SET avg_rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM reviews
      WHERE tutor_id = NEW.tutor_id
    )
    WHERE tutor_id = NEW.tutor_id;
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE tutors
    SET avg_rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM reviews
      WHERE tutor_id = NEW.tutor_id
    )
    WHERE tutor_id = NEW.tutor_id;
  END IF;
  RETURN NEW;
END;
$$
LANGUAGE plpgsql;
---- TRIGGER
CREATE TRIGGER update_avg_rating_trigger
AFTER INSERT OR UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_avg_rating();


----------------- TRIGGER FUNCTION FOR CLASS PRICES ---------------

-- Create a new function to update avg_class_prices
CREATE OR REPLACE FUNCTION update_avg_class_prices()
RETURNS TRIGGER AS
$$
BEGIN
  UPDATE tutors
  SET avg_class_prices = COALESCE((
      SELECT AVG(class_price::numeric)
      FROM classes
      WHERE classes.tutor_id = NEW.tutor_id
  ), 0)
  WHERE tutors.tutor_id = NEW.tutor_id;

  RETURN NEW;
END;
$$
LANGUAGE plpgsql;

-- Create a trigger to update avg_class_prices

CREATE TRIGGER update_avg_class_prices_trigger
AFTER INSERT OR UPDATE ON classes
FOR EACH ROW
EXECUTE FUNCTION update_avg_class_prices();

------------- TRIGGER FUNCTION FOR TOTAL NUMBER OFF BOOKED STUDENTS -------

-- Create the trigger function
CREATE OR REPLACE FUNCTION update_num_students_booked()
RETURNS TRIGGER AS
$$
BEGIN
  UPDATE tutors
  SET num_students_booked = COALESCE((
    SELECT COUNT(DISTINCT bookings.student_id)
    FROM bookings
    INNER JOIN classes ON bookings.class_id = classes.class_id
    WHERE classes.tutor_id = tutors.tutor_id
  ), 0);

  RETURN NEW;
END;
$$
LANGUAGE plpgsql;

---
DROP FUNCTION IF EXISTS update_num_students_booked();

-- Create a trigger to update num_students_booked
CREATE TRIGGER update_num_students_booked_trigger
AFTER INSERT OR UPDATE ON bookings
FOR EACH STATEMENT
EXECUTE FUNCTION update_num_students_booked();
----
DROP TRIGGER IF EXISTS update_num_students_booked_trigger ON bookings;

--------------------------------------------------------------------------------

-- CHECKING TRIGGER 
 SELECT tgname AS trigger_name
FROM pg_trigger
WHERE tgname = 'update_num_students_booked_trigger';

-- CHECKING TRIG FUNCTION
SELECT proname AS function_name
FROM pg_proc
WHERE proname = 'function_name_here';
