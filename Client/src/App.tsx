import './App.css'
import Dashboard from './Components/Dashboard/Dashboard';
import Docs from './Components/Docs/Docs';
import Hero from './Components/Hero/Hero';
// import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PdfPreview from './Components/Pdfcard/PdfPreview';
import Profile from './Components/Profile/Profile';
import Contact from './Components/Contact/Contact';
import Notification from './Components/Notifications/Notification';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/dist/query';
import { loadUser } from './Actions/UserApi';
import { useEffect, useState } from 'react';
import { Bio } from './Components/BioStarter/Bio';
import Roadmap from './Components/Roadmaps/Roadmap';

const App = () => {
  //@ts-ignore
  const { isAuthenticated } = useSelector((state:RootState) => state.user);

  const [isMobile, setIsMobile] = useState(false);


  async function  fetchData  (){
    await dispatch(loadUser());
  }



  const dispatch=useDispatch();
  useEffect(() => {
  fetchData();
  }, [dispatch]);






    useEffect(() => {
      const handleResize = () => {
          setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
      };

      handleResize(); // Check initially
      window.addEventListener("resize", handleResize); // Add event listener for window resize
      return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  if (isMobile) {
      return (
          <div style={{ textAlign: "center", marginTop: "20%" }}>
              <h1 style={{ color: "red",fontSize:"40px" }}>This app is only accessible on larger screens.</h1>
              <p>Please switch to a desktop or tablet for the best experience.</p>
          </div>
      );
  }

  return (
    
    <Router>
        <Routes>
          <Route path='/hero' element={<Hero/>}/>
          <Route path='/' element={isAuthenticated? <Dashboard/>:<Login/>}/>
          <Route path='/Courses' element={isAuthenticated? <Dashboard/>:<Login/>}/>

          <Route path="/Courses/docsarray/:id" element={<Docs/>} />
          <Route path="/preview" element={<PdfPreview/>} />
          <Route path="/profile" element={<Profile/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path='/notifications' element={<Notification/>}/>
          <Route path='/login' element={isAuthenticated? <Dashboard/>:<Login/>}/>
        <Route path='/addbio' element={isAuthenticated ? <Bio/>:<Login/>}/>
        <Route path='/register' element={isAuthenticated ? <Navigate to="/Courses" /> : <Register/>}/>
        <Route path='/Courses/preview/*' element={isAuthenticated ? <PdfPreview/> : <Register/>}/>
        <Route path='/roadmaps' element={  isAuthenticated ? <Roadmap/> : <Register/>}/>
       </Routes>
       <Toaster position="bottom-center" />

      </Router>
  )
}

export default App