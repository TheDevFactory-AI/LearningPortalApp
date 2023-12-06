import { Outlet, Router, rootRouteWithContext } from '@tanstack/react-router'
import OverViewRoute from './pages/Overview/Overview'
import AboutRoute from './pages/About/About'
import './index.css'
import '../app/globals.css'
import { QueryClient } from '@tanstack/react-query';
import CourseDetailsRoute from './pages/CourseDetails/CourseDetails'
import AuthRoute from './pages/Authentication/Authentication'
import { MainAppRoute } from './rootRoutes/MainApp'
import ClientChatRoute from './pages/LiveEvaluations/ClientChat'

export const queryClient=new QueryClient()



export const rootRoute = rootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: ()=> <Outlet />

})

const routeTree = rootRoute.addChildren([
  AuthRoute,
  MainAppRoute.addChildren([OverViewRoute, AboutRoute, CourseDetailsRoute, ClientChatRoute])
])
export const router = new Router({ 
  routeTree,
  context: {
    queryClient: queryClient
  },

})
