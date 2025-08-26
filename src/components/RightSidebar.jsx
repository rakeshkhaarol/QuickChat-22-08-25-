import React from 'react'
import assets, { imagesDummyData } from '../assets/assets'

function RightSidebar({ selectedUser }) {
  return selectedUser && (
    <div className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${selectedUser ? "max-md:hidden" : ""}`}>
      <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt=""
          className='w-20 aspect-[1/1] rounded-full' />
        <h1 className='px-10 text-xl font-medium flex items-center gap-2'>
          <p className='w-2 h-2 rounded-full bg-green-500'></p>
          {selectedUser.fullName}
        </h1>
        <p className='px-10 mx-auto'>
          {selectedUser.bio}
        </p>
      </div>

      <hr className='my-4 border-[#ffffff50]' />

      <div className='px-5 text-xs'>
        <p>media</p>
        <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-2 opcity-80'>
          {
            imagesDummyData.map((url, idx) => (
              <div key={idx} onClick={() => { window.open(url) }} className='cursor-pointer rounded'>
                <img src={url} className='rounded-md h-full' alt="" />

              </div>
            ))
          }
        </div>
      </div>

      <button className='bottom-5 absolute left-1/2 transform -translate-x-1/2 
      bg-gradient-to-r from-purple-400 to-violet-600 text-sm
       font-light py-2 rounded-full cursor-pointer px-20
      text-white border-none'>
        Logout
      </button>
    </div>
  )
}

export default RightSidebar