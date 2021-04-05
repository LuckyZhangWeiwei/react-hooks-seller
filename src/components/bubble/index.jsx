import {memo} from 'react'
import './index.styl'

const Bubble = props => {
  return (
    <span className="num">
      <span className="bubble">{props.count}</span>
    </span>
  )
}

export default memo(Bubble)