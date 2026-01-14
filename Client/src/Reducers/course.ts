import { createReducer } from "@reduxjs/toolkit";
import { CourseStructure } from "../types/user";

const initialState:CourseStructure = {
    course:null,
    loading:false,
    error:null,
    specificCourse:null
};

export const courseReducer = createReducer(initialState, {
  getAllCoursesRequest: (state) => {
    state.loading = true;
  },
  getAllCoursesSuccess: (state, action) => {
    state.loading = false;
    state.course = action.payload;
    
  },
  getAllCoursesFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  getPdfDocumentsRequest: (state) => {
    state.loading = true;
  },
  getPdfDocumentsSuccess: (state, action) => {
    state.loading = false;
    state.course = action.payload;
  },
  getPdfDocumentsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },





  // updatePasswordRequest: (state) => {
  //   state.loading = true;
  // },
  // updatePasswordSuccess: (state, action) => {
  //   state.loading = false;
  //   state.message = action.payload;
  // },
  // updatePasswordFailure: (state, action) => {
  //   state.loading = false;
  //   state.error = action.payload;
  // },

  // deleteProfileRequest: (state) => {
  //   state.loading = true;
  // },
  // deleteProfileSuccess: (state, action) => {
  //   state.loading = false;
  //   state.message = action.payload;
  // },
  // deleteProfileFailure: (state, action) => {
  //   state.loading = false;
  //   state.error = action.payload;
  // },

  // forgotPasswordRequest: (state) => {
  //   state.loading = true;
  // },
  // forgotPasswordSuccess: (state, action) => {
  //   state.loading = false;
  //   state.message = action.payload;
  // },
  // forgotPasswordFailure: (state, action) => {
  //   state.loading = false;
  //   state.error = action.payload;
  // },

  // resetPasswordRequest: (state) => {
  //   state.loading = true;
  // },
  // resetPasswordSuccess: (state, action) => {
  //   state.loading = false;
  //   state.message = action.payload;
  // },
  // resetPasswordFailure: (state, action) => {
  //   state.loading = false;
  //   state.error = action.payload;
  // },

  // followUserRequest: (state) => {
  //   state.loading = true;
  // },
  // followUserSuccess: (state, action) => {
  //   state.loading = false;
  //   state.message = action.payload;
  // },
  // followUserFailure: (state, action) => {
  //   state.loading = false;
  //   state.error = action.payload;
  // },
  // clearErrors: (state) => {
  //   state.error = null;
  // },
  // clearMessage: (state) => {
  //   state.message = null;
  // },
});

// export const myPostsReducer = createReducer(initialState, {
//   myPostsRequest: (state) => {
//     state.loading = true;
//   },
//   myPostsSuccess: (state, action) => {
//     state.loading = false;
//     state.posts = action.payload;
//   },
//   myPostsFailure: (state, action) => {
//     state.loading = false;
//     state.error = action.payload;
//   },
//   clearErrors: (state) => {
//     state.error = null;
//   },
// });

// export const userPostsReducer = createReducer(initialState, {
//   userPostsRequest: (state) => {
//     state.loading = true;
//   },
//   userPostsSuccess: (state, action) => {
//     state.loading = false;
//     state.posts = action.payload;
//   },
//   userPostsFailure: (state, action) => {
//     state.loading = false;
//     state.error = action.payload;
//   },
//   clearErrors: (state) => {
//     state.error = null;
//   },
// });

export const MyReducer=createReducer(initialState,{
  getPdfDocumentsRequest: (state) => {
    state.loading = true;
  },
  getPdfDocumentsSuccess: (state, action) => {
    state.loading = false;
    state.specificCourse = action.payload;
  },
  getPdfDocumentsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

})
