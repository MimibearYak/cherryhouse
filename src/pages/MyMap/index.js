/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-05-30 16:33:55
 * @LastEditors: Seven
 * @LastEditTime: 2021-06-10 21:51:09
 */
import axios from 'axios';
import React from 'react'
//map Marker点标注位置 Navigationcontrol右下角控件 InfoWindow 信息弹框
import {Map, NavigationControl} from 'react-bmapgl';

//import public component bar
import NavHeader from '../../components/NavHeader'
import './index.css'

export default class MyMap extends React.Component{
  state={
    city:[],
  }
  //获取城市数据方法
  async getCity(){
    const res=await axios.get('http://localhost:8080/area/map')
    this.setState({
      city:res.data.body
    })
  }
  
  render(){
    return (
      <div className='map'>
        <NavHeader onLeftClick={()=>{}}>
          地图找房
        </NavHeader>
        <Map 
        style={{height:"100%"}}
        center={{lng: 116.402544, lat: 39.928216}} 
        >
          <NavigationControl /> 
        </Map>
      </div>
    )
  }
}