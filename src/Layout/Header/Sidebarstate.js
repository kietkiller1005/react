import { createContext,useState

} from "react";
import Context from "./Context";

export default function Sidebarstate({children}){

const [state,usestate]=useState(false);
   
    
    
    
    return(<Context.Provider value={[state,usestate]}>
{children}
    </Context.Provider>


    )
}