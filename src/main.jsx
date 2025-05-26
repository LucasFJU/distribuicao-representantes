import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import RepresentantesApp from './RepresentantesApp'
import AdminPanel from './AdminPanel'

const url = window.location.pathname

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {url.includes("admin") ? <AdminPanel /> : <RepresentantesApp />}
  </React.StrictMode>,
)
