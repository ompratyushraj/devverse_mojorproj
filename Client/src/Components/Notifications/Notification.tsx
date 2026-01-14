import { IoMdNotificationsOutline } from 'react-icons/io'
import Sidebar from '../Sidebar/Sidebar'
import { Link } from 'react-router-dom'



const Notification = () => {
  return (
    <div className="admin-container grid grid-cols-[1fr_4fr] h-screen bg-[rgba(247,247,247)] gap-4  shadow-black/20 ">
    <Sidebar />
    <main className=" dashboard overflow-y-auto  shadow-black/20 ">
      <div className=" bar h-16 flex flex-row  justify-between w-full  py-0  ">
        <div className=" flex  items-center w-3/5     py-2 px-4 gap-2 ">
          
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
      <h3 style={
        {
          fontSize:"20px",
          fontWeight:"600",
          color:"black",
          textAlign:"center",
        
        }
      }>Notifications</h3>
      <section className="widget-container flex   justify-center items-center  ">
               
      <div   className='flex flex-col  justify-center items-center p-10 shadow-2xl gap-3'>

 {<IoMdNotificationsOutline    style={{
        fontSize:"55px",
        fontWeight:"600",
        color:"black",
        textAlign:"center",

      }}/>} 

      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-black dark:text-black">No Notifications over  there </h2>

            <p className='text-black font-medium'    style={
            {
              fontSize:"20px",
              color:"black",
              textAlign:"center",
            
            }}>You will have the new     notifications when we upload the pdfs.
              
            </p>
            <p className='font-medium'>We will get u soon!</p>
         </div>
       
      </section>
    </main>
    </div>
  )
}

export default Notification
