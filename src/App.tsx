import { Link, Outlet, RootRoute, Router } from '@tanstack/react-router'
import OverViewRoute from './pages/Overview/Overview'
import HomeRoute from './pages/Home/Home'
import AboutRoute from './pages/About/About'


export const rootRoute = new RootRoute({
  component: () => (
    <>
      <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-48 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r-2 border-gray-200" aria-label="Sidebar">
        <div className="flex flex-col h-full p-8 overflow-y-auto ">
          <div className="basis-10/12">
            <div className="pb-4">
              <Link to="/" className="[&.active]:font-bold">
                Home
              </Link>
            </div>
            <div className="pb-4">
              <Link to="/overview" className="[&.active]:font-bold">
                Overview
              </Link>
            </div>
          </div>
          <div className="basis-1/6">
            <div className="pb-8">
              <Link to="/about" className="[&.active]:font-bold">
                About
              </Link>
            </div>
            <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Logout</button>
          </div>
        </div>
      </aside>
      <div className="p-8 sm:ml-64">
        <Outlet />
      </div>
    </>
  ),
})


const routeTree = rootRoute.addChildren([OverViewRoute, HomeRoute, AboutRoute])
export const router = new Router({ routeTree })