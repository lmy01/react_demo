import React from 'react'
import { Input, Button, message } from 'antd'
import './Todos.less'

export default class Todos extends React.Component{
  constructor(props) {
    super(props)
    
    this.state = {
      task: '',
      list: [
        {
          text: '思想成熟、有活力、为人诚实。',
          status: '1' // 0 移除  1 正常
        },
        {
          text: '强的系统管理能力。能够独立工作。需要有能力及适应力强的人。需要个性稳重、具高度责任感的人。开朗、有进取心的应聘者。',
          status: '1'
        }
      ]
    }

    this.add = this.add.bind(this)
    this.changeInput = this.changeInput.bind(this)
  }

  changeInput(e) {
    // console.log(e.target.value)
    this.setState({
      task: e.target.value
    })
  }

  // 添加任务
  add() {
    if(this.state.task.trim()){
      if(this.state.task.trim().length > 100) {
        message.warning('任务内容不能超过100个字符')
      }else{
        this.setState({
          list: [...this.state.list, {
            text: this.state.task
          }]
        }, ()=>{
          this.setState({
            task: ''
          })
        })
      }
    }    
  }

  // 删除任务
  remove(index) {
    let _list = this.state.list
    _list[index].status = '0'
    this.setState({
      list: _list
    })
  }

  // 重新生效
  reAdd(index) {
    let _list = this.state.list
    _list[index].status = '1'
    this.setState({
      list: _list
    })
  }

  render() {
    return (
      <div className="todos-c">
        <div>
          <div className="input-c">
            <Input id="input-task" placeholder="今日计划" value={this.state.task} onChange={this.changeInput} />
            <Button type="primary" onClick={this.add}>添加</Button>
          </div>
          <div className="list-c">
            {
              this.state.list.map((item, index) => 
                <div key={index}>
                  <span style={item.status === '0' ? {textDecoration: 'line-through', opacity: '.5'} : {}}>{index + 1 + ': ' + item.text}</span>
                  {
                    item.status === '0' ? <Button type="link" onClick={this.reAdd.bind(this, index)}>重新生效</Button> : (
                      <span>
                        <Button danger type="link" onClick={this.remove.bind(this, index)}>删除</Button>
                      </span>
                    )
                  }
                  
                </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}