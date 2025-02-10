import React, {useEffect, useState} from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios'

const IncompletedTasks = () => {
  const [Data, setData] = useState()
  const headers = { 
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
}
    
useEffect(() => {
    const fetch = async () => {
        const response = await axios.get(
        "https://task-manager-backend-nine-phi.vercel.app/api/v2/get-incomplete-tasks", 
        { headers }
        )
        setData(response.data.data)
    }
    fetch()
})

  return (
    <div className='max-w-screen-lg mx-auto px-4'>
      <Cards home={"false"} data={Data}/>
    </div>
  )
}

export default IncompletedTasks