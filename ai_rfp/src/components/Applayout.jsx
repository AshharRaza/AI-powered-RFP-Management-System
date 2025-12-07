import { Outlet } from "react-router-dom"

import { Sidebar } from "./Sidebar"

export const Applayout = () => {


    return(
        <>
        <div className="flex">
             <Sidebar/>
             <Outlet/>
       

        </div>
        
        
        </>
       
    )
}