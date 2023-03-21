let initData:any = {}
export default function getUserData(preState = initData, action: Actions) {
  const { type, data } = action
  switch (type) {
    case 'SET_USER_DATA':
      initData = {
        ...preState,
        userData: data
      }
      break
    default:
  }
  return initData
}

