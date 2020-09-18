
// action也是函数
export function setLink (data) {
  // console.log(data)
  return (dispatch, getState) => {
    dispatch({ type: 'SET_LINK', data: data })
  }
}

