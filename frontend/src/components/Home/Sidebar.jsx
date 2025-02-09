import React, { useEffect, useState } from 'react'
import { MdNotes } from "react-icons/md";
import { MdLabelOutline } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { TbBooksOff } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';

const Sidebar = () => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const data = [
    {
      title:"Semua Tugas",
      icon: <MdNotes />,
      link: "/",
    },
    {
      title:"Tugas Favorit",
      icon: <MdLabelOutline />,
      link: "/importantTasks",
    },
    {
      title:"Tugas Selesai",
      icon: <IoCheckmarkDoneSharp />,
      link: "completedTasks",
    },
    {
      title:"Tugas Belum Selesai",
      icon: <TbBooksOff />,
      link: "incompletedTasks",
    }
  ]
  const [Data, setData] = useState()
  const logout = () => {
    dispatch(authActions.logout())
    localStorage.clear( "id" )
    localStorage.clear( "token" )
    dispatch(authActions.logout)
    history("/login")
  }

  const headers = { 
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v2/get-all-tasks", 
        { headers }
      )
      setData(response.data.data)
    }
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch()
    }
  })
  
  return (
    <>
      {Data && (
        <div>
          <h2 className='text-xl font-semibold'>{Data.username}</h2>
          <h4 className='mb-1 text-gray-400'>{Data.email}</h4>
        <hr />
    </div>
      )}
      <div>
          {data.map((items, i) => (
            <Link 
              to={items.link} 
              key={i}
              className='my-2 flex items-center hover:bg-gray-500 p-2 rounderd transition-all duration-300'>
              {items.icon}&nbsp; {items.title}
            </Link>
          ))}
      </div>
      <div>
        <button className='bg-gray-600 w-full p-2 rounded' onClick={ logout }>Keluar</button>
        </div>
    </>
  )
}

export default Sidebar