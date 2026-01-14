import { useEffect, useState } from 'react'
import { addBio } from '../../Actions/UserApi'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { RootState } from '@reduxjs/toolkit/dist/query'
import { toast, Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'

export const Bio = () => {
  const navigation = useNavigate()
  const dispatch = useDispatch()
  const [bio, setBio] = useState<string>("")
  //@ts-ignore
  const { isAuthenticated, error, user, message } = useSelector((state: RootState) => state.user)

  const handleSubmit = async () => {
    if (!bio.trim()) {
      toast.error("Please enter your bio")
      return
    }
    await dispatch(addBio(bio))
    navigation("/Courses")
  }

  useEffect(() => {

    if (message) {
      toast.success(message)
    }

        if (isAuthenticated) {
       <Navigate to="/Courses" />
    }


    if (user) {
      toast.success("Login Successful")
    }

    if (error) {
      toast.error(error)
      dispatch({ type: "clearErrors" })
    }
  }, [dispatch, isAuthenticated, error, user, message])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300"
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white rounded-xl p-8 shadow-2xl w-full max-w-md">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 text-4xl font-extrabold text-center text-black"
        >
          Tell us about yourself
        </motion.h2>
        <motion.textarea
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full p-4 text-lg bg-gray-100 rounded-md outline-none placeholder-gray-400 text-black resize-none transition-all duration-300 focus:ring-2 focus:ring-gray-400"
          rows={6}
          placeholder="Enter your bio here..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-[90%] bg-black text-white text-center py-3 px-4 rounded-md font-semibold text-lg transition-all duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          onClick={handleSubmit}
        >
          Update Bio
        </motion.button>
      </div>
    </motion.div>
  )
}

