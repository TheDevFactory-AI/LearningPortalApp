import { Route } from "@tanstack/react-router"
import { rootRoute } from "../../App"

const About=()=>{
  return (
    <div>About</div>
  )
}

const AboutRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/about",
    component: About,
    })
export default AboutRoute;