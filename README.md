# 🕸️ eAuth: A Robust Auth System 🕸️

This is a `Role Based Access Control (RBAC)` application using Node.js, Express.js, and Passport.js, etc.

You can use this application as the starting point for whatever project you are going to build which needs authentication system.

For authentication we have only `Email` & `Password` option but other authentication options using `OAuth` like Google, Apple, and GitHub, etc. can be easily incorporated.

The application is based on the **`MVC pattern`** i.e. `Model` | `View` | `Controller`.

**`Mongoose`** is used as an `ORM` for `MongoDB` for storing Users in Database.

**`Passport.js`** is used for local(email, password) authentication.

The application is **`production ready`**.

I have added complete process walkthrough screenshots in `output` directory.

`# Admin Login #`
```
Email: admin@gmail.com - Mandatory
Password: Set according to you
```


---

## To setting up the project follow the steps below...🚀

Step 0: Make sure that the below listed softwares are already installed there in your machine
- Git - Software
- VSCode - Code Editor - `Optional`
- Docker - Desktop App - `Optional`
- MongoDB - DBMS Software
- MongoDB Compass - Desktop App
- Node - Software
- NPM - Package Manager

`Check using following commands:`
```bash
git --version
code --version
docker --version
mongo --version
node --version
npm --version
```

Step 1: Clone the repo

```bash
git clone https://github.com/Suraj-Encoding/eAuth.git .
```

Step 2: cd into the cloned repo

```bash
cd <path>
```

Step 3: Install Dependencies

```bash
npm install
```

Step 4: Create `.env` file in the root directory of your project

Step 5: Put your credentials in the `.env` file as mentioned in `.env.example` file

Step 6: Start the app or server

Using `node`
```bash
npm start
```
Using `nodemon`
```bash
npm run dev
```

## Author

- [**Suraj Dalvi**](https://page.surajdalvi.tech)

## Contribute

Feel free to fork this repo and submit a pull request. Contributions are always welcome!
