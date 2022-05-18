import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { isLogIn } from './user/userSlice';

export default function Home() {
   const dispatch = useDispatch();
   const navigate = useNavigate()
   const isLoggedIn = useSelector((state) => state.user.user.is_logged_in);
   useEffect(() => {
     dispatch(isLogIn());
   }, [dispatch]);


   if ((!isLoggedIn)) {
     navigate("/login");
   }

   return isLoggedIn ? <div>
       <Navbar></Navbar>
       <Outlet></Outlet>
   </div> : <></>;
}
