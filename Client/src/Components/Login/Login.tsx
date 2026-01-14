 import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { googleLoginUser, loginUser } from "../../Actions/UserApi";
import { RootState } from "@reduxjs/toolkit/dist/query";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import Loader from "../Loader/Loader";






const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = async (credentialResponse: any) => {
    const idToken = credentialResponse.credential; // ID token is here
    // console.log("ID Token:", idToken);
    await dispatch(googleLoginUser(idToken));
    if(isAuthenticated){
      navigate("/Courses");
      toast.success(message) 

    }
    if(!isAuthenticated){
      toast.error("Invalid Credentials")
    }



}

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [credentials, setCredentials] = useState<string | null>(null);
  //@ts-ignore
  const {isAuthenticated, loading,error, user,message } = useSelector((state: RootState) => state.user);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    if(!email || !password){
      toast.error("Please enter your email and password")
      return
    }
    e.preventDefault();
    dispatch(loginUser(email, password));
    if(isAuthenticated){
      navigate("/Courses");
      toast.success(message) 

    }
    if(!isAuthenticated){
      toast.error("Invalid Credentials")
    }
    
  };
  useEffect(() => {
    if(isAuthenticated){
      <Navigate to={"/Courses"} />
     }

    //  if(message){
    //   toast.success(message);
    //  }

    if (user) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);

      dispatch({ type: "clearErrors" });
    }
  }, [dispatch,isAuthenticated, error, toast]);

  if(loading){
    return <Loader/>
  }

// console.log(credentials)
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login your account{" "}
              </h1>
              <form   onSubmit={submitHandler} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="enter your email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        // required="  "
                      />  
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                 
                </div>
                <button
                  type="submit"
                  className="w-[90%] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm  py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login
                </button>
                
           <GoogleLogin
        onSuccess={(credentialResponse) => handleGoogleLogin(credentialResponse)}
        onError={() => {
          console.error("Google Login Failed");
        }}
      />

                
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Dont have an account ?{" "}
                  <a
                    href="/register"
                    className="font-lg text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;