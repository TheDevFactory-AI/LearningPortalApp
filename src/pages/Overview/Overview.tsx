import { Route } from "@tanstack/react-router"
import { rootRoute } from "../../App"

const Overview=()=>{
  return (
    <div>Overiew is HEA</div>
  )
}

const OverViewRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/overview",
    component: Overview,
    })
export default OverViewRoute;