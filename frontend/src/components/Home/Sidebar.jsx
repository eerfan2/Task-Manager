import React, { useEffect, useState } from 'react';
import { MdNotes } from "react-icons/md";
import { MdLabelOutline } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { TbBooksOff } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const data = [
    {
      title: "Semua Tugas",
      icon: <MdNotes />,
      link: "/",
    },
    {
      title: "Tugas Favorit",
      icon: <MdLabelOutline />,
      link: "/importantTasks",
    },
    {
      title: "Tugas Selesai",
      icon: <IoCheckmarkDoneSharp />,
      link: "completedTasks",
    },
    {
      title: "Tugas Belum Selesai",
      icon: <TbBooksOff />,
      link: "incompletedTasks",
    }
  ];

  const [Data, setData] = useState();

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    dispatch(authActions.logout);
    history("/login");
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://task-manager-backend-nine-phi.vercel.app/api/v2/get-all-tasks",
        { headers }
      );
      setData(response.data.data);
    };
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch();
    }
  });

  return (
    <div className='flex flex-col gap-4 md:w-1/4 lg:w-1/5 border border-gray-500 rounded-xl p-4'>
      {Data && (
        <div className='mb-4'>
          <h2 className='text-xl font-semibold'>{Data.username}</h2>
          <h4 className='mb-1 text-gray-400'>{Data.email}</h4>
          <hr />
        </div>
      )}

      <div className='flex flex-col gap-2'>
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className='my-2 flex items-center hover:bg-gray-500 p-2 rounded transition-all duration-300 text-sm md:text-base'>
            {items.icon}&nbsp; {items.title}
          </Link>
        ))}
      </div>

      <div className='mt-auto'>
        <button className='bg-gray-600 w-full p-2 rounded text-sm md:text-base' onClick={logout}>Keluar</button>
      </div>
    </div>
  );
};

export default Sidebar;
