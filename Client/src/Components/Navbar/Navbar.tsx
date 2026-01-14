import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../Actions/UserApi";
//@ts-ignore
const Navigation = ({isAuthenticated  }) => {





  const dispatch=useDispatch();
  const handleLogout=()=>{
    dispatch(logoutUser());
    // window.location.reload();

  }

    return (
      <nav className="container">
        <div className="logo flex items-center">
          <img src="/images/brand_logo.png" alt="" />
          <p   className="font-medium  text-2xl ">DevVerse✌️</p>
        </div>
        <ul>
          
        </ul>
        {isAuthenticated? <button onClick={handleLogout}>Logout</button>:<Link to="/login">  <button>Login</button></Link>} 
  
        </nav>
    );
  };
  
  export default Navigation;