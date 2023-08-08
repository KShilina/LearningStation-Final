-------- RE-SEEDING PROCESS --------
--- delete entries
DELETE FROM table_name;
--- serial reset
SELECT setval('students_student_id_seq', 1, false);
SELECT setval('tutors_tutor_id_seq', 1, false);
SELECT setval('classes_class_id_seq', 1, false);
SELECT setval('bookings_booking_id_seq', 1, false);
SELECT setval('messages_message_id_seq', 1, false);
SELECT setval('reviews_review_id_seq', 1, false);
-- Insert 10 students
INSERT INTO students (first_name, last_name, email, location, sub_id)
VALUES
  ('John', 'Doe', 'john.doe@student.com', 'New York', 'password1'),
  ('Jane', 'Smith', 'jane.smith@student.com', 'Los Angeles', 'password2'),
  ('Michael', 'Johnson', 'michael.johnson@student.com', 'Chicago', 'password3'),
  ('Emily', 'Williams', 'emily.williams@student.com', 'Houston', 'password4'),
  ('David', 'Brown', 'david.brown@student.com', 'Miami', 'password5'),
  ('Sarah', 'Miller', 'sarah.miller@student.com', 'San Francisco', 'password6'),
  ('Robert', 'Anderson', 'robert.anderson@student.com', 'Seattle', 'password7'),
  ('Jessica', 'Martinez', 'jessica.martinez@student.com', 'Denver', 'password8'),
  ('Daniel', 'Thompson', 'daniel.thompson@student.com', 'Boston', 'password9'),
  ('Lisa', 'Garcia', 'lisa.garcia@student.com', 'Atlanta', 'password10');

