//import area
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'


//definetion area
const App = ()=> {
//hooks area


//function definetion area



//return statment
  return (
    <div className='bg-[url("./src/assets/bgimage.svg")] bg-contain'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
