# Meeting Room Booking System

## Live URL

https://assignment-3-six-liart.vercel.app/

## Features

- In this project, we have Sign Up and Login functionality. So User can create account and login. They will get a jwt token when login. We can create Admin also.
- We can create Room for the meetings. But only the Admic has access to create a Room. There is GetRoom, UpdateRoom and DeleteRoom functionalities also.
- Admin can also create Slots dependent on the Rooms. And based on the StartTime and EndTime admin can create multiple slots in single time.
- Then an Authenticated User can create Booking for slots. User can also get their Booking data also. Admin has the access to Update or Delete a Booking.

## Technologies

1. Express js.
2. Mongoose
3. Typescript
4. Zod
5. JsonWebToken
6. Bcrypt
7. Http-Status
8. Eslint
9. Prettier

## Description

This is a Node-Express Js server. We are using Mongoose for storing our data in the MongoDB database. We are using TypeScript for the defining the types.There is Zod Validation for the validations. We have the Authentication functionalities. We are using JWT for this. We are using the middlewares for handling the errors.

## Set up and Use

to run the application first you have to install the packages

```
    yarn install
```

to run the application using ts-node-dev

```
yarn  start:dev
```

to run the application in production mode

```
yarn  start:prod
```
