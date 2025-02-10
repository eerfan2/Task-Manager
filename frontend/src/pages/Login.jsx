import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authActions } from '../store/auth';
import { useSelector, useDispatch } from 'react-redux';

const Login = () => {
  const [Data, setData] = useState({ username: '', password: '' });
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn) {
    history('/');
  }

  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Data.username === '' || Data.password === '') {
        alert('All fields are required');
      } else {
        const response = await axios.post(
          'https://task-manager-backend-nine-phi.vercel.app/api/v1/log-in',
          Data
        );
        setData({ username: '', password: '' });
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('token', response.data.token);
        dispatch(authActions.login());
        history('/');
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className='h-screen flex items-center justify-center p-4'>
      <div className='p-6 w-full sm:w-4/6 md:w-3/6 lg:w-2/6 max-w-md rounded bg-gray-800'>
        <div className='text-2xl font-semibold text-white text-center mb-4'>Login</div>

        <input
          type='text'
          placeholder='Username'
          className='bg-gray-700 px-4 py-2 my-2 w-full rounded text-white'
          name='username'
          value={Data.username}
          onChange={change}
        />

        <input
          type='password'
          placeholder='Password'
          className='bg-gray-700 px-4 py-2 my-2 w-full rounded text-white'
          name='password'
          value={Data.password}
          onChange={change}
        />

        <div className='w-full flex flex-col sm:flex-row items-center justify-between mt-4'>
          <button
            className='bg-blue-500 w-full sm:w-auto text-lg font-semibold text-white px-6 py-2 rounded hover:bg-blue-600 transition'
            onClick={submit}
          >
            Login
          </button>
          <Link to='/signup' className='text-gray-400 hover:text-gray-200 mt-3 sm:mt-0'>
            Tidak punya akun? Daftar di sini
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
