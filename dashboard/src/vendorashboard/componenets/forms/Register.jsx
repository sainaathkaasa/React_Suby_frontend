import React,{useState} from 'react'
import { API_PATH } from '../../data/ApiPath';

const Register = ({showLoginHandler}) => {
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(true);

const handleSubmit = async(e)=>{
  e.preventDefault();
  console.log("Submitting registration form")
  console.log(`${API_PATH}/vendor/register`)
  try {
    console.log("Entered for registration")
    const responce = await fetch(`${API_PATH}/vendor/register`,{
      method:'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({username, email, password})
    })

    const data = await responce.json();
    if(responce.ok){
      console.log(data);
      setUsername("");
      setEmail("");
      setPassword("");
      alert("Vendor Register Successfully");
      showLoginHandler() 
    }

  } catch (error) {
    console.log({error:"Registartion Failed"});
    alert("Registartion Failed")
  }
}

  return (
    <div className="registerSection">
        <form className='authForm' onSubmit={handleSubmit}>
        <h3>Vendor Register</h3>
            <label>Username</label>
            <input type="text" name='username' value={username} onChange={(e)=> setUsername(e.target.value)} placeholder='Enter your name'/><br />
            <label>Email</label>
            <input type="text" name='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter your email'/><br />
            <label>Password</label>
            <input type="password" name='password' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Enter your Password'/><br />

            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Register