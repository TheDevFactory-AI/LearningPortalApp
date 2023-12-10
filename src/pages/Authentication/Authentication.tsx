import { rootRoute } from "@/App"
import TabsWrapper from "@/components/ui/TabsWrapper"
import { Route } from "@tanstack/react-router"
import {SignUp} from "./AuthComponents/SignUp"
import { Login } from "./AuthComponents/Login"
import { useState } from "react"
import TDF from "../../assets/TDF.png"

const Authentication = () => {
    const [confirmationStage, setConfirmationStage] = useState(false);

    const disableTabs = () => {
        setConfirmationStage(true);
    }
  return (
    <>
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-900 to-cyan-300">
    <img src={TDF} className="h-[75px] w-[75px] m-4 rounded-lg"/>
        <TabsWrapper
        tabsComponents={[
            {
                tabsTitle:"Log in",
                Component:<Login/>
            },
            {
                tabsTitle:"Sign up",
                Component:<SignUp setConfirmationStage={disableTabs}/>
            },
        ]}
        defaultValue="Log in"
        disabled={confirmationStage}
        />
    </div>
   
    </>
  )
}

const AuthRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/Auth",
    component: Authentication,
})
export default AuthRoute