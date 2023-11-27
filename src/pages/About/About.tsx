import { Route } from '@tanstack/react-router';
import { rootRoute } from "../../App"
import Chat from "../Chat/Chat"

const About=()=>{
  return (
    <>
      <div>About</div>
      <Chat/>
    </>
    
  )
}

const AboutRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/about",
    component: About,
    })
export default AboutRoute;