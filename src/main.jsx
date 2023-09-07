import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AirportFilterProvider, OutProductFilterContext, OutsourceFilterProvider, StuffFilterProvider, UserFilterProvider } from './context/index.js'
import ClosetFilterProvider from './context/ClosetFilterContext.jsx'

const composeProviders = (...Providers) => (Child) => (props) => (
  Providers.reduce((acc, Provider) => (
    <Provider>
      {acc}
    </Provider>
  ), <Child {...props} />)
)

const WrappedApp = composeProviders(
  AirportFilterProvider,
  OutsourceFilterProvider,
  StuffFilterProvider,
  OutProductFilterContext,
  UserFilterProvider,
  ClosetFilterProvider
)(App)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WrappedApp></WrappedApp>
  </React.StrictMode>,
)
