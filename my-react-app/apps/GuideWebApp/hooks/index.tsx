import ReactDOM from 'react-dom/client'
import DsPop from '../components/common/Pop/DsPop'
import React from 'react'
import { Dialog } from 'antd-mobile'
const rootPop = ReactDOM.createRoot(document.getElementById('pop') as Element)
export const userHooks = () => {
  // console.log(1)
}
export const useDsPop = () => {
  const PopRef = React.forwardRef(DsPop)
  function toMounting(props:PopProps) {
    // key 通过key 强制刷新
    rootPop.render(<PopRef visible={true} key={Math.random()} {...props } />)
  }
  return [toMounting, PopRef]
}
// 弹框hooks
export const useDialog = () => {
  function DialogAlert(params:any) {
    const confirmBtn = <div className='ds-dialog-button adm-button adm-button-primary' >{ params?.dsConfirmText || '我知道了' }</div>
    return Dialog.alert({
      confirmText: confirmBtn,
      ...params
    })
  }
  function DialogConfirm(params:any) {
    const confirmBtn = <div className='ds-dialog-button short adm-button adm-button-primary ' onClick={params.confirmFn} color={params?.color || 'primary'}>{ params?.dsConfirmText || '我知道了' }</div>
    const cancelBtn = <div className='ds-dialog-button short adm-button adm-button-default'>{ params?.dsCancelText || '取消' }</div>
    return Dialog.confirm({
      confirmText: confirmBtn,
      cancelText: cancelBtn,
      ...params
    })
  }
  return {
    Dialog,
    DialogAlert,
    DialogConfirm,
    DialogShow: Dialog.show,
    DialogClear: Dialog.clear
  }
}
