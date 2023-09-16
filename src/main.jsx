import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './Layout/MainLayout';
import AuthProvider from './AuthProvider/AuthProvider';
import Home from './Pages/Home/Home';
import Login from './Pages/User/Login';
import Register from './Pages/User/Register';
import ContactList from './Pages/ContactList/ContactList';
import PrivateRoute from './Routes/PrivateRoute';
import AddNew from './Pages/AddNew/AddNew';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/addnew",
        element: <PrivateRoute><AddNew></AddNew></PrivateRoute>,
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/contactList",
        element: <ContactList></ContactList>
      },
    ]
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
