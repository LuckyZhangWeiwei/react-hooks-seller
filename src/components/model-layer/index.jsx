import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.styl'

const ModelLayer = props => {
  return (
      ReactDOM.createPortal(
      <div className="model-layer">{props.children}</div>
      ,document.body)
  )
}

export default ModelLayer