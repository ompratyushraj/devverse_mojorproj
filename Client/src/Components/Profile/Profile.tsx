import { RootState } from "@reduxjs/toolkit/dist/query";
import { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosInformationCircleOutline, IoMdNotificationsOutline } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../Actions/UserApi";
import SavedItems from "../SavedCard/SavedItems";
import Sidebar from "../Sidebar/Sidebar";

import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const Profile = () => {
  //@ts-ignore
  const { user ,loading } = useSelector((state:RootState) => state.user);

interface FavouriteCourse{
  course:string;
  poster:string;
  id:string

}

  const dateString=user?.createdAt;
  const date = new Date(dateString);

// Extract the components
const day = date.getDate();
const month = date.toLocaleString("default", { month: "short" });
const year = date.getFullYear();

// Format the date
const formattedDate = `${day} ${month} ${year}`;


    const dispatch=useDispatch()
    useEffect(() => {
      dispatch(loadUser());
    }, [dispatch]);
    if(loading){
      return <Loader/>
    }
  return (
    <div className="admin-container grid grid-cols-[1fr_4fr] h-screen bg-[rgba(247,247,247)] gap-4  shadow-black/20 ">
      <Sidebar />
      <main className=" dashboard overflow-y-auto  shadow-black/20 ">
        <div className=" bar h-16 flex flex-row  justify-between w-full  py-0  ">
          <div className=" flex  items-center w-3/5     py-2 px-4 gap-2 ">
            {/* <input
              type="text"
              className="px-5 py-1 w-full rounded-2xl "
              id="search"
              placeholder="Search any course"
            />
            <label htmlFor="search">
              <FaSearchengin
                className=""
                style={{
                  fontSize: "20px",
                  fontWeight: "900",
                }}
              />
            </label> */}
          </div>
          <div className="notifi flex items-center w-20 justify-center ">
            <div className="w-full text-2xl ">
               <Link to="/notifications">   <IoMdNotificationsOutline
                             style={{
                               fontSize: "25px",
                               fontWeight: "900",
                             }}/>
                             
                             
                             </Link>
            </div>
          </div>
        </div>
     
        <section className=" flex flex-col   justify-center items-center   ">
        <h3
          style={{
            fontSize: "30px",
            fontWeight: "700",
            color: "#000000",
          }}
        >
          My Profile
        </h3>
          <div className="flex flex-col  gap-6 p-10 shadow-2xl">
            
            <div className="flex gap-2 justify-center ">
            <img  className="rounded-[50%] w-40 h-40 border-2 border-spacing-1  "
                src={user?.file?.url}
                alt="Profile pic"
              />
          
            <div className="content gap-3 flex flex-col  max-w-[500px]  ">
                <div className="flex flex-col justify-between  text-left  max-w-[475px] gap-3  ">
                <h3 style={{
            fontSize: "25px",
            fontWeight: "700",
            color: "#000",
           
          }}>{user?.name}</h3>
          <p style={{
            fontSize: "15px",
            fontWeight: "600",
            color: "#000",
           
          }}>{user?.email}</p>
              <div>
                <p style={{
                  fontSize:"20px,",
                  letterSpacing:"0px",
                  fontWeight: "500",
                 
                }}>{user?.bio}</p>

               
              </div>
              <div className="flex gap-4 items-center">
                <button className="flex items-center gap-1">
                Edit <MdEdit/> 
                </button>
                
                <button className="flex items-center gap-1">
                  Change <CgProfile/></button>
                  <button className="flex items-center gap-1">
                  <IoIosInformationCircleOutline/>Joined {formattedDate}</button>
                  </div>





                  
                </div>
                
               <div className="text-left">
                      <h1   style={{
            fontSize: "30px",
            fontWeight: "700",
            color: "#000000",
            
          }}>Saved Courses</h1>
          
               </div>
         
            </div>
            </div>
            <div className="grid grid-cols-3 gap-8 p-2 w-full">
            {user && (
  user.FavouriteCourse?.length === 0 ? (
    <h1 style={{
      color: "#000000",
      justifyContent: "center",
      alignItems: "center",
    }}>No saved items</h1>
  ) : (
    user?.FavouriteCourse?.map((item:FavouriteCourse) => (
      <SavedItems key={item.id} item={item} />
    ))
  )
)}

        </div>
          </div>
          
      
        </section>
      </main>

      {/* <EditModal    isOpen={isModalOpen} onClose={closeModal}/> */}
    </div>
  );
};

export default Profile;

