
// 路由
import Home from '../views/home/home'

const routes: Array<routeTypes> = [
  { path: '/', element: <Home /> }

]
export default function Routes() {
  return useRoutes(routes)
}
