import { enableReactUse } from '@legendapp/state/config/enableReactUse'
import {
  Link,
  Outlet,
  RouterProvider,
  Router,
  Route,
  RootRoute,
} from '@tanstack/react-router'
import Filtering from "./pages/Filtering"
import CanvasRendering from "./pages/CanvasRendering"

const Index = () => (
  <div className="flex items-center justify-center">
    <h1 className="text-40px font-600">Welcome</h1>
  </div>
)

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
})

const filteringRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/filtering',
  component: Filtering,
})

const canvasRenderingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/canvas',
  component: CanvasRendering,
})

const rootRoute = new RootRoute({
  component: () => (
    <div className="bg-slate-9 text-gray-2 min-h-screen">
      <div className="flex text-20px font-600 px-8px gap-15px">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/filtering" className="hover:underline">Filtering</Link>
        <Link to="/canvas" className="hover:underline">Canvas Rendering</Link>
      </div>
      <Outlet />
    </div>
  )
})

enableReactUse()

const routeTree = rootRoute.addChildren([
  indexRoute,
  filteringRoute,
  canvasRenderingRoute
])

const router = new Router({ routeTree })

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
