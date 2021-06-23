import React from 'react'
// connect方法的作用：将额外的props传递给组件，并返回新的组件，组件在该过程中不会受到影响
import { connect } from 'react-redux'
// 引入action
import { setChild1Msg } from '../../store/actions.js'

class Child2 extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      msg: ''
    }

    this.changeChild2Msg = this.changeChild2Msg.bind(this)    
  }

  changeChild2Msg() {
    this.props.setChild1Msg('通过子组件222修改了子组件111的值')
  }

  render() {
    return (
      <div>
        <strong>这是子222组件</strong>
        <div>{this.props.msg}</div>
        <button onClick={this.changeChild2Msg}>修改子111组件的值</button>
      </div>
    )
  }
}

// mapStateToProps：将state映射到组件的props中
const mapStateToProps = (state) => {
  return {
    msg: state.setChild2Msg
  }
}

// mapDispatchToProps：将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setChild1Msg (data) {
      // 如果不懂这里的逻辑可查看前面对redux-thunk的介绍
      dispatch(setChild1Msg(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Child2)