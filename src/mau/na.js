import './dangnhap.css'
import { useState,useEffect,useRef } from 'react'
import axios from 'axios'
import { useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import Home from './home'
export default function Login(){
 const textinput=useRef(null)
 const CHANGE_EMAIL='change_email'
 const CHANGE_PASSWORD='change_password'
const rule={
   compare:"/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/",
   success:"email cua ban da hop le ",
   fail:"email cua ban khong hop le"
}

const [count,setCount]=useState(null)
const initstate={
   email:"",
   password:""
}
const  xuly=(state,action)=>{
   switch (action.type)
   {
      case CHANGE_EMAIL:
         return{
            ...state,
            email:action.payload
         }
         case CHANGE_PASSWORD:
         return{
            ...state,
            password:action.payload
         }
         default: 
         return state
   }

}
const [state,dispatch]=useReducer(xuly,initstate)
console.log(state)

const navigate = useNavigate();
function sosanh(value){
   if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
   {
      setCount(rule.success)
   }
   else{
      setCount(rule.fail)
   }

  


   axios.get('http://localhost/Android/v2/superadminlogin.php', {
  params: {
    email:state.email,
    password: state.password,
  }
})
  .then((response) => {
    console.log(response.data.message);

    if(response.data.message==="Login success")
    {

      localStorage.setItem('username', state.email);
  localStorage.setItem('password', state.password);
      navigate('/');

    }
  })
  .catch((error) => {
    console.error(error);
  });


}

function color(){

   if(count===rule.success){
      return "success"
   }
   else{
      return "fail"
   }
}

    return(
        <div className="moi">
            
            <div>
               <h3 className='header'>
                  Log in
               </h3>
            </div>
     
     <form>
      <div>
      <i class="fa-solid fa-user icon"></i>
      <input onChange={(e)=>{
dispatch({type:CHANGE_EMAIL,payload:e.target.value})
      }} className='input email' ref={textinput} placeholder="Tài khoản" onClick={()=>{
         setCount(null)
      }}/>
      </div>
     
     <br/>
     <input onChange={(e)=>{
dispatch({type:CHANGE_PASSWORD,payload:e.target.value})
      }}  className='input' placeholder="mật khẩu" type="password"/>
     <h3 className='note'>
      Forgot your password?
     </h3>
     <div className={color()} >
     {count}
     </div>
     </form>
    
     
     
     
    
     <button className='button' onClick={()=>{
      sosanh(textinput.current.value)
      
     }}>
        Log in
     </button>
     
            
 
        </div>
 

    )
}