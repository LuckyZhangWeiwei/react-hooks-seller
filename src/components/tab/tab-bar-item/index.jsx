
import { memo } from 'react'
import './index.styl'
const TabBarItem = props => {
  return (
    <div 
      className={props.className}
      onClick={() => props.onClick()}>
      <i/>
      <div>{props.title}</div>
    </div>
  )
}

export default memo(TabBarItem)