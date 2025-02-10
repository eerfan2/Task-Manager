import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Signup = () => {
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      history('/');
    }
  }, [isLoggedIn, history]); // Gunakan useEffect untuk redirect

  const [Data, setData] = useState({ username: '', email: '', password: '' });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Data.username === '' || Data.email === '' || Data.password === '') {
        alert('Semua bidang harus diisi');
      } else {
        const response = await axios.post(
          'https://task-manager-backend-nine-phi.vercel.app/api/v1/sign-in',
          Data
        );
        setData({ username: '', email: '', password: '' });
        alert(response.data.message);
        history('/login');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Terjadi kesalahan');
    }
  };

  return (
    <div className='h-screen flex items-center justify-center px-4'>
      <div className='p-6 max-w-md w-full rounded bg-gray-800 shadow-lg'>
        <h2 className='text-2xl font-semibold text-white mb-4'>Daftar</h2>
        <input
          type='text'
          placeholder='Username'
          className='bg-gray-700 px-3 py-2 my-2 w-full rounded text-white'
          name='username'
          value={Data.username}
          onChange={change}
        />
        <input
          type='email'
          placeholder='Email'
          className='bg-gray-700 px-3 py-2 my-2 w-full rounded text-white'
          name='email'
          value={Data.email}
          onChange={change}
        />
        <input
          type='password'
          placeholder='Password'
          className='bg-gray-700 px-3 py-2 my-2 w-full rounded text-white'
          name='password'
          value={Data.password}
          onChange={change}
        />

        <div className='w-full flex items-center justify-between mt-4'>
          <button
            className='bg-blue-500 text-white text-lg font-semibold px-4 py-2 rounded w-1/3 hover:bg-blue-600 transition'
            onClick={submit}
          >
            Daftar
          </button>
          <Link to='/login' className='text-gray-400 hover:text-gray-200 text-sm'>
            Sudah punya akun? Login disini
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
