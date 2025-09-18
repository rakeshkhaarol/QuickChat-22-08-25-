//import area
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";  // ✅ correct import
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

//definetion area
const App = () => {
  //hooks area
  const { authUser } = useContext(AuthContext); // ✅ destructure

  //return statment
  return (
    <div className='bg-[url("./src/assets/bgimage.svg")] bg-contain min-h-screen'>
      <BrowserRouter>
        <Toaster position="top-right" /> {/* ✅ correct component */}
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;























// //import area
// import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
// import { Toaster } from "react-hot-toast";
// import Home from './pages/Home'
// import Login from './pages/Login'
// import Profile from './pages/Profile'
// import { useContext } from 'react'
// import { AuthContext } from '../context/AuthContext'


// //definetion area
// const App = ()=> {
// //hooks area
// const authUser = useContext(AuthContext)

// //function definetion area



// //return statment
//   return (
//     <div className='bg-[url("./src/assets/bgimage.svg")] bg-contain'>
//       <BrowserRouter>
//       <Toaster/>
//         <Routes>
//           <Route path='/' element={authUser? <Home />:<Navigate to={"/login"}/>}></Route>
//           <Route path='/login' element={!authUser?<Login />:<Navigate to={"/"}/>}></Route>
//           <Route path='/profile' element={authUser?<Profile />:<Navigate to={"/login"}/>}></Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   )
// }

// export default App
