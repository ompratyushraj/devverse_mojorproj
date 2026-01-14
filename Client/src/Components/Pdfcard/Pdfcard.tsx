import { FaArrowCircleDown } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./Pdfcard.css";

//@ts-ignore
const Pdfcard = ({ item  }) => {
// interface url {
//   urlItem:string
// }
  // const navigate=useNavigate();


  // const sendPreview=(url)=>{

  //   navigate(`/Courses/preview/${url}`);


  // }


  const preSignedUrl=item?.documentArray?.imageUrl;


  // console.log(preSignedUrl,"this is preSignedUrl")
  const encodedUrl = encodeURIComponent(preSignedUrl);
  // console.log(encodedUrl,"this is encodedUrl")




  console.log("this is the item",item)
  return (
        item?.length==0?
        (<div className="w-full h-full flex flex-col justify-center items-center">
            <h1 className="text-center text-2xl font-bold">No pdf Found</h1>
        </div>):(
            <div className="card-containers">
                 <div className="cards">
                   <img
                   src={"https://static.thenounproject.com/png/3810268-200.png"}
                     alt=""
                   />
                   <div className="card-contentsa">
                     <h3
                       style={{
                         textAlign: "center",
                       }}
                     >
                       {item.title}
                     </h3>
                     <p>{item.description}</p>
                     <div className="m-2 flex  w-[100%]   items-center">
                       <Link to={`/Courses/preview/${encodedUrl}`}>
                       <button    >  Download
                       <FaArrowCircleDown />{" "}</button>
                       </Link>
                     </div>
                   </div>
                 </div>
               </div>
        )
  );
};

export default Pdfcard;
