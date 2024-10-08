import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import classes from './signup.module.css'
import { Link, useNavigate } from 'react-router-dom'
import img from '../../assets/woman2.jpg'
import { register } from '../../redux/authSlice'

const Signup = () => {
  const [username , setUsername] = useState('')
  const [email , setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error , setError] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignUp = async(e)=>{
      e.preventDefault()
    if(username==='' || email==='' || password==='')
      return;

      try {

        const res = await fetch('https://friendyfy.onrender.com/auth/register',{
          headers:{
            'Content-Type':'application/json'
          },
          method:"POST",
          body:JSON.stringify({username,email,password})
        })

        const data = await res.json();
        console.log("register data ",data)
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.others);
        dispatch(register(data))
        navigate('/')
        
      } catch (error) {
         setError(true)
         setTimeout(()=>{
            setError(false)
         },3000)
      }
  }

  return (
    <div className={classes.signUpContainer}>
        <div className={classes.signUpWrapper}>
           {/* <div className={classes.signUpLeftSide}>
              <img src={img} alt="" className={classes.leftImg}/>
           </div> */}
           <div className={classes.signUpRightSide}>
             <h2 className={classes.title}>Sign Up</h2>
             <form onSubmit={handleSignUp} action="" className={classes.signUpForm}>
                <input type="text" name="" id="" placeholder='Enter your name' onChange={(e)=>setUsername(e.target.value)}/>
                <input type="email" placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)} />
                <button type='submit' className={classes.submitBtn}>Sign Up</button>
                <p>Already have an account? <Link to='/login'>Login</Link> </p>
             </form>
             {
               error && (
                <div className={classes.errorMessage}>
                  Wrong credentials! Try different ones
                </div>
               )
             }
           </div>
        </div>
    </div>
  )
}

export default Signup