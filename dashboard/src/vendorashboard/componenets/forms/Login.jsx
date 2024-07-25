import React,{useState} from 'react'
import { API_PATH } from '../../data/ApiPath'

const Login = ({showLoginWelcomeHandler}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handlerLogin = async(e)=>{
    e.preventDefault();
    console.log(`${API_PATH}/vendor/login`)
    try {
      const responce = await fetch(`http://localhost:4001/vendor/login`, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({email,password})
      })
      const data = await responce.json();
      if(responce.ok){
        alert("Login successfull")
        setEmail("")
        setPassword("")
        localStorage.setItem('loginToken', data.token)
        showLoginWelcomeHandler()
      }
    } catch (error) {
      console.log(error)
      alert('Login failed')
      
    }
  }

  return (
    <div className="loginSection">
        <form className='authForm' onSubmit={handlerLogin}>
        <h3>Vendor Login</h3>
            <label>Email</label>
            <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email'/><br />
            <label>Password</label>
            <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your Password'/><br />

            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Login