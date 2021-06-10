/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-05-25 14:42:44
 * @LastEditors: Seven
 * @LastEditTime: 2021-06-10 22:05:40
 */
import React from 'react'
import axios from 'axios'
import {Toast } from 'antd-mobile';
import {getCurrentCity} from  '../../utils/'
import {List,AutoSizer} from 'react-virtualized'
import NavHeader from '../../components/NavHeader'
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
const HOUSE_CITY=['北京','上海','广州','深圳']

export default class CityList extends React.Component{
  constructor(props){
    super(props)
    this.state={
      cityList:{},
      cityIndex:[],
      activeIndex:0,
    }
    this.citylistComponent=React.createRef()
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
  //right index fc
  renderCityIndex(){
    const {cityIndex,activeIndex}=this.state
    return cityIndex.map((item,index)=>(
      <li className='city-index-item' key={item}
        onClick={()=>{
          //组件滚动指定位置
          this.citylistComponent.current.scrollToRow(index)
        }}
      >
        <span 
        className={activeIndex===index? 'index-active':''}
        >
          {item==='hot'?'热':item.toUpperCase()}
        </span>
      </li>
    ))
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
            <div className='name' key={item.value}
            onClick={()=>this.changeCity(item)}
            >{item.label}</div>
          ))
        }
      </div>
    )
  }
  onRowsRendered=({startIndex})=>{
    if(this.state.activeIndex!==startIndex){
      this.setState({
        activeIndex:startIndex
      })
    }
  }
  changeCity({label,value}){
    if(HOUSE_CITY.indexOf(label)>-1){
      localStorage.setItem('ytzf_city',JSON.stringify({label,value}))
      this.props.history.go(-1)
    }else{
      Toast.info('该城市暂无房源数据',2,null,false)
    }
  }
  async componentDidMount(){
    await this.getCityList()
    this.citylistComponent.current.measureAllRows();//提前计算组件高度
  }
  render(){
    return (
      <div className='citylist'>
        <NavHeader>
          城市选择
        </NavHeader>
        <AutoSizer>
          {({height,width})=>(
            <List 
            ref={this.citylistComponent}
            width={width}
            height={height}
            rowCount={this.state.cityIndex.length}
            rowHeight={this.getRowHeight}
            rowRenderer={this.rowRenderer}
            onRowsRendered={this.onRowsRendered}
            scrollToAlignment='start'//准确点击li
            >
            </List>
          )}
        </AutoSizer>

        <ul className='city-index'>
          {this.renderCityIndex()}
        </ul>
      </div>
    )
  }
}