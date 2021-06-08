/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-05-25 14:42:44
 * @LastEditors: Seven
 * @LastEditTime: 2021-06-08 18:41:49
 */
import React from 'react'
import axios from 'axios'
import { NavBar, Icon } from 'antd-mobile';
import {getCurrentCity} from  '../../utils/'
import {List,AutoSizer} from 'react-virtualized'
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

//#hot转化
const formatCityIndex=(letter)=>{
  switch(letter){
    case '#':
      return '当前定位'
    case 'hot':
      return '热门城市'
    default:
      return letter.toUpperCase()
  }
}
const TITLE_HEIGHT=36;
const NAME_HEIGHT=50;

export default class CityList extends React.Component{

state={
  cityList:{},
  cityIndex:[]
}
  
  async getCityList(){
    const res =await axios.get('http://localhost:8080/area/city?level=1')
    console.log(res)
    const {cityList,cityIndex}=formatCityList(res.data.body)
    const hotRes=await axios.get('http://localhost:8080/area/hot')
    cityList['hot']=hotRes.data.body
    cityIndex.unshift('hot')
    
    //获取当前定位城市信息
    const curCity=await getCurrentCity();
    cityList['#']=[curCity]
    cityIndex.unshift('#')
    this.setState({
      cityList,
      cityIndex
    })
    // console.log(cityList,cityIndex,curCity)
  }
  
  getRowHeight=({index})=>{
    const {cityList,cityIndex}=this.state
    return TITLE_HEIGHT+cityList[cityIndex[index]].length*NAME_HEIGHT
  }
  
  rowRenderer=({
    key,
    index,//索引号
    isScrolling,//当前项是否正则滚动中
    isVisible,//单曲项在List中是可见的
    style,//每一行样式
  }) => {
    const {cityIndex , cityList}=this.state
    const letter=cityIndex[index]

    return(
      <div key={key} style={style} className='city'>
        <div className='title'>{formatCityIndex(letter)}</div>
        {
         cityList[letter].map((item)=>(
            <div className='name' key={item.value}>{item.label}</div>
          ))
        }
      </div>
    )
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
        <AutoSizer>
          {({height,width})=>(
            <List 
            width={width}
            height={height}
            rowCount={this.state.cityIndex.length}
            rowHeight={this.getRowHeight}
            rowRenderer={this.rowRenderer}
            >
            </List>
          )}
        </AutoSizer>

      </div>
    )
  }
}