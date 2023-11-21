import { Route } from "@tanstack/react-router"
import { rootRoute } from "../../App"

const Home=()=>{
  return (
    <div>Welcome!</div>
  )
}

const HomeRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Home,
    })
export default HomeRoute;