import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import feedReducer from './feedSlice'
import connectionReducer from "./connectionSlice"
import requestReducer from "./requestSlice"


const appStore = configureStore({
     reducer:{
      user:userReducer,
      feed:feedReducer,
      Requests:requestReducer,
      Connections:connectionReducer,
     }
})
export default appStore;