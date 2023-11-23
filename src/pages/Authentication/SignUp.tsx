import { rootRoute } from "@/App"
import { AuthCard } from "@/components/Auth/AuthCard"
import { Route } from "@tanstack/react-router"

const SignUp = () => {
  return (
    <div>
        <AuthCard/>
    </div>
  )
}

const SignupRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/signup",
    component: SignUp,
})

export default SignupRoute;
