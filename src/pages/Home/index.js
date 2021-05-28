/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-05-25 14:42:24
 * @LastEditors: Seven
 * @LastEditTime: 2021-05-26 15:13:53
 */
import React from 'react'
import {Route} from 'react-router-dom'
import Index from '../Index'
import HouseList from '../HouseList'
import News from '../News'
import Profile from '../ProFile'
import {TabBar} from 'antd-mobile'
import './index.css'

const tabItems=[
  {
    title:'首页',
    icon:'icon-ind',
    path:'/home/index'
  },
  {
    title:'找房',
    icon:'icon-findHouse',
    path:'/home/list'
  },
  {
    title:'咨询',
    icon:'icon-infom',
    path:'/home/news'
  },
  {
    title:'我的',
    icon:'icon-my',
    path:'/home/profile'
  },
]

export default class Home extends React.Component{
  state = {
    selectedTab: this.props.location.pathname,
  };

  renderTabBarItem(){
    return tabItems.map((item)=>(
      <TabBar.Item
      title={item.title}
      key={item.title}
      icon={
        <i className={`iconfont ${item.icon}`}></i>
      }
      selectedIcon={
        <i className={`iconfont ${item.icon}`}></i>
      }
      selected={this.state.selectedTab === item.path}
      onPress={() => {
        this.setState({
          selectedTab: item.path,
        });
        //路由切换
        this.props.history.push(item.path)
      }}
      data-seed="logId"
      >
      </TabBar.Item>
    ))
  }

  render(){
    return(
      <div className='home'>
        <Route path='/home' exact component={Index}></Route>
        <Route path='/home/list' component={HouseList}></Route>
        <Route path='/home/news' component={News}></Route>
        <Route path='/home/prifile' component={Profile}></Route>

        <TabBar
          tintColor="#21b97a"
          barTintColor="white"
          noRenderContent={true}
        >
          {this.renderTabBarItem()}
        </TabBar>
      </div>
    )
  }
}