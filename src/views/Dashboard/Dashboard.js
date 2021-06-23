import React from 'react';
import 'whatwg-fetch';
import { Carousel, Button } from 'antd';
import './Dashboard.less';

import Child from './Child'
import Child1 from './Child1'
import Child2 from './Child2'

export default class Dashboard extends React.Component{
  constructor(props) {
    super(props)
    
    this.state = {
      flag: false,
      list: [ '李一', '王二', '三三'],
      giveToChildMsg: '我是来自父元素的值'
    }

    this.queryList = this.queryList.bind(this)
    this.link1 = this.link1.bind(this)
    this.link2 = this.link2.bind(this)
    this.changeFlag = this.changeFlag.bind(this)
    this.changeMsg = this.changeMsg.bind(this)
  }

  componentDidMount() {
    
  }

  changeMsg(msg) {
    this.setState({
      giveToChildMsg: msg
    })
  }

  queryList() {
    fetch('https://api.apiopen.top/getJoke?page=1&count=5&type=video',{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => { // 第一个then返回的是请求相关参数
      return res.json(); // 必须返回相应数据，不然第二个then中无法接收到数据
    }).then(json => { // 返回的是数据
      console.log(json)
    }).then(err => { // 返回的是错误

    })
  }

  link1() {
    this.props.history.push('/app/userlist')
  }
  link2() {
    this.props.history.push('/app/myinfo')
  }
  
  changeFlag() {
    this.setState({
      flag: !this.state.flag
    })
  }

  render() {
    return (
      <div>
        <Carousel autoplay>
          <div>
            <h3>111</h3>
          </div>
          <div>
            <h3>222</h3>
          </div>
          <div>
            <h3>333</h3>
          </div>
        </Carousel>
        <div style={{marginTop: '15px'}}>
          <div>测试fetch发送请求,到控制台查看</div>
          <Button onClick={this.queryList}>发送请求</Button>
        </div>
        <div style={{marginTop: '15px'}}>
          <div>测试侧边栏菜单是否跟随路由联动：</div>
          <div>
            <span onClick={this.link1}>跳转到用户列表</span>
          </div>
          <div>
            <span onClick={this.link2}>跳转到我的信息</span>
          </div>
        </div>
        <div style={{marginTop: '15px'}}>
          <div>条件渲染:</div>
          <div>
            <span>{this.state.flag + ''}</span>
            <Button onClick={this.changeFlag}>切换</Button>
          </div>
        </div>
        <div style={{marginTop: '15px'}}>
          <div>列表渲染:</div>
          <div>
            {this.state.list.map((item, index) => {
              return <span key={index}>{item} / </span>
            })}
          </div>
        </div>
        <div style={{marginTop: '15px'}}>
          <div>父子相互传值:</div>
          <div>
            <Child msg={this.state.giveToChildMsg} changeMsg={this.changeMsg}></Child>
          </div>
        </div>
        <div style={{marginTop: '15px'}}>
          <div>兄弟组件传值react-redux:</div>
          <div>
            <Child1></Child1>
            <Child2></Child2>
          </div>
        </div>
      </div>
    )
  }
}