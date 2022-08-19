import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'

const Register = () => {

   const [name,setName] =useState('')
   const [email,setEmail] =useState('')
   const [password,setPassword] =useState('')
   const [navi,setNavi] =useState(false)
   const denem = useNavigate()

    const submit = async (e)=>{
      e.preventDefault()
     /* 
     g;ndermeden ;nce consolda bak
     console.log({
        name:name,
        email:email,
        password:password
      })*/
      //ama data { name,email,password } g;nderebiliry java anlar
     await axios.post('http://localhost:8000/api/register',
     {
      name:name,
      email:email,
      password:password
    })
   
     setNavi(true)

    }
   // yukaridan true gelirse logine gider
    if(navi){
      denem('/login')
     
    }

  return (
    <div>

      <main className="form-signin w-100 m-auto">


        <form onSubmit={submit}>

          <div className="form-floating">
            <input className='form-control' placeholder="Name" 
             onChange={(e)=>setName(e.target.value)}
            ></input>
            <label > Nmae</label>
          </div>

          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" 
            onChange={(e)=>setEmail(e.target.value)}
            ></input>
            <label for="floatingInput"> Email</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
            ></input>
            <label for="floatingPassword">Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit" > signip</button>
        </form>
      </main>




    </div>
  )
}

export default Register