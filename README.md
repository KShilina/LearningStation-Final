# About
LearningStation is an educational platform which connects students and tutors.

## Planning Process


### Users Stories
	As a user, I want to visit the homepage to explore the tutoring services.


		As a user, I want to sign up for an account as a student or a tutor using my name, email, location, and other basic information required for efficient app usage.


		As a student, I want to search for tutors based on subject and availability.


		As a student, I want to view tutor profiles to see their expertise, bio, average rating, class prices, years of experience, and languages spoken.


		As a student, I want to book available classes with the tutor of my choice.


		As a student, I want to pay for classes individually.


		As a student, I want to rate tutors based on my experience after taking their classes.


		As a student, I want to communicate with tutors via messaging or video calls for further discussion or clarification.


		As a student, I want the ability to cancel a class and receive a refund if I do so at least 24 hours in advance.


		As a tutor, I want to sign up for an account using my name, email, location, and other information required by education institutions.


		As a tutor, I want to create a profile with a quick bio to present myself to students.


		As a tutor, I want to have access to OpenAI lesson plans for reference in my tutoring sessions.


		As a tutor, I want to edit my profile, including changing my location and updating class information.


		As a tutor, I want to set my available class hours to let students know when I am available.
		As a tutor, I want to see the number of students I have taught.


		As a tutor, I want to communicate with students via messaging or video calls for further discussion or clarification.


		As a tutor, I want the ability to cancel a class and provide an alternative time/date, while ensuring the student receives a full refund.

### WareFrame


### ERD
Creating tables - when creating tables LEAVE BOOKINGS FOR LAST.

Seeding TABLES - When seeding LEAVE BOOKINGS SEEDS FOR LAST.


## Build with:
*
*
*



The main important bit is that the React project has `proxy` set to `localhost:8080` in the `package.json` file, and that the Express app listens to port 8080 in `server.js`. Take a look!


## Running the project

You need **TWO** terminal windows/tabs for this (or some other plan for running two Node processes).

In one terminal, `cd` into `react-front-end`. Run `npm install` or `yarn` to install the dependencies. Then run `npm start` or `yarn start`, and go to `localhost:3000` in your browser. 

In the other terminal, `cd` into `express-back-end`. Run `npm install` or `yarn` to install the dependencies, then `npm start` or `yarn start` to launch the server. If you wish to use nodemon run `npm run local`.

### Database set up
You need to create .env file inside the `express-back-end` directory, please take as an example .env.example
* Create a new database called learningstation. You will run psql to perform this operation :
``` psql
CREATE NEW DATABASE learningstation; 
```
Then connect to DB:
```  \c learningstation  ```


* Next step will be creating tables, an example below:
```
CREATE TABLE students (
  student_id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  location VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
```
* After creating tables you will need to seed tables

## Next steps

From here, you can start working on your project!

As soon as the dependencies are installed, your Express server can serve JSON and static assets (like images) in response to API calls from the React app. You can get started on developing your React app, routing plan, etc. right away! Any request that isn't handled by React is passed on to the Express server. That means that you can call a route like `/api/users` from React using `fetch`, `axios`, or something else, and Express will receive it as though they originated from the same app. For routing, best practice is to namespace all of your data routes to `/api`, so that they don't clash with other routing schemes, like React Router.






