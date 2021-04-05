import { useEffect, useState, memo } from 'react'
import { CSSTransition } from 'react-transition-group'
import './index.styl'

import ModelLayer from './../model-layer'


const Dialog = props => {
  const {
    title
  } = props

  const [showTransition, setShowTransition] = useState(false)

  useEffect(() => {
    if(props.show) setShowTransition(true)
  }, [props.show])

  return (
    <ModelLayer style={{zIndex: 999}}>
       <CSSTransition
          timeout={200} 
          classNames="scala" 
          in={showTransition}>
          <div className="dialog-main">
            <div className="content">
              {title}
            </div>
            <div className="btn-container">
              <label
                className="btn" 
                onClick={
                  e => {
                    e.stopPropagation()
                      props.hideDialog()  
                    } 
                  }>
                取消
              </label>
              <label
                className="btn hightlight" 
                onClick={
                  e => {
                    e.stopPropagation()
                    props.ClearCart()
                    }
                }>
                确定
              </label>
            </div>
          </div>
      </CSSTransition>
    </ModelLayer>
  )
}

export default memo(Dialog)