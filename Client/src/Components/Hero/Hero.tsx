import  { useState } from "react";
import { FaDownload } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { RiRoadMapLine } from "react-icons/ri";
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/dist/query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Hero = () => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  //@ts-ignore
  const { isAuthenticated, error, user, message } = useSelector((state: RootState) => state.user
  );

  const handleSubmit = async () => {
    if (!email || !name) {
      toast.error("Please enter your email and name");
      return;
    }
    toast.success("Subscription reuest sent");
    setEmail("");
    setName("");
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />

      <div className="flex flex-col justify-center items-center  w-full mt-3 m-auto p-4 ">
        <div className=" m-2 gap-2   ">
          <div>
            <p className="font-extrabold  text-6xl text-center">
              Learn Build,Grow
            </p>
            <p className="font-extrabold text-6xl">
              and utilize your time with DevVerse.
            </p>
          </div>

          <div className="mt-3">
            <p className="text-center text-xl font-medium">
              DevVerse is a initiative that helps the student to get free access
              to the documents,{" "}
            </p>
            <p className="text-center font-medium">
              {" "}
              providing specific them roadmaps,and much more{" "}
            </p>
          </div>

          <div className=" flex justify-center items-center m-2 gap-2">
            <Link to="/Courses">
              {" "}
              <button>Get Started &gt;</button>
            </Link>
          </div>
          <div className="mt-5">
            <p className="font-extrabold  text-3xl text-center">
              Why DevVerse ?
            </p>
            <div className="flex  justify-center items-center  ">
              <div className="flex flex-col justify-center shadow-2xl items-center rounded-xl   p-5 gap-2 w-64 break-normal  whitespace-normal">
                <h1 className="text-xl font-semibold">Free</h1>
                <p>
                  With DevVerse you can access the pdfs in no time with free
                  plan, you can read,save and download.{" "}
                </p>
              </div>
              <div className="flex flex-col shadow-2xl justify-center items-center p-5 rounded-xl  m-2 gap-2 w-64 break-normal whitespace-normal">
                <h1 className="text-xl font-semibold">Speed </h1>
                <p>
                  You can learn and grow faster with DevVerse, you can download
                  the pdfs and save them to your device, you can read them on
                  your device.
                </p>
              </div>
              <div className="flex flex-col  shadow-2xl justify-center items-center rounded-xl  p-5 m-2 gap-2 w-64 break-normal whitespace-normal">
                <h1 className="text-xl  font-semibold">Get Roadmaps </h1>
                <p>
                  You can get the roadmaps of the course you are interested in
                  and also the resources you need to learn the course.
                </p>
              </div>
            </div>
          </div>

          <div className="form flex flex-col text-center gap-4">
            <p className="font-extrabold  text-3xl text-center">
              Subscribe to our newsletter
            </p>
            <p className="text-xl">
              We respect your inbox. No spam, promise ✌️
            </p>

            <div className=" flex flex-col gap-2 justify-center items-center">
              <form className="w-full space-x-7" action=" #">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="input w-64 p-1 rounded-xl"
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="input w-64 p-1 rounded-xl"
                />
                <button onClick={handleSubmit}>Subscribe</button>
              </form>
            </div>
          </div>

          <div className="mt-4">
            <p className="font-extrabold  text-3xl text-center">
              Features we provide
            </p>
            <div className="mt-3 flex justify-center items-center gap-2 ">
              <div className=" flex flex-col justify-center items-center p-7 bg-slate-200 rounded-lg ">
                <FaDownload className="text-2xl" />
                <p className="font-medium">Unlimted downldads</p>
              </div>
              <div className=" flex flex-col justify-center items-center gap-2  p-7 bg-slate-200 rounded-lg ">
                <FaEye className="text-2xl" />
                <p className="font-medium">Online access</p>
              </div>
              <div className=" flex flex-col justify-center items-center gap-2 p-7  bg-slate-200 rounded-lg ">
                <RiRoadMapLine className="text-2xl" />
                <p className="font-medium">Personalized roadmaps</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
