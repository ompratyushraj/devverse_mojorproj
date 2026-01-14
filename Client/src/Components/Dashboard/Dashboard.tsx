import { RootState } from "@reduxjs/toolkit/dist/query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSearchengin } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCourses } from "../../Actions/CourseApi";
import { Course } from "../../types/user";
import Cards from "../Card/Cards";
import Loader from "../Loader/Loader";
import Sidebar from "../Sidebar/Sidebar";
const Dashboard = () => {

  //@ts-ignore
  const { user } = useSelector((state: RootState) => state.user);

  const [keyword, setKeyword] = useState("");
  const [category] = useState("");
  // console.log(user,"is important")

  // interface WidgetItemProps {
  //   heading: string;
  //   percent: number;
  //   color: string;
  //   amount?: number | false;
  // }
  //@ts-ignore
  const { course, loading, error,message } = useSelector(  (state: RootState) => state.course);

  console.log(message, "this is message")


     const truncate=(str:string)=>{
      if(str.length>60){
        return str.slice(0,20)+"..."
      }
      return str
  }
  
  // console.log(course,"is this course")
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCourses(category, keyword));
    toast.success(" courses fetched ")


    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);

      dispatch({ type: 'clearMessage' });
    }
  }, [category, keyword, dispatch,message,toast, error]);


  if(loading){
    return <Loader/>
  }

  return (



    <div className="admin-container grid grid-cols-[1fr_4fr] h-screen bg-[rgba(247,247,247)] gap-4  shadow-black/20 ">
      <Sidebar />
      <main className=" dashboard overflow-y-auto  shadow-black/20 ">
        <div className=" bar h-16 flex flex-row  justify-between w-full  py-4 ">
          <div className=" flex  items-center w-2/5   py-2 px-4 gap-2 ">
            <input         
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
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
            </label>
          </div>
          <div className="notifi flex items-center w-20 justify-center   ">
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
        <h1
          style={{
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Hello {user?.name}
        </h1>
        <section className="widget-container flex   justify-center items-center  ">
          <div className="grid grid-cols-3 gap-8 p-2 w-full shadow-lg">
            {  course?.length>0 &&  course?.map((item: Course) => (
              <Cards
             
                title={item.title}
                description={truncate(item?.description)}
              id={item?._id}

              file={typeof item.file === 'string' ? item.file : item.file.url}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};


export default Dashboard;
