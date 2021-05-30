/*
 * @Description: http://wangxiao.zztion.com
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-05-26 13:45:34
 * @LastEditors: Seven
<<<<<<< HEAD
 * @LastEditTime: 2021-05-30 18:38:54
=======
 * @LastEditTime: 2021-05-30 17:52:37
>>>>>>> mimi
 */

import React from 'react'
//导入组件走马灯 WingBlank两仪留白
import {Carousel,Flex,Grid,WingBlank} from 'antd-mobile'
import axios from 'axios'
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'
import './index.css'
// import './index.scss'
// import './index.styl'
//封装nav
const navs=[
  {
    id:0,
    img:Nav1,
    title:'整租',
    path:'/home/list'
  },
  {
    id:2,
    img:Nav2,
    title:'合租',
    path:'/home/list'
  },
  {
    id:3,
    img:Nav3,
    title:'地图找房',
    path:'/home/map'
  },
  {
    id:4,
    img:Nav4,
    title:'去出租',
    path:'/home/list'
  }
];
//获取地理位置信息
navigator.geolocation.getCurrentPosition(position=> {
  console.log(position) 
});
//Grid data

export default class Index extends React.Component{
  state = {
    swipers:[],
    isSwiperLoaded:false,
    
    //租房小组的状态
    groups:[],
    //最新咨询数据
    news:[],
    //search area
    curCityName:''

  //获取轮播数据
  async getSwipers(){
    const res=await axios.get('http://localhost:8080/home/swiper')
    this.setState({
      swipers:res.data.body,
      isSwiperLoaded:true,

      
    })
  }
  //获取租房小组数据
  async getGroups(){
    const res=await axios.get('http://localhost:8080/home/groups',{
      params:{
        area:"AREA|88cff55c-aaa4-e2e0",
      }
    })
    this.setState({
      groups:res.data.body
    })
  }
  //news data
  async getNews(){
    const res=await axios.get('http://localhost:8080/home/news',{
      params:{
        area:"AREA|88cff55c-aaa4-e2e0"
      }
    })
    // console.log(res)
    this.setState({
      news:res.data.body
    })
  }
  
  //渲染轮播
  renderSwipers(){
    return this.state.swipers.map(item=>(
      <a
        key={item.id}
        href="http://wangxiao.zztion.com"
        style={{ display: 'inline-block', width: '100%', height: 212}}
      >
        <img
          src={`http://localhost:8080${item.imgSrc}`}
          alt=""
          style={{ width: '100%', verticalAlign: 'top' }}
        />
      </a>
    ))
  }
  //渲染Navs
  renderNavs(){
    return navs.map((item)=>{
      return(
        <Flex.Item 
          key={item.id}
          onClick={()=>{
            this.props.history.push(item.path)
          }}
          >
            <img src={item.img} alt=''></img>
            <h2>{item.title}</h2>
        </Flex.Item>
      )
    })
  }
  //抽离 租房小组
  renderGroups(item){
    return(
      <Flex className='group-item' justify='around' key={item.id}>
        <div className='desc'>
          <p className='title'>{item.title}</p>
          <span className='info'>{item.desc}</span>
        </div>
        <img src={`http://localhost:8080${item.imgSrc}`} alt=''></img>
      </Flex>
    )
  }
  //news render fc
  renderNews(){
    return this.state.news.map(item=>{
      return(
        <div className='news-item' key={item.key}>
          <div className='imgWrap'>
            <img className='img'
            src={`http://localhost:8080${item.imgSrc}`} alt=''/>
          </div>
          <Flex className='content' direction='column' justify='between'>
            <h3 className='title'>{item.title}</h3>
            <Flex className='info' justify='between'>
              <span>{item.from}</span>
              <span>{item.date}</span>
            </Flex>
          </Flex>
        </div>
      )
    })
  }
  componentDidMount() {
    this.getSwipers()
    this.getGroups()
    this.getNews()
    
    //通过ip定位获取当前城市名称
    const curCity=new window.BMapGL.LocalCity()
    curCity.get(async(res)=>{
      const result=await axios.get(`http://localhost:8080/area/info?name=${res.name}`)
      this.setState({
        curCityName:result.data.body.label
      })
    })
  }
  render() {
    return (
      <div className='index'>
        
        <div className='swiper'>
          {this.state.isSwiperLoaded ? (
            <Carousel
              autoplay
              autoplayInterval={5000}
              infinite
            >
              {this.renderSwipers()}
            </Carousel>
          ):('')}
          
          <Flex className='search-box'>
            <Flex className='search'>
              <div className='location'
              onClick={()=>this.props.history.push('/citylist')}>
                <span className='name'>{this.state.curCityName}</span>
                <i className='iconfont icon-arrow'></i>
              </div>
              <div className='form'
              onClick={()=>this.props.history.push('/search')}
              >
                <i className='iconfont icon-seach'>
                  <span className='text'>请输入小区或地址</span>
                </i>
              </div>
            </Flex>
            <i className='iconfont icon-map'
            onClick={()=>this.props.history.push('/map')}
            ></i>
          </Flex>

        </div>

        
        <Flex className='nav'>
          {this.renderNavs()}
        </Flex>

        <div className='group'>
          <h3 className='group-title'>
            租房小组
            <span className='more'>更多</span>
          </h3>
          <Grid data={this.state.groups} 
          columnNum={2}
          square={false}
          hasLine={false}
          renderItem={item=>(
            this.renderGroups(item)
          )}
          />
        </div>

        <div className='news'>
          <h3 className='group-title'>最新资讯</h3>
          <WingBlank size='md'>
            {this.renderNews()}
          </WingBlank>
        </div>

      </div>

    );
  }
}