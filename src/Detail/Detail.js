import React from 'react'
import {Button} from 'antd'

export default class Detail extends React.Component {
  constructor(props){
    super(props)
  }
  componentWillMount() {
    // 获取路由相关信息
    console.log(this.props.match)
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={() => this.props.history.push('/list')}>返回列表</Button>
        <p>详情页 ---- {this.props.match.params.id}</p>
      </div>
    )
  }
}