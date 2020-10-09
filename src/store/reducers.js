
// 工具函数，用于组织多个reducer，并返回reducer集合
import { combineReducers } from 'redux'
// 默认值
import defaultState from './state.js'

// 一个reducer就是一个函数
function setLink (state = defaultState.link, action) {
  // console.log(action.data)
  // 不同的action有不同的处理逻辑
  switch (action.type) {
    case 'SET_LINK':
      // console.log(action)
      return Object.assign({}, state, {
        link: action.data
    }).link
    default:
      return state
  }
}
function setChild1Msg (state = defaultState.child1Msg, action) {
  // console.log(action.type)
  // 不同的action有不同的处理逻辑
  switch (action.type) {
    case 'SET_CHILD1MSG':
      // console.log(action)
      return Object.assign({}, state, {
        child1Msg: action.data
    }).child1Msg
    default:
      return state
  }
}
function setChild2Msg (state = defaultState.child2Msg, action) {
  // console.log(action.data)
  // 不同的action有不同的处理逻辑
  switch (action.type) {
    case 'SET_CHILD2MSG':
      // console.log(action)
      return Object.assign({}, state, {
        child2Msg: action.data
    }).child2Msg
    default:
      return state
  }
}

// 导出所有reducer
export default combineReducers({
  setLink,
  setChild1Msg,
  setChild2Msg
})

