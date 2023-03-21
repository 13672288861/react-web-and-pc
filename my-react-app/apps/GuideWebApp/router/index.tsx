import { HashRouter as Router } from 'react-router-dom'
// import TabBar from '../components/common/tabBar/tab-bar'
import Routes from './routes'

export default function() {
  return (<>
    <Router>
      {/* <TabBar></TabBar> */}
      <Routes />
    </Router>
  </>)
}
