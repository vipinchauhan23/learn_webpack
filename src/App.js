import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import loadable from "react-loadable"
import logo from './logo.svg';
import './App.css';

const LoadingComponent = () => (<h3>Loading...</h3>)
// code spliting and make a different bundle according to module like Home,About
// we can change the bundle name through webpackChunkName
const Home = loadable({
  loader: () => import(/* webpackChunkName:'HomePage' */ './Home'),
  loading: LoadingComponent
})

const About = loadable({
  loader: () => import(/* webpackChunkName:'AboutPage' */'./About'),
  loading: LoadingComponent
})

function App() {
  
  if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
  }

  return (
    <div className="App">

      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-link">
        Webpack + React
        </h1>
      <div>
        <button><Link to="/home">Home</Link></button>
        <button><Link to="/about">About</Link></button>

      </div>
      {/* <div>
        <button><Link to="/home">Home</Link></button>
        <button><Link to="/about">About</Link></button>

      </div> */}







      <Switch>
        <Route path="/home" component={Home}></Route>
        <Route path="/about" component={About}></Route>
      </Switch>
    </div>
  );
}

export default App;
