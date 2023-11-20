import { Link, Outlet, RootRoute, Router } from '@tanstack/react-router'
import OverViewRoute from './pages/Overview/Overview'


export const rootRoute = new RootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/overview" className="[&.active]:font-bold">
          Overview
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
})


const routeTree = rootRoute.addChildren([OverViewRoute])
export const router = new Router({ routeTree })