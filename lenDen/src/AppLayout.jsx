import { Outlet } from "react-router-dom"; 
import {Sidebar} from "./components/index"

function Layout(){

    return(
        <>
        
       <Sidebar/> 
<Outlet/>
        
        </>
    )
}

export default Layout