import styles from './header.module.scss'
import clsx from 'clsx'
import Search from './Search'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState,useEffect } from 'react'
export default function Header({onlick}) {
    

  const [isAdmin,setIsAdmin]=useState(false)
    



function signout(){
  let choice=window.confirm("Bạn muốn đăng xuất ?")
  if(choice==true)
  {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    setIsAdmin(false)
  }
  
}
  
    async function checkvar() {
        
        if (localStorage.getItem('username')) {
          const savedUsername = localStorage.getItem('username');
          const savedPassword = localStorage.getItem('password');
      console.log("dad")
          try {
            const response = await axios.get('http://localhost/Android/v2/superadminlogin.php', {
              params: {
                email: savedUsername,
                password: savedPassword,
              },
            });
      
            if (response.data.message === "Login success") {
             
              
              return true;
            }
          } catch (error) {
            console.error(error);
            return false;
          }
        } else {
            console.log("dad")
          return false;
        }
      }
//     function checkvar(){

//         if (localStorage.getItem('username'))
//     {
//       const savedUsername = localStorage.getItem('username');
//       const savedPassword = localStorage.getItem('password');

//       axios.get('http://192.168.1.6/salonManager2/88/superadminlogin.php', {
//   params: {
//     email:savedUsername,
//     password: savedPassword,
//   }
// })
//   .then((response) => {
//     console.log(response.data.message);

//     if(response.data.message==="Login success")
//     {
//         return true
// alert("Bạn đã đăng nhập rồi")
        
      

//     }
//   })
//   .catch((error) => {
//     console.error(error);
//     return false
//   });


//     }
//     else{
//         return false;
//     }
    
//     }
    useEffect(
()=>{

  async function fetchData() {
    const isLoggedIn = await checkvar();
    if (isLoggedIn) {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
  }

  fetchData()
},[]

    )
const navigate=useNavigate();
    return(<div className={clsx(styles.all)}>
<div className={clsx(styles.father_element)}>
   <div>
   {/* <svg className={clsx(styles.menu_button)}  focusable="false" >
        <path className={clsx(styles.path)} d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z">
        </path>
        </svg> */}
       <svg onClick={onlick} className={clsx(styles.menu_button)}   xmlns="http://www.w3.org/2000/svg"  height="2em" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
   </div>
   <div>
   <svg className={clsx(styles.logo)}  xmlns="http://www.w3.org/2000/svg" height="3.5em" viewBox="0 0 640 512"><path  d="M471.08 102.66s-.3 18.3-.3 20.3c-9.1-3-74.4-24.1-135.7-26.3-51.9-1.8-122.8-4.3-223 57.3-19.4 12.4-73.9 46.1-99.6 109.7C7 277-.12 307 7 335.06a111 111 0 0 0 16.5 35.7c17.4 25 46.6 41.6 78.1 44.4 44.4 3.9 78.1-16 90-53.3 8.2-25.8 0-63.6-31.5-82.9-25.6-15.7-53.3-12.1-69.2-1.6-13.9 9.2-21.8 23.5-21.6 39.2.3 27.8 24.3 42.6 41.5 42.6a49 49 0 0 0 15.8-2.7c6.5-1.8 13.3-6.5 13.3-14.9 0-12.1-11.6-14.8-16.8-13.9-2.9.5-4.5 2-11.8 2.4-2-.2-12-3.1-12-14V316c.2-12.3 13.2-18 25.5-16.9 32.3 2.8 47.7 40.7 28.5 65.7-18.3 23.7-76.6 23.2-99.7-20.4-26-49.2 12.7-111.2 87-98.4 33.2 5.7 83.6 35.5 102.4 104.3h45.9c-5.7-17.6-8.9-68.3 42.7-68.3 56.7 0 63.9 39.9 79.8 68.3H460c-12.8-18.3-21.7-38.7-18.9-55.8 5.6-33.8 39.7-18.4 82.4-17.4 66.5.4 102.1-27 103.1-28 3.7-3.1 6.5-15.8 7-17.7 1.3-5.1-3.2-2.4-3.2-2.4-8.7 5.2-30.5 15.2-50.9 15.6-25.3.5-76.2-25.4-81.6-28.2-.3-.4.1 1.2-11-25.5 88.4 58.3 118.3 40.5 145.2 21.7.8-.6 4.3-2.9 3.6-5.7-13.8-48.1-22.4-62.7-34.5-69.6-37-21.6-125-34.7-129.2-35.3.1-.1-.9-.3-.9.7zm60.4 72.8a37.54 37.54 0 0 1 38.9-36.3c33.4 1.2 48.8 42.3 24.4 65.2-24.2 22.7-64.4 4.6-63.3-28.9zm38.6-25.3a26.27 26.27 0 1 0 25.4 27.2 26.19 26.19 0 0 0-25.4-27.2zm4.3 28.8c-15.4 0-15.4-15.6 0-15.6s15.4 15.64 0 15.64z"/></svg>

   </div>
   <div className={clsx(styles.searchdiv)}>
    {/* <input className={clsx(styles.input)} /> */}
    <Search search={null}/>
   </div>
  {isAdmin?( <div className={clsx(styles.divbut)}>
    <button onClick={()=>{
       navigate('/add')
    }} className={clsx(styles.button)}>
        Thêm sản phẩm
    </button>
   </div>):''}
   <div className={clsx(styles.divbut)}>
    <button onClick={()=>{

// checkvar().then(isLoggedIn => {
//     if (isLoggedIn) {
//         console.log("tere")
//     } else {
//         console.log("User is not logged in.");
//         navigate('/login');
//     }
// });
if(isAdmin==true){
  signout()
}
else{
  navigate('/login');
}

        //  const isLoggedIn = await checkvar();
        // console.log()
        // if(checkvar()){
        //     console.log("tere")
        // }
        // else{
            
        //     navigate('/login')
        // }
       
    }} className={clsx(styles.button)}>
        <svg xmlns="http://www.w3.org/2000/svg"  height="1em" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
    </button>

    
   </div>
</div>
</div>
    )
}