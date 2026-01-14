import { useEffect, useState } from 'react';
import { FaChartBar } from 'react-icons/fa';
import { HiMenuAlt4 } from 'react-icons/hi';
import { HiOutlineSparkles } from "react-icons/hi2";
import { IoMdContact, IoMdNotificationsOutline } from "react-icons/io";
import { MdHome } from "react-icons/md";
import { RiAccountCircleFill } from "react-icons/ri";
import { Link, useLocation } from 'react-router-dom';


const Sidebar = () => {
    const location = useLocation();
    const [showModal,setShowmodal]=useState(false);
    const [phoneActive,setPhoneActive]=useState(
    window.innerWidth<1100
    )
    const resizeHandler=()=>{
      setPhoneActive(window.innerWidth<1100);
    };
    useEffect(() => {
      window.addEventListener("resize", resizeHandler);
  
      return () => {
        window.removeEventListener("resize", resizeHandler);
      };
    }, []);
    
  return (
   <>
   {phoneActive && (
    <button id='hamburger' onClick={()=>setShowmodal(true)}><HiMenuAlt4/></button>
   )}
    <aside className='w-full bg-white relative z-10 overflow-y-auto p-4' 
        style={
          phoneActive?
          {
             width:"20rem",
             height:"100vh",
             position:"fixed",
             top:0,
             left:showModal?"0":"-20rem",
             transition:"all 0.5s"
        }:{}
      }
       >
        <h2 style={{
          fontWeight:"bold",
          fontSize:"1.5rem",
          color:"black",

          
        }}>DevVerse </h2>
          <DivOne   location={location} />
        {/* @ts-ignore */}
        <DivTwo location={location} phoneActive={phoneActive}   />
        {phoneActive && <button id='close-sidebar' onClick={()=>setShowmodal(false)}>Close</button>}


    </aside>
   </>
  )
}
//@ts-ignore
  const DivOne = ({ location }) => (
    <div  className='m-[2rem] mx-[1rem]'>
      <h5 className='m-[1rem] mx-[0rem]  font-bold  '>Dashboard</h5>
      <ul className=' flex flex-col  justify-[unset] items-[unset]  gap-[0.5rem] list-none' >
        <Li 
          url="/hero"
          text="Home"
          Icon={MdHome}
          location={location}
        />
       
       
        
      </ul>
    </div>
  );

  //@ts-ignore

  const DivTwo = ({ location }) => (
    <div  className='m-[2rem] mx-[1rem]'>
     <h5 className='m-[1rem] mx-[0rem]   font-bold '>Content</h5>
     <ul className=' flex flex-col  justify-[unset] items-[unset]  gap-[0.5rem] list-none' >
        <Li
          url="/Courses"
          text="Courses"
          Icon={FaChartBar}
          location={location}
        />
        <Li
          url="/profile"
          text="Profile"
          Icon={RiAccountCircleFill}
          location={location}
        />
        <Li
          url="/notifications"
          text="Notifications"
          Icon={IoMdNotificationsOutline}
          location={location}
        />

<Li
          url="/contact"
          text="Contact Us"
          Icon={IoMdContact}
          location={location}
        />


<Li
          url="/roadmaps"
          text="Roadmaps"
          Icon={HiOutlineSparkles}
          location={location}
        />

      </ul>
    </div>
  );
  //@ts-ignore

  const Li = ({ url, text, location, Icon }) => (
    <li className=' py-2  w-[80%] rounded-[15px] '
      style={{
        backgroundColor: location.pathname.includes(url)
          ? "black"
          : " rgb(154, 154, 154)",
      }}
    >
      <Link className='  flex  flex-row justify-center items-center gap-2 text-black'
        to={url}
        style={{
          color: location.pathname.includes(url) ? "black" : "white",
        }}
      >
        <Icon className="text-white" />
        <p className="text-white" >{text}</p>
      </Link>
    </li>
  );
  
  
export default Sidebar