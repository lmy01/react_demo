import React from 'react'
// connect方法的作用：将额外的props传递给组件，并返回新的组件，组件在该过程中不会受到影响
import { connect } from 'react-redux'
// 引入action
import { setChild2Msg} from '../../store/actions.js'

class Child1 extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      msg: ''
    }

    this.changeChild1Msg = this.changeChild1Msg.bind(this)
    
  }

  changeChild1Msg() {
    this.props.setChild2Msg('通过子组件111修改了子组件222的值')
  }


  render() {
    return (
      <div>
        <strong>这是子111组件</strong>
        <div>{this.props.msg}</div>
        <button onClick={this.changeChild1Msg}>修改子222组件的值</button>
      </div>
    )
  }
}


// mapStateToProps：将state映射到组件的props中
const mapStateToProps = (state) => {
  return {
    msg: state.setChild1Msg
  }
}

// mapDispatchToProps：将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setChild2Msg (data) {
      // 如果不懂这里的逻辑可查看前面对redux-thunk的介绍
      dispatch(setChild2Msg(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Child1)