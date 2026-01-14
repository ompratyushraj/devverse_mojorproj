import { RootState } from "@reduxjs/toolkit/dist/query";
import toast from "react-hot-toast";
import { CiBookmark } from "react-icons/ci";
import { MdRemoveRedEye } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SaveUserToProfile } from "../../Actions/UserApi";
import { CardsProps } from "../../types/user";
import "./Card.css";




const Cards: React.FC<CardsProps> = ({ title, description, id, file }) => {

  const dispatch=useDispatch();

  //@ts-ignore
    const {error,message} = useSelector((state:RootState) => state.user);

  const handleClick=async()=>{
       await  dispatch(SaveUserToProfile(id));
       if(message){
        toast.success(message)
      }
      if(error){
        toast.error(error)
      }
  
  }


  

  return (
    <div className="card-containers">
      <div className="cards">
        <img
        src={`${file}`}
          alt=""
        />
        <div className="card-contents">
          <h3
            style={{
              textAlign: "center",
            }}
          >
            {title}
          </h3>
          <p>{description}</p>
          <div className="m-2 flex flex-row  justify-between items-center gap-2">
            <Link to={`/Courses/docsarray/${id}`}>
            <button>  View
            <MdRemoveRedEye />{" "}</button>
            </Link>
            <Link  to={"/Courses"}  >
            <button    onClick={handleClick}>
            {" "}
            Save <CiBookmark />{" "}
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
