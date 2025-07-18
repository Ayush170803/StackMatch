import Navbar from "./component/Navbar"
import Body from "./component/Body"
import Footer from "./component/Footer"
import Login from "./component/Login";
import Profile from "./component/Profile";
import appStore from "./utils/appStore";
import { BrowserRouter, Routes , Route} from "react-router-dom";
import {Provider} from "react-redux";
import Feed from "./component/Feed";
import Requests from "./component/Requests";
import Connections from "./component/Connections";
import Error from "./component/Error";
import Chat from "./component/Chat";


function App() {
  return (
    <div id='containerdiv'>
      <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
           <Route path='/' element={<Body/>}>

              <Route path='/' element={<Feed/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/profile' element={<Profile/>}></Route>
              <Route path='/requests' element={<Requests/>}></Route>
              <Route path='/connections' element={<Connections/>}></Route>
              <Route path="/chat/:friendId" element={<Chat />} />
              <Route path="*" element={<Error />} ></Route>

           </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
  </div>
  )
}

export default App
