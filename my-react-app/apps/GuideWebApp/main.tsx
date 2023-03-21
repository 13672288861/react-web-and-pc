import ReactDOM from 'react-dom/client'
import App from './App'
// import React from 'react'
import './index.css'
import './style/common.less'
import './style/reset.less'
import './config/index'
if (import.meta.env.VITE_APP_NEED_VCONSOLE === 1 || import.meta.env.MODE === 'development') {
  import('vconsole').then(res => {
    // eslint-disable-next-line new-cap
    new res.default({ theme: 'dark' })
  })
}
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  // </React.StrictMode>
  <App />
)
