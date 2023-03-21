import Router from './router/index'
import { Provider } from 'react-redux'
import Store from './store/'
// import React from 'react'
function App() {
  // const EventContext = React.createContext({
  //   useEvent: useEventEmitter()
  // })
  // const [count, setCount] = useState(0)
  return (
    <div className='App warpper'>
      <Provider store={Store}>
        {/* <EventContext.Provider value={}></EventContext.Provider> */}
        <Router></Router>
      </Provider>
    </div>
  )
}
export default App
