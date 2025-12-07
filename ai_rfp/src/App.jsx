import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Applayout } from "./components/Applayout"
import { Dashboard } from "./components/Dashboard"
import {RFPAnalysisPage} from "./pages/Analysis"
import { CheckAnalysisPage } from "./pages/CheckAnalysis"

const App = () => {

  const route = createBrowserRouter([
    {
      path:'/',
      element:<Applayout/>,
      children:[
        {
          path:'/',
          element:<Dashboard/>
        },
        {
          path:'/analysis',
          element:<RFPAnalysisPage/>,
          
           
          
        },
         {
              path:'/analysis/:id',
              element:<CheckAnalysisPage/>
            }
      ]
    
    }
  ])

  return(
    <>
    <RouterProvider router={route}/>
    
    </>
  )
}
export default App