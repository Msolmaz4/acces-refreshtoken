import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Home = () => {
  const [name,setName] =useState()


  useEffect(()=>{
    (
      async()=>{
        const {data}= await axios.get('http://localhost:8000/api/user')
        setName(data.name)
  
      }
    )()
  

  },[])
  return (
    <div>
       
       hello{name}


    </div>
  )
}

export default Home