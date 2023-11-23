import { Link, Outlet, Router, rootRouteWithContext } from '@tanstack/react-router'
import OverViewRoute from './pages/Overview/Overview'
import HomeRoute from './pages/Home/Home'
import AboutRoute from './pages/About/About'
import PressableButton from './components/ui/pressableButton'
import SideBar from './components/Navigation/SideBar'
import LinksContainer from './components/Navigation/LinkContainer'
import './index.css'
import '../app/globals.css'
import  ComboboxDemo  from './components/Navigation/ProjectSelect'
import { QueryClient } from '@tanstack/react-query';
import CourseDetailsRoute from './pages/CourseDetails'
import SignupRoute from './pages/Authentication/SignUp'

export const queryClient=new QueryClient()

export const rootRoute = rootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => (
    <>
    <SideBar>
      <div className="basis-10/12">
        <LinksContainer 
        links={[
          {to:"/overview",title:"Overview"},
          {to:"/",title:"Home"},
        ]}/>
        <div className="pb-4">
          <ComboboxDemo/>
        </div>
        <div className="pb-4">
        <Link 
          to={'course/$courseId'} //create index route for course
          params={{courseId:1}}
          className="[&.active]:font-bold text-white">
          {'Course Details'}
        </Link>
        </div>
        <div className="pb-4">
        <Link 
          to={'/signup'} //create index route for course
          params={{courseId:1}}
          className="[&.active]:font-bold text-white">
          {'SignUp'}
        </Link>
        </div>
      </div>
      <div className="basis-1/6">
        <LinksContainer
        links={[{to:"/about",title:"About"}]}/>
        <PressableButton onPress={()=>{}}>Log out</PressableButton>
      </div>
    </SideBar>
    <div className="p-8 sm:ml-64">
        <Outlet />
    </div>
    </>
  ),
})


const routeTree = rootRoute.addChildren([OverViewRoute, HomeRoute, AboutRoute, CourseDetailsRoute,SignupRoute])
export const router = new Router({ 
  routeTree,
  context: {
    queryClient: queryClient
  }

})