-- Insert 10 tutors
-- Insert sample data into the "tutors" table
-- INSERT INTO tutors (expertise, quick_bio, first_name, last_name, email, location, password, image)
-- VALUES
--   ('Mathematics', 'Experienced tutor in Mathematics.', 'John', 'Doe', 'john.doe@example.com', 'New York', 'password123', 'https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'),
--   ('Science', 'Passionate about teaching Science.', 'Jane', 'Smith', 'jane.smith@example.com', 'Los Angeles', 'tutorpass', 'https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'),
--   ('English', 'Skilled in teaching English language and literature.', 'Michael', 'Johnson', 'michael.johnson@example.com', 'Chicago', 'securepassword', 'https://images.unsplash.com/photo-1595133403068-167e49b8569b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80'),
--   ('Computer Science', 'Experienced in programming and computer science.', 'Alex', 'Lee', 'alex.lee@example.com', 'San Francisco', 'cs1234', 'https://images.unsplash.com/photo-1587837073080-448bc6a2329b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'),
--   ('History', 'Specializes in History and Social Studies.', 'Emily', 'Brown', 'emily.brown@example.com', 'Boston', 'history101', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80'),
--   ('Physics', 'Physics enthusiast and tutor.', 'William', 'Taylor', 'william.taylor@example.com', 'Houston', 'physicstutor', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'),
--   ('Chemistry', 'Chemistry expert and tutor.', 'Sophia', 'Martinez', 'sophia.martinez@example.com', 'Miami', 'chemistryrocks', 'https://images.unsplash.com/photo-1573496358961-3c82861ab8f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80'),
--   ('Biology', 'Passionate about teaching Biology.', 'Daniel', 'Garcia', 'daniel.garcia@example.com', 'Phoenix', 'biologist', 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80'),
--   ('Foreign Languages', 'Fluent in multiple foreign languages.', 'Olivia', 'Lopez', 'olivia.lopez@example.com', 'Dallas', 'multilingual', 'https://images.unsplash.com/photo-1627161683077-e34782c24d81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=703&q=80'),
--   ('Music', 'Talented music tutor and performer.', 'Ethan', 'Rivera', 'ethan.rivera@example.com', 'Seattle', 'music123', 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80');

INSERT INTO tutors (expertise, quick_bio, first_name, last_name, email, location, password, image, avg_rating, avg_class_prices, num_students_booked)
VALUES
  ('Mathematics', 'Experienced tutor in Mathematics.', 'John', 'Doe', 'john.doe@example.com', 'New York', 'password123', 'https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80', 0, 0, 0),
  ('Science', 'Passionate about teaching Science.', 'Jane', 'Smith', 'jane.smith@example.com', 'Los Angeles', 'tutorpass', 'https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80', 0, 0, 0),
  ('English', 'Skilled in teaching English language and literature.', 'Michael', 'Johnson', 'michael.johnson@example.com', 'Chicago', 'securepassword', 'https://images.unsplash.com/photo-1595133403068-167e49b8569b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80', 0, 0, 0),
  ('Computer Science', 'Experienced in programming and computer science.', 'Alex', 'Lee', 'alex.lee@example.com', 'San Francisco', 'cs1234', 'https://images.unsplash.com/photo-1587837073080-448bc6a2329b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80', 0, 0, 0),
  ('History', 'Specializes in History and Social Studies.', 'Emily', 'Brown', 'emily.brown@example.com', 'Boston', 'history101', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80', 0, 0, 0),
  ('Physics', 'Physics enthusiast and tutor.', 'William', 'Taylor', 'william.taylor@example.com', 'Houston', 'physicstutor', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80', 0, 0, 0),
  ('Chemistry', 'Chemistry expert and tutor.', 'Sophia', 'Martinez', 'sophia.martinez@example.com', 'Miami', 'chemistryrocks', 'https://images.unsplash.com/photo-1573496358961-3c82861ab8f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80', 0, 0, 0),
  ('Biology', 'Passionate about teaching Biology.', 'Daniel', 'Garcia', 'daniel.garcia@example.com', 'Phoenix', 'biologist', 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80', 0, 0, 0),
  ('Foreign Languages', 'Fluent in multiple foreign languages.', 'Olivia', 'Lopez', 'olivia.lopez@example.com', 'Dallas', 'multilingual', 'https://images.unsplash.com/photo-1627161683077-e34782c24d81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=703&q=80', 0, 0, 0),
  ('Music', 'Talented music tutor and performer.', 'Ethan', 'Rivera', 'ethan.rivera@example.com', 'Seattle', 'music123', 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80', 0, 0, 0);


  ---- add 10 bookings ----

  INSERT INTO bookings (student_id, class_id, booking_date, payment_confirmed)
VALUES
  (1, 1, '2023-07-25 12:00:00', true),
  (2, 2, '2023-07-26 15:30:00', true),
  (3, 3, '2023-07-27 10:00:00', false),
  (4, 4, '2023-07-28 09:45:00', false),
  (5, 5, '2023-07-29 14:15:00', true),
  (6, 6, '2023-07-30 11:30:00', true),
  (7, 7, '2023-07-31 17:00:00', false),
  (8, 8, '2023-08-01 13:45:00', true),
  (9, 9, '2023-08-02 12:30:00', true),
  (10, 10, '2023-08-03 10:15:00', false);


  ---create 10 message examples ----

INSERT INTO messages (student_id, tutor_id, content, sent_at, payment_confirmed)
VALUES
  (1, 1, 'Hi, I need help with my math assignment.', '2023-07-25 08:30:00', true),
  (2, 2, 'Hello, can you assist with my science project?', '2023-07-25 10:15:00', true),
  (3, 3, 'Hey, I have a question about English grammar.', '2023-07-25 12:45:00', false),
  (4, 4, 'Hi there, Im having trouble with history facts.', '2023-07-25 14:30:00', false),
  (5, 5, 'Hello, can you explain physics concepts to me?', '2023-07-25 16:00:00', true),
  (6, 6, 'Hi, I need help understanding chemistry reactions.', '2023-07-25 17:45:00', true),
  (7, 7, 'Hey, can you assist with a computer science problem?', '2023-07-25 19:30:00', false),
  (8, 8, 'Hello, I want to practice speaking Spanish.', '2023-07-25 21:00:00', true),
  (9, 9, 'Hi, can you explain biology concepts?', '2023-07-26 09:30:00', true),
  (10, 10, 'Hey, Im interested in learning music theory.', '2023-07-26 11:15:00', false);


  ------create 10 class examples ----

  INSERT INTO classes (tutor_id, subject, class_price)
VALUES
  (1, 'Mathematics', '$30.00'),
  (2, 'Science', '$25.00'),
  (3, 'English', '$20.00'),
  (4, 'History', '$18.00'),
  (5, 'Physics', '$35.00'),
  (6, 'Chemistry', '$28.00'),
  (7, 'Computer Science', '$40.00'),
  (8, 'Spanish', '$22.00'),
  (9, 'Biology', '$26.00'),
  (10, 'Music', '$32.00');


------create 10 reviews examples ----


  INSERT INTO reviews (student_id, tutor_id, rating, comment, review_date)
VALUES
  (1, 1, 4, 'Great tutor!', '2023-07-30'),
  (2, 3, 5, 'Excellent teaching skills', '2023-07-29'),
  (3, 2, 3, 'Needs improvement', '2023-07-28'),
  (4, 1, 5, 'Highly recommended', '2023-07-27'),
  (5, 4, 4, 'Very knowledgeable', '2023-07-26'),
  (6, 5, 2, 'Disappointing experience', '2023-07-25'),
  (7, 3, 4, 'Helped me understand complex concepts', '2023-07-24'),
  (8, 2, 5, 'Best tutor ever!', '2023-07-23'),
  (9, 6, 3, 'Average tutoring sessions', '2023-07-22'),
  (10, 1, 4, 'Patient and helpful', '2023-07-21');