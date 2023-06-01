import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter as Router} from "react-router-dom"
import './index.css'
import {MainContextProvider} from "./context/MainContext.tsx";
import {initState} from "./context/StateType.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Router>
          <MainContextProvider
              login={initState.login}
              user={initState.user}
              animeSeriesList={initState.animeSeriesList}>
              <App/>
          </MainContextProvider>
      </Router>
  </React.StrictMode>,
)
