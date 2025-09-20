import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body";
import Login from "./components/Login";
import Feed from "./components/Feed";
import { Provider } from "react-redux";
import { store } from "./utils/appStore";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/" >
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App;