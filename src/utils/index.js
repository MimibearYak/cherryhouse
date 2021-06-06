/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-06-06 13:39:18
 * @LastEditors: Seven
 * @LastEditTime: 2021-06-06 16:04:40
 */
import axios from 'axios'
export const getCurrentCity=()=>{
  const localCity=JSON.parse(localStorage.getItem('ytzf_city'))
  if(!localCity){
    return new Promise((resolve,reject)=>{
      const curCity=new window.BMapGL.LocalCity()
      curCity.get(async(res)=>{
        try{
          const result=await axios.get(`http://localhost:8080/area/info?name=${res.name}`)
          localStorage.setItem('ytzf_city',JSON.stringify(result.data.body))
          resolve(result.data.body)
        } catch(e){
          reject(e)
        }
      })
    })
  }
  return Promise.resolve(localCity)
}