import React, { useState, useEffect } from 'react';
import Cards from '../components/Home/Cards';
import { IoAddCircle } from 'react-icons/io5';
import InputData from '../components/Home/InputData';
import axios from 'axios';

const AllTasks = () => {
    const [InputDiv, setInputDiv] = useState('hidden');
    const [Data, setData] = useState();
    const [UpdatedData, setUpdatedData] = useState({
        id: '',
        title: '',
        desc: '',
    });

    const headers = {
        id: localStorage.getItem('id'),
        authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(
                    'https://task-manager-backend-nine-phi.vercel.app/api/v2/get-all-tasks',
                    { headers }
                );
                setData(response.data.data);
            } catch (error) {
                console.log('Error fetching tasks:', error);
            }
        };

        if (localStorage.getItem('id') && localStorage.getItem('token')) {
            fetch();
        }
    }); // Tambahkan dependency array agar tidak looping terus

    return (
        <>
            <div className='max-w-screen-lg mx-auto px-4'>
                <div className='w-full flex justify-end py-2'>
                    <button
                        className='p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300'
                        onClick={() => setInputDiv('fixed')}
                    >
                        <IoAddCircle className='text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300' />
                    </button>
                </div>
                
                {Data && (
                    <Cards
                        home={'true'}
                        setInputDiv={setInputDiv}
                        data={Data.tasks}
                        setUpdatedData={setUpdatedData}
                        UpdatedData={UpdatedData}
                    />
                )}
            </div>

            <InputData
                InputDiv={InputDiv}
                setInputDiv={setInputDiv}
                UpdatedData={UpdatedData}
                setUpdatedData={setUpdatedData}
            />
        </>
    );
};

export default AllTasks;
