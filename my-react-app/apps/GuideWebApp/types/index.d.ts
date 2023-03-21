// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference path="../../common/types.d.ts" />

type Actions = { type: string, data: (typeObject<any> | string | number) }
type tabBarProps = { centerText?: string | React.ReactNode}
type typeObject<T> = { [string | number | symbol]: T }
type ReactNode = ReactNode
interface afterCloseIn{
  cancel;
  confirm;
};
type PopProps = {
  children: ReactNode,
  title?: ReactNode,
  Footer?: ReactNode,
  visible?: boolean,
  showComfirmBtn?:boolean,
  confirmCb?:(cb: () => void) => unknown,
  onClose?:() => unknown,
  mask?:boolean,
  forceRender?:false,
  afterShow?: () => unknown,
  afterClose?: (type: keyof afterCloseIn) => unknown,
  showComfirmBtnText?: boolean | string,
  showCloseButton?: boolean,
  bodyClassName?: string,
  getContainer?: any,
  useEvent?: import('ahooks/lib/useEventEmitter').EventEmitter,
  isShowFullScreen?: boolean
}
declare module '@pageI/hooks' {
  export const useDialog:() => any
  export const useDsPop:() => any[]
}
declare module 'weixin-js-sdk' {
  export default {
    miniProgram: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      getEnv: (a:(res) => void) => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      navigateTo: (options:any) => {}
    }
  }
}

type DsTimer = NodeJS.Timer | string | number | Timeout | undefined
// eslint-disable-next-line @typescript-eslint/no-empty-interface
