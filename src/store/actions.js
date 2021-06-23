
// action也是函数
export function setLink (data) {
  // console.log(data)
  return (dispatch, getState) => {
    dispatch({ type: 'SET_LINK', data: data })
  }
}

export function setChild1Msg (data) {
  // console.log(data)
  return (dispatch, getState) => {
    dispatch({ type: 'SET_CHILD1MSG', data: data })
  }
}

export function setChild2Msg (data) {
  // console.log(data)
  return (dispatch, getState) => {
    dispatch({ type: 'SET_CHILD2MSG', data: data })
  }
}

