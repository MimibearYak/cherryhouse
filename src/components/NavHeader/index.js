/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-06-10 20:58:46
 * @LastEditors: Seven
 * @LastEditTime: 2021-06-10 22:06:54
 */

import React from 'react'
import {NavBar} from 'antd-mobile'
//导入props效验
import PropTypes from 'prop-types'
//withRouter
import {withRouter} from 'react-router-dom'
import './index.css'

function NavHeader({children,history,onLeftClick}){
  const defaultHandler=()=>history.go(-1)
  return(
    <NavBar
    className='navbar'
    mode="light"
    icon={<i className='iconfont icon-back'></i>}
    onLeftClick={onLeftClick||defaultHandler}

    >
      {children}
    </NavBar>
  )
}
NavHeader.propTypes={
  children:PropTypes.string.isRequired,
  onLeftClick:PropTypes.func
}
export default withRouter(NavHeader)