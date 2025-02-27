import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import App from './App.jsx' 
import { store } from './redux/Store.js'

ReactDOM.createRoot(document.getElementById('root')).render(

  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>, 
  <Provider store={store}>
    <App />
  </Provider> 
)
