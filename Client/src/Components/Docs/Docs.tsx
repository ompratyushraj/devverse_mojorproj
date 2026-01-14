import { useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { IoMdNotificationsOutline } from 'react-icons/io'
import Pdfcard from '../Pdfcard/Pdfcard'
import { useParams } from 'react-router-dom'
import { getSpecificCourse } from '../../Actions/CourseApi'
import {  useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import Loader from '../Loader/Loader'
const Docs:React.FC = () => {

// interface type{
//   id:string

// }
  const params = useParams();
  const id=params.id!;

    // console.log(course,"is this course of now recent time ")


  const dispatch = useDispatch();
//   interface pdfType{
//     ImageName?:string
//     imageUrl?:string
// }
//   interface PdfCardProps{
    
//     documentArray:pdfType
// }
  const {specificCourse,loading} = useSelector((state:RootState) => state.myCourse);

  console.log(specificCourse,"this is main items of specific Course")
  // console.log(ans,"this is main items of specific Course")



  async function  fetchData  (){
      await dispatch(getSpecificCourse(id));




}



  useEffect(() => {

    fetchData();

    // toast.success(`${specificCourse?.title} fetched successfully`);
    dispatch({ type: 'clearMessage' });

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
            <FaSearchengin className="" style={
              {
                fontSize:"20px",
                fontWeight:"900",
              }
            }/>
          </label> */}
        </div>
        <div className="notifi flex items-center w-20 justify-center   ">
          <div className="w-full text-2xl ">
            <IoMdNotificationsOutline style={
              {
                fontSize:"25px",
                fontWeight:"900",
              }
            } />
          </div>
        </div>
      </div>
      <h3 style={
        {
          fontSize:"20px",
          fontWeight:"600",
          color:"#2e2e2e",
          textAlign:"center",
        
        }
      }>{specificCourse?.title}</h3>

      <p  style={{
        fontSize:"20px",
        fontWeight:"500",
        color:"black",
      }}>About</p>
      <p  >{specificCourse?.description}</p>
      <section className="widget-container flex   justify-center items-center  ">
               

        <div className="grid grid-cols-3 gap-8 p-2 w-full shadow-lg">
            {specificCourse?.pdfs?.map((item)=>(
              <Pdfcard item={item}/>
            ))}
        </div>
      </section>
    </main>
  </div>
  )
}

export default Docs