//1. import area
import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainar from '../components/ChatContainar'
import RightSidebar from '../components/RightSidebar'

//2. definetion area
function Home() {
    //2.1 hooks area
    const [selectedUser, setSelectedUser] = useState(false)


    //2.2 function definetion area



    //2.3 return statment
    return (
        <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
            <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-md 
                overflow-hidden h-[100%] grid grid-cols-2 relative
                 ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]'
                    : 'md-grid-cols-2'}`}>

                <Sidebar />
                <ChatContainar />
                <RightSidebar />
            </div>
        </div>
    )
}

//3. export area
export default Home