import { Route } from "@tanstack/react-router"
import { MainAppRoute } from "@/rootRoutes/MainApp"

const Home=()=>{
  return (
    <div>Welcome home!</div>
  )
}

const HomeRoute = new Route({
    getParentRoute: () => MainAppRoute,
    path: "/home",
    component: Home,
    })
export default HomeRoute;