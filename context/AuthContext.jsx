// import area
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const AuthContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL
axios.defaults.baseURL = backendUrl;

export const AuthProvider = ({ children }) => {
  // hooks area
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = token;
    }
    checkAuth();
  }, []);

  // check user is authenticated...
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check");
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // login function
  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);
      if (data.success) {
        setAuthUser(data.userData);
        connectSocket(data.userData);
        axios.defaults.headers.common["token"] = data.token;
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // logout function
  const logout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setOnlineUser([]);
    axios.defaults.headers.common["token"] = null;
    toast.success("Logged Out Successfully");
    if (socket) socket.disconnect();
  };

  // profile update function
  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put("/api/auth/update_profile", body);
      if (data.success) {
        setAuthUser(data.user);
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // connect socket function
  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;

    const newSocket = io(backendUrl, {
      query: { userId: userData._id },
    });

    newSocket.connect();
    setSocket(newSocket);

    newSocket.on("getOnlineUser", (userIds) => {
      setOnlineUser(userIds);
    });
  };

  // ✅ ab value ko last me define kiya
  const value = {
    axios,
    authUser,
    onlineUser,
    socket,
    login,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
 


//import area
// import { createContext, useEffect, useState } from "react";
// import axios from 'axios'
// import toast from "react-hot-toast";
// import { io } from "socket.io-client";

// export const AuthContext = createContext();

// const backendUrl = import.meta.env.BACKEND_URL
// axios.defaults.baseURL = backendUrl
// //definetion area
// export const AuthProvider = ({ children }) => {
//     //hooks area
//     const [token, setToken] = useState(localStorage.getItem("token"));
//     const [authUser, setAuthUser] = useState(null);
//     const [onlineUser, setOnlineUser] = useState([]);
//     const [socket, setSocket] = useState(null)
 

//     useEffect(() => {
//         if (token) {
//             axios.defaults.headers.common["token"] = token;
//         }
//         chackAuth();
//     }, [])

//     //function definetion area
//     //chack user is authantiketed...
//     const chackAuth = async () => {
//         try {
//             const { data } = await axios.get("/api/auth/check");
//             if (data.success) {
//                 setAuthUser(data.user)
//                 connectSocket(data.user)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     //login function to heandal the authantication user and socket connection
//     const login = async (state, credentials) => {
//         try {
//             const { data } = await axios.post(`/api/auth/${state}`, credentials);
//             if (data.success) {
//                 setAuthUser(data.userData);
//                 connectSocket(data.userData);
//                 axios.defaults.headers.common["token"] = data.token;
//                 setToken(data.token);
//                 localStorage.setItem("token", data.token)
//                 toast.success(data.message)
//             } else {

//                 toast.error(data.message)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     //logout function 
//     const logout = async () => {
//         localStorage.removeItem("token");
//         setToken(null)
//         setAuthUser(null)
//         setOnlineUser([])
//         axios.defaults.headers.common["token"] = null
//         toast.success("Logged Out Successfully");
//         socket.disconnect();
//     }

//     //profile update funcgion to update the profile

//     const updateProfile = async()=>{
//         try {
//             const{data} = await axios.put("/api/auth/profile-update",body);
//             if(data.success){
//                 setAuthUser(data.user)
//                 toast.success("Profile Updated Successfully")
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//        const value = {
//         axios,
//         authUser,
//         onlineUser,
//         socket,
//         login,
//         logout,
//         updateProfile
//     }
//     //connect socket function to hendal socket connection and users update
//     const connectSocket = (userdata) => {
//         if (!userdata || socket?.connected) return;
//         const newSocket = io(backendUrl, {
//             query: {
//                 userId: userData._id
//             }
//         });
//         newSocket.connect();
//         setSocket(newSocket);

//         newSocket.on("getOnlineUser", (userIds) => {
//             setOnlineUser(userIds)
//         })
//     }

//     //return statment
//     return (
//         <AuthContext.Provider value={value}>
//             {
//                 children
//             }
//         </AuthContext.Provider>
//     )

// }