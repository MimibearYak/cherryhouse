/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-05-25 14:42:44
 * @LastEditors: Seven
 * @LastEditTime: 2021-06-06 16:36:39
 */
import React from 'react'
import axios from 'axios'
import { NavBar, Icon } from 'antd-mobile';
import {getCurrentCity} from  '../../utils/'
import './index.css'

//数据格式化fc
const formatCityList=(list)=>{
  const cityList={}
  
  list.forEach(item=>{
    const first=item.short.substr(0,1)
    if(cityList[first]){
      cityList[first].push(item)
    }else{
      cityList[first]=[item]
    }
  })
  const cityIndex=Object.keys(cityList).sort()
  return{
    cityList,
    cityIndex,
  }
}

export default class CityList extends React.Component{

  async getCityList(){
    const res =await axios.get('http://localhost:8080/area/city?level=1')
    console.log(res)
    const {cityList,cityIndex}=formatCityList(res.data.body)
    const hotRes=await axios.get('http://localhost:8080/area/hot')
    cityList['hot']=hotRes.data.body
    cityIndex.unshift('hot')
    
    //获取当前定位城市信息
    const curCity=await getCurrentCity();
    cityList['#']={curCity}
    cityIndex.unshift('#')
    console.log(cityList,cityIndex,curCity)
  }
  componentDidMount(){
    this.getCityList()
  }
  render(){
    return (
      <div className='citylist'>
        <NavBar
        className='navbar'
        mode="light"
        icon={<i className='iconfont icon-back'></i>}
        onLeftClick={() =>this.props.history.go(-1)}

        >
          城市选择
        </NavBar>
      </div>
    )
  }
}