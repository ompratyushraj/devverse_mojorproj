import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

export const getSpecificCourse = (id:string) => async (dispatch:Dispatch) => {
  try {
    dispatch({
      type: "getPdfDocumentsRequest",
    });

    const { data } = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/course/getPdf/${id}`, {
      withCredentials: true, 
    });

    dispatch({
      type: "getPdfDocumentsSuccess",
      payload: data.course,
    });
  } catch (error: any) {
    dispatch({
      type: "getPdfDocumentsFailure",
      payload: error.response ? error.response?.data?.message : error.message,
    });
  }
};

export const getAllCourses =(category = '', keyword = '')  => async (dispatch:Dispatch) => {
  try {
    dispatch({
      type: "getAllCoursesRequest",
    });

    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/course/allCourses?keyword=${keyword}&category=${category}`,
     
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Add this line for authentication
      }
    );

    dispatch({
      type: "getAllCoursesSuccess",
      payload: data.message,
    });
  } catch (error:any) {
    dispatch({
      type: "addCommentFailure",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};


// export const createNewPost = formdata => async dispatch => {
//   try {
//     dispatch({
//       type: "newPostRequest",
//     });

//     const { data } = await axios.post(
//       `${process.env.REACT_APP_SERVER}/api/v1/post/upload`,
//       formdata,
//       {
//         headers: {
//           'Content-type': 'multipart/form-data',
//         },
  
//         withCredentials: true,
//       });
    
//     dispatch({
//       type: "newPostSuccess",
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: "newPostFailure",
//       payload: error.response.data.message,
//     });
//   }
// };

// export const updatePost = (caption, id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "updateCaptionRequest",
//     });

//     const { data } = await axios.put(
//       `/${process.env.REACT_APP_SERVER}api/v1/post/${id}`,
//       {
//         caption,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     dispatch({
//       type: "updateCaptionSuccess",
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: "updateCaptionFailure",
//       payload: error.response.data.message,
//     });
//   }
// };

