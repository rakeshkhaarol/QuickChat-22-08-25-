import React, { useEffect, useRef } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { FormatMessageTime } from '../lib/Utils'

function ChatContainar({ selectedUser, setSelectedUser }) {
  const scrollEnd = useRef()

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [])
  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blue-lg'>
      {/* ---------header area ------------ */}
      <div className='flex items-center text-white gap-3 py-3 mx-4 border-b border-stone-500'>
        <img className='w-8 rounded-full' src={assets.profile_martin} alt='' />
        <p className='flex-1 text-lg text-white flex items-center gap-2'>
          martin johan
          <span className='w-2 h-2 bg-green-500 rounded-full'></span>
        </p>
        <img onClick={() => { setSelectedUser(null) }} src={assets.arrow_icon} alt='' className='md:hidden max-w-7' />
        <img src={assets.help_icon} className='max-md:hidden max-w-5' />
      </div>
      {/* -----chat area ------ */}
      <div className='flex flex-col items-center h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
        {
          messagesDummyData.map((msg, idx) => (
            <div key={idx} className={`flex items-end gap-2 justify-end ${msg.senderId !== '680f50aaf10f3cd28382ecf2' && 'flex-row-reverse'}`}>
              {
                msg.image ? (
                  <img src={msg.image} alt='' className='max-w-[230px] border border-gray-700 overflow-hidden mb-8' />
                ) : (
                  <p className={`p-2 max-w-[200px] md:text-sm font-light
                     rounded-lg mb-8 break-all bg-violet-500/30 
                     text-white ${msg.senderId === '680f50aaf10f3cd28382ecf2'
                      ? 'rounded-br-none' : 'rounded-bl-none'}`}>{msg.text}</p>
                )
              }
              <div className='text-center text-xs'>
                <img src={msg.senderId === '680f50aaf10f3cd28382ecf2' ? assets.avatar_icon : assets.profile_martin} alt='' className='w-5 rounded-full' />
                <p className='text-gray-500'>{FormatMessageTime(msg.createdAt)}</p>
              </div>

            </div>
          ))
        }
        <div ref={scrollEnd}></div>

      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
      <img src={assets.logo_icon} alt='' className="max-w-16" />
      <p className='text-white font-medium text-lg'>chat anytime anywhere</p>
    </div>
  )
}

export default ChatContainar