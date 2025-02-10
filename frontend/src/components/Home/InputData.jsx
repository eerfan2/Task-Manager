import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";

const InputData = ({ InputDiv, setInputDiv, UpdatedData, setUpdatedData }) => {
  const [Data, setData] = useState({ title: "", desc: "" });

  useEffect(() => {
    setData({ title: UpdatedData.title, desc: UpdatedData.desc });
  }, [UpdatedData]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submitData = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are required");
    } else {
      await axios.post(
        "https://task-manager-backend-nine-phi.vercel.app/api/v2/create-task",
        Data,
        { headers }
      );
      setData({ title: "", desc: "" });
      setInputDiv("hidden");
    }
  };

  const UpdateTask = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are required");
    } else {
      await axios.put(
        `https://task-manager-backend-nine-phi.vercel.app/api/v2/update-task/${UpdatedData.id}`,
        Data,
        { headers }
      );
      setUpdatedData({
        id: "",
        title: "",
        desc: "",
      });
      setData({ title: "", desc: "" });
      setInputDiv("hidden");
    }
  };

  return (
    <>
      <div className={`${InputDiv} fixed top-0 left-0 bg-gray-800 opacity-80 h-screen w-full z-50`} />
      <div className={`${InputDiv} fixed top-0 left-0 flex items-center justify-center h-screen w-full z-50`}>
        <div className='max-w-md w-full bg-gray-900 p-6 rounded-lg'>
          <div className='flex justify-end mb-4'>
            <button
              className='text-2xl text-white'
              onClick={() => {
                setInputDiv("hidden");
                setData({
                  title: "",
                  desc: "",
                });
                setUpdatedData({
                  id: "",
                  title: "",
                  desc: "",
                });
              }}
            >
              <RxCross2 />
            </button>
          </div>

          <input
            type="text"
            placeholder='Judul Tugas'
            name='title'
            className='px-4 py-2 rounded-lg w-full bg-gray-700 mb-4 text-white'
            value={Data.title}
            onChange={change}
          />

          <textarea
            name="desc"
            cols="30"
            rows="5"
            placeholder='Keterangan'
            className='px-4 py-2 rounded-lg w-full bg-gray-700 mb-4 text-white'
            value={Data.desc}
            onChange={change}
          ></textarea>

          {UpdatedData.id === "" ? (
            <button
              className='w-full px-4 py-2 bg-blue-500 rounded-lg text-white text-lg font-semibold'
              onClick={submitData}
            >
              Buat
            </button>
          ) : (
            <button
              className='w-full px-4 py-2 bg-blue-500 rounded-lg text-white text-lg font-semibold'
              onClick={UpdateTask}
            >
              Perbarui
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputData;
