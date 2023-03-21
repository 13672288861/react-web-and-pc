import { Popup, Button } from 'antd-mobile'
import './index.less'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function(props: PopProps, ref:any) {
  const {
    children = <div></div>,
    title = '',
    Footer = <div></div>,
    visible = false,
    showComfirmBtnText,
    confirmCb,
    mask = true,
    forceRender = false,
    afterShow,
    afterClose,
    showCloseButton = true,
    bodyClassName = 'ds-pop-body',
    getContainer = document.getElementById('pop'),
    isShowFullScreen = false,
    useEvent
  } = props
  const [innerVisible, setVisible] = useState(false)
  useEffect(() => {
    setVisible(visible)
  }, [visible])
  const [fullscreen, toggleFullscreen] = useState(false)
  useEvent?.useSubscription((eventType: 'close' | 'open' | 'toggleFullscreen') => {
    if (eventType !== 'toggleFullscreen' && typeof eventType !== 'boolean') {
      setVisible(eventType === 'open')
    } else if (eventType === 'toggleFullscreen') {
      toggleFullscreen(!fullscreen)
    }
  })
  return (<div className='ds-pop-warp'>
    <Popup
      className='ds-pop'
      bodyClassName={bodyClassName + (fullscreen ? ' ds-pop-fullscreen' : '')}
      visible={innerVisible}
      onClose={() => {
        afterClose ? afterClose('cancel') : setVisible(false)
      }}
      onMaskClick={() => {
        setVisible(false)
      }}
      style={{ '--height': fullscreen ? '100vh' : 'auto' } as never as any}
      getContainer={getContainer}
      showCloseButton={showCloseButton}
      mask={mask}
      forceRender= {forceRender}
      afterClose = {() => afterClose && afterClose('cancel')}
      afterShow = {() => afterShow && afterShow()}
    >
      <div className='ds-pop-title'>
        { isShowFullScreen && (<div onClick={() => {
          toggleFullscreen(!fullscreen)
          useEvent.emit(!fullscreen)
        }}>
          <span className={ fullscreen ? 'icon-Shrinkscreen' : 'icon-Fullscreen'}></span>
          <label>{ fullscreen ? '缩小' : '全屏'}</label>
        </div>) }
        { title }
      </div>
      <div className='ds-pop-content'>
        { children }
      </div>
      <div className='ds-pop-footer'>
        { Footer ? showComfirmBtnText ? (<Button block shape='rounded' onClick={() => {
          confirmCb ? confirmCb(() => setVisible(false)) : setVisible(false)
        } } color='primary'>{ showComfirmBtnText }</Button>) : '' : '' }
      </div>
    </Popup>
  </div>)
}
