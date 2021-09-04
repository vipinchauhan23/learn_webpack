import React, { Suspense, lazy } from "react"
import { Route, Link, Switch } from 'react-router-dom';

import logo from './logo.svg';
import './app.css';

const Home = lazy(() => import(/* webpackChunkName:'HomePage' */'./Home'));
const About = lazy(() => import(/* webpackChunkName:'AboutPage' */'./About'));

function App() {
    return (<div>

        <h2>Welcome to React App</h2>
        <h3 className="App-link">Date : {new Date().toDateString()}</h3>
        <img src={logo} className="App-logo" alt="logo" />
        <div>
            <button><Link to="/home">Home</Link></button>
            <button><Link to="/about">About</Link></button>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route path="/home" component={Home}></Route>
                <Route path="/about" component={About}></Route>
            </Switch>
        </Suspense>
    </div>)
}

export default App
