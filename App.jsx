import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
// import EditProfile from "./components/EditProfile";
import { Provider } from "react-redux";
import { store } from "./utils/appStore";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat from "./components/Chat";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/" >
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/connections" element={<Connections />}></Route>
              <Route path="/requests" element={<Requests />}></Route>
              <Route path="/chat/:targetUserId" element={<Chat />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App;