import React from 'react'

export default class Child extends React.Component{
  constructor(props){
    super(props)

    this.state = {}
    
    this.changeMsg = this.changeMsg.bind(this)
  }

  changeMsg() {
    this.props.changeMsg('子组件传给父组件的值')
  }

  render() {
    return (
      <div>
        <strong>这是子组件</strong>
        <div>{this.props.msg}</div>
        <button onClick={this.changeMsg}>修改父元素的msg</button>
      </div>
    )
  }
}