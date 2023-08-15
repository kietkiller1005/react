import { Fragment, useContext } from "react"
import Header from "../Layout/Header/Header"
import Context from "../Layout/Header/Context"
import './globalstyle.scss'
import Sidebar from "../Layout/Sidebar"
import { useState } from "react"
import Content from "../Layout/Content"
export default function Home(){
    const [state,usestate] = useContext(Context);
console.log(state)
    const handle=()=>{
        usestate((prev)=>!prev)
    }
    return(
   <div className="div_one">

<div>
<Header onlick={handle}></Header>
</div>
<div className="div_two">

    <Sidebar invisible={state}>

    </Sidebar>
    <Content>
        
    </Content>
</div>



</div>
   
   
   

    )
}