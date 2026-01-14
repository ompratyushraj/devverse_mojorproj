import { configureStore, StateFromReducersMapObject } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/user";
import { courseReducer, MyReducer } from "./Reducers/course";

const rootReducer = {
  user: userReducer,
  course: courseReducer,
  myCourse: MyReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = StateFromReducersMapObject<typeof rootReducer>;

export default store;