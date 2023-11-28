import { Outlet, Router, rootRouteWithContext } from '@tanstack/react-router'
import OverViewRoute from './pages/Overview/Overview'
import HomeRoute from './pages/Home/Home'
import AboutRoute from './pages/About/About'
import './index.css'
import '../app/globals.css'
import { QueryClient } from '@tanstack/react-query';
import CourseDetailsRoute from './pages/CourseDetails/CourseDetails'
import AuthRoute from './pages/Authentication/Authentication'
import { MainAppRoute } from './rootRoutes/MainApp'

export const queryClient=new QueryClient()



export const rootRoute = rootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: ()=> <Outlet />

})

const routeTree = rootRoute.addChildren([
  AuthRoute,
  MainAppRoute.addChildren([OverViewRoute, HomeRoute, AboutRoute, CourseDetailsRoute])
])
export const router = new Router({ 
  routeTree,
  context: {
    queryClient: queryClient
  },

})
