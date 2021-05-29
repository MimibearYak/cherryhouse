/*
 * @Description: http://wangxiao.zztion.com
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-05-26 13:45:34
 * @LastEditors: Seven
 * @LastEditTime: 2021-05-29 20:45:09
 */

import React from 'react'
//导入组件走马灯 WingBlank两仪留白
import {Carousel,Flex} from 'antd-mobile'
import axios from 'axios'
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'
// import './index.css'
import './index.scss'
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
]
export default class Index extends React.Component{
  state = {
    swipers:[],
    isSwiperLoaded:false,
    
    // 租房小组状态
  }
  //获取轮播数据
  async getSwipers(){
    const res=await axios.get('http://localhost:8080/home/swiper')
    this.setState({
      swipers:res.data.body,
      isSwiperLoaded:true
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
  componentDidMount() {
    this.getSwipers()
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
        </div>

        
        <Flex className='nav'>
          {this.renderNavs()}
        </Flex>

      </div>

    );
  }
}