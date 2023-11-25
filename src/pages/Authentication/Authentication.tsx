import { rootRoute } from "@/App"
import TabsWrapper from "@/components/ui/TabsWrapper"
import { Route } from "@tanstack/react-router"
import {SignUp} from "./AuthComponents/SignUp"
import { Login } from "./AuthComponents/Login"
import { useState } from "react"

const Authentication = () => {
    const [confirmationStage, setConfirmationStage] = useState(false);

    const disableTabs = () => {
        setConfirmationStage(true);
    }
  return (
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
  )
}

const AuthRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/Auth",
    component: Authentication,
})
export default AuthRoute