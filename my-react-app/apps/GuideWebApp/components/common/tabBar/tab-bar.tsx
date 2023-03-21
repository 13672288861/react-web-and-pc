import { useNavigate } from 'react-router-dom'
import { LeftOutline } from 'antd-mobile-icons'
import Css from './index.module.less'
export default function(props: tabBarProps): React.ReactElement {
  const { centerText = '导检单' } = props
  const router = useNavigate()
  return (<div className={Css['tab-bar-warpper']}>
    <div className='left left-arrow' onClick={() => router(-1)}><LeftOutline /></div>
    <div className='center'>{ centerText }</div>
    <div className={Css['right']} onClick={() => router('/')}></div>
  </div>)
}
