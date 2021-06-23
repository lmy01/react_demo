import { Divider, Card, BackTop } from 'antd'
import React from 'react'
import Data from './Data'
import './PMP.less'

export default class PMP extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      currentTab: '1-3',
      charters: [],
      currentList: Data['1-3'],
      userSelection: {'1-3': [], '4': [], '5': [], '6': [], '7': [], '8': [], '9': [], '10': [], '11': [], '12': [], '13': []}
    }

  }

  componentDidMount() {
    this.setState({
      charters: Object.keys(Data).reverse()
    })
  }

  // react中事件传值只能在标签的事件上进行bind
  changeMenu(item) {
    // console.log(item)
    this.setState({
      currentTab: item,
      currentList: Data[item]
    })
  }

  onCick(parentIndex, index){
    // console.log(index)
    // 选择选项后，不能在修改
    if(this.state.userSelection[this.state.currentTab][parentIndex]) {
      return false
    }
    let obj = this.state.userSelection
    obj[this.state.currentTab][parentIndex] = (index + 1)
    // console.log(obj)
    this.setState({
      userSelection: obj
    })
  }

  render() {
    const options = {
      0: 'A',
      1: 'B',
      2: 'C',
      3: 'D'
    }
    return (
      <div id="pmp-c">
        <div id="charters">
          {
            this.state.charters.map((item, index) => {
              return (
                <div onClick={this.changeMenu.bind(this, item)} key={index} className={item === this.state.currentTab ? 'selectedMenu' : ''}>{"第" + item + "章"}</div>
              )
            })
          }
        </div>
        <Divider></Divider>
        <div id="content">
          {
            this.state.currentList.map((item, index) => {
              return (
                <Card hoverable key={index} size="small" title={item.question} style={{ width: 360, margin: 5 }}>
                  <div>
                    {
                      item.selection.map((item2, index2) => {
                        return (
                          <div onClick={this.onCick.bind(this, index, index2)} className={(index2 + 1) === this.state.userSelection[this.state.currentTab][index] ? 'selectedOption option' : 'option'} style={this.state.userSelection[this.state.currentTab][index] && ((index2 + 1) === item.correct) && (this.state.userSelection[this.state.currentTab][index] !== item.correct) ? {background: 'orange', transition: 'background 300ms'} : {}} key={this.state.currentTab + index + index2}>{options[index2]}. {item2}</div>
                        )
                      })
                    }
                    <div style={this.state.userSelection[this.state.currentTab][index] ? {display: 'block', fontWeight: 'bold', fontSize: 12, padding: 5, background: '#eee'} : {display: 'none'}}>解析：{item.analysis}</div>
                  </div>
                </Card>
              )
            })
          }
        </div>
        <BackTop></BackTop>
      </div>
    )
  }
}