/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-05-25 12:50:29
 * @LastEditors: Seven
 * @LastEditTime: 2021-05-29 13:55:01
 */
import React from 'react'
import {BrowserRouter as Router,Route,Link,Redirect} from 'react-router-dom'
import Home from './pages/Home/index'
import CityList from './pages/CityList/index'

function App() {
  return (
    <Router>
      <div className="App">

        <Route path="/" exact render={()=><Redirect to='/home'></Redirect>}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/citylist" component={CityList}></Route>
      </div>
    </Router>
  );
}

export default App;
