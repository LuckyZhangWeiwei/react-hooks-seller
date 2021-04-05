import ReactDOM from 'react-dom'
import {memo} from 'react'
import './index.styl'

const ModelLayer = props => {
  return (
      ReactDOM.createPortal(
      <div 
        className="model-layer" 
        {...props} 
        onClick={() => props.hide()}>
          {props.children}
      </div>
      ,document.body)
  )
}

export default memo(ModelLayer)