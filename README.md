# Lifesum - Nutrition Tracker App

The app is designed to keep track of Nutrition content consumed by user.

## Features

### Authentication and Authorization

- Sign In and Sign Up module will authenticate and register the user

- Google authentication (with o-Auth) is also provided for Sign In

- Encrypted Password is used for authentication and JWT token is used for authorization

- User is automatically logged out after session timeout

### Dashboard

- Dashboard will show the calories intake and burned by user for last 7 days

### Diet

- Users can search food item and find their nutritional value of the particular food item

- Users can add the food item along with their quantity consumed and their respective calories

- Users can add the exercises along with duration and their respective calories burnt

### Activity

- Users can add the exercises along with duration and their respective calories burnt

- Feature to visualise the calories count in the form of Bar and Line chart on dashboard

## Tech stack

- React

- Node

- MongoDB

- Express.js

- Material UI

- JWT

- Google Auth

- SCSS

## Run Instructions

- Make sure MongoDB is running

- Add Port and MongoDB URL in .env file in server folder

- Go in client folder.

- Run 'npm start' to start react application

- Go in server folder

- Run 'npm start' to start backend application

- Sign Up and LogIn using personal information or Google SignIn to use the app
