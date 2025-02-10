import React from 'react';
import { CiHeart } from "react-icons/ci";
import { FaEdit, FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import axios from 'axios';

const Cards = ({ home, setInputDiv, data, setUpdatedData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleCompleteTask = async (id) => {
    try {
      await axios.put(
        `https://task-manager-backend-nine-phi.vercel.app/api/v2/update-complete-task/${id}`,
        {},
        { headers }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleImportant = async (id) => {
    try {
      const response = await axios.put(
        `https://task-manager-backend-nine-phi.vercel.app/api/v2/update-imp-task/${id}`,
        {},
        { headers }
      );
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id, title, desc) => {
    setInputDiv("fixed");
    setUpdatedData({ id: id, title: title, desc: desc });
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `https://task-manager-backend-nine-phi.vercel.app/api/v2/delete-task/${id}`,
        { headers }
      );
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
      {data &&
        data.map((items, i) => (
          <div key={i} className='flex flex-col justify-between bg-gray-800 rounded-lg p-4'>
            <div>
              <h3 className='text-xl font-semibold text-white'>{items.title}</h3>
              <p className='text-gray-300 my-2'>{items.desc}</p>
            </div>
            <div className='mt-4 w-full flex flex-wrap items-center justify-between gap-2'>
              <button
                className={`${items.complete ? "bg-green-700" : "bg-red-400"} p-2 rounded w-full sm:w-5/12`}
                onClick={() => handleCompleteTask(items._id)}
              >
                {items.complete ? "Selesai" : "Belum Selesai"}
              </button>
              <div className='flex items-center gap-4 text-white text-2xl'>
                {home !== "false" && (
                  <button onClick={() => deleteTask(items._id)}>
                    <MdDelete />
                  </button>
                )}
                <button onClick={() => handleImportant(items._id)}>
                  {items.important ? (
                    <FaHeart className='text-red-500' />
                  ) : (
                    <CiHeart />
                  )}
                </button>
                {home !== "false" && (
                  <button onClick={() => handleUpdate(items._id, items.title, items.desc)}>
                    <FaEdit />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      {home === "true" && (
        <button
          className='flex flex-col justify-center items-center bg-gray-800 rounded-lg p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300'
          onClick={() => setInputDiv("fixed")}
        >
          <IoAddCircle className='text-5xl' />
          <h2 className='text-2xl mt-4'>Tambahkan Tugas</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
