# Contact Management
This is a contact management application, where i am use to build react.js, express.js, mongoDB and nodejs and also use tailwind css.

## [LIVE](https://email-password-auth-7966a.web.app)

## Folder Structure
* node_modules/
* public/
* src/
  * assets
  * AuthProvider/
    * AuthProvider.jsx
  * components/
    * LoadingSpinner/
    * LeftSideBar.jsx
    * ProfileMenu.jsx
    * TableRow.jsx
  * Hooks/
    * useUser.jsx
  * Layout/
    * MainLayout.jsx
  * Pages/
    * Action
    * AddNew
    * ContactList
    * Home
    * User
  * Routes/
    * PrivateRoute.jsx
  * firebase.js
  * index.css
  * main.jsx
* package.json/
* README.md


## Directory and File Descriptions

- **`node_modules/`:** This directory contains all the external packages and dependencies required for your React app. You don't need to manage this manually; it's generated when you run `npm install` or `yarn install`.

- **`public/`:** This directory contains static assets that are publicly accessible. The `index.html` file serves as the main HTML template for your app.

- **`src/`:** This is where you'll put your application's source code.

  - **`assets`:** All internal resources are included here.

  - **`AuthProvider`:** In this folder we write code to manage the context. Here i am using authentication code, because this functionality are used in the more components.


  - **`components/`:** A folder to organize your React components. We create additional subfolders for better organization if your app becomes more complex.
  


  - **`Hooks`:** For making custom hooks we create this folder.


  - **`Layout`:** This app contains only one layout and layout code insided here.


  - **`Pages`:** All the pages code are included in this folder.
  

  - **`Routes`:** I make a private route for current login user without login the visitor can't add contact, also can't update and delete.


  - **`firebase.js`:** I am writing firebase setup code in this file.


  - **`index.css/`:** A file for CSS or SCSS stylesheets. We can style our components and layouts here.


  - **`main.jsx/`:** All the components route set here.

- **`package.json`:** This file contains project metadata, including dependencies, scripts, and other configuration settings. You can manage project dependencies and scripts here.

- **`README.md`:** A markdown file that serves as project documentation. You can write instructions, notes, and explanations here.


