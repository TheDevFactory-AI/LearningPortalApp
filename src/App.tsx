import { Outlet, RootRoute, Router } from '@tanstack/react-router'
import OverViewRoute from './pages/Overview/Overview'
import HomeRoute from './pages/Home/Home'
import AboutRoute from './pages/About/About'
import PressableButton from './components/ui/pressableButton'
import SideBar from './components/Navigation/SideBar'
import LinksContainer from './components/Navigation/LinkContainer'


export const rootRoute = new RootRoute({
  component: () => (
    <>
    <SideBar>
      <div className="basis-10/12">
        <LinksContainer 
        links={[
          {to:"/overview",title:"Overview"},
          {to:"/home",title:"Home"}
        ]}
        />
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


const routeTree = rootRoute.addChildren([OverViewRoute, HomeRoute, AboutRoute])
export const router = new Router({ routeTree })