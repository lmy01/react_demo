import React from 'react';
import { Button } from 'antd';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titles: ['详情1', '详情2', '详情3'],
      flag: false
    }
  }
  render() {   
    
    return (
      <div className="List">
        <header className="App-header">
          <ul>
            {
              this.state.titles.map((item,i,arr) => {
                return (
                  <li key={i} onClick={() => this.props.history.push('/detail/' + (i+1))}>跳转到详情{i+1}</li>
                )
              })
            }
          </ul>
          {
            this.state.flag?<div>动态显示true</div> : <div>动态显示false</div>
          }
          <Button type="primary" onClick={() => this.props.history.push('/')}>返回首页</Button>
        </header>
      </div>
    )
  }
}