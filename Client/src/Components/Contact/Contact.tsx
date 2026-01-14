import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { IoMdNotificationsOutline } from 'react-icons/io'
import toast from 'react-hot-toast'

const Contact = () => {

const [email, setEmail] = useState("");
const [subject, setSubject] = useState("");
const [message, setMessage] = useState("");

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!email || !subject || !message) {
    toast.error("Please fill all the fields");
    return;
  }
  // console.log(email,subject,message);
  toast.success("Message Sent Successfully");
  setEmail("");
  setSubject("");
  setMessage("");

  
};


  return (
    <div>
    <div className="admin-container grid grid-cols-[1fr_4fr] h-screen bg-[rgba(247,247,247)] gap-4 shadow-black/20">
      <Sidebar />
      <main className="dashboard overflow-y-auto shadow-black/20">
        <div className="bar h-16 flex flex-row justify-between w-full py-0">
          <div className="flex items-center w-3/5 py-2 px-4 gap-2"></div>
          <div className="notifi flex items-center w-20 justify-center">
            <div className="w-full text-2xl">
              <IoMdNotificationsOutline
                style={{
                  fontSize: '25px',
                  fontWeight: '900',
                }}
              />
            </div>
          </div>
        </div>

        <section className="flex flex-col justify-center items-center">
          <section className="bg-white dark:bg-gray-200 rounded-xl text-black">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-black dark:text-black">
                Contact Us
              </h2>
              <p className="mb-8 lg:mb-16 font-medium text-center text-black dark:text-black sm:text-xl">
                Got a technical issue? Want to send feedback about a beta feature? Need details about our Business
                plan? Let us know.
              </p>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-bold text-gray-900 dark:text-black"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-sm font-bold text-gray-900 dark:text-black"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    id="subject"
                    className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-200 outline-none dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                    placeholder="Let us know how we can help you"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Your message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    id="message"
                    rows={6}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Leave a comment..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Send message
                </button>
              </form>
            </div>
          </section>
        </section>
      </main>
    </div>
  </div>
  )
}

export default Contact