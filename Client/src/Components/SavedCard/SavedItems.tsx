import { FaLink } from "react-icons/fa6";
import { Link } from "react-router-dom";

import "./Saved.css";
//@ts-ignore
const SavedItems = ({ item }) => {


  console.log(item)
  return (
  item.length==0? (
    <div>
          <h1 style={{
            fontSize:"30px",
            fontWeight:"bold",
          }}>No Favourite Courses</h1>
    </div>

  ):(  <div className="card-container">
      <div className="card">
        <img
        src={item?.poster}
          alt=""
        />
        <div className="card-content ">
          <h3
            style={{
              textAlign: "center",
            }}
          >
            {item.title}
          </h3>
          {/* <p>{item.description}</p> */}
          <div className=" w-full flex flex-col justify-center   items-center gap-2">
            <Link className="w-[80%]"  to={`/Courses/docsarray/${item.course}`}>
            <button>
              Visit   <FaLink/>
            </button>
            </Link>
          
          </div>
        </div>
      </div>
    </div>)
  );
};

export default SavedItems;
