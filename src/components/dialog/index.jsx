import { useEffect, useState } from 'react'
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
              <div>
                <a 
                  href="javascript:;" 
                  className="btn" 
                  onClick={
                    e => {
                      e.stopPropagation()
                        props.hideDialog()  
                      } 
                    }>
                  取消
                </a>
                <a 
                  href="javascript:;" 
                  className="btn hightlight" 
                  onClick={
                    e => {
                      e.stopPropagation()
                      props.ClearCart()
                      }
                  }>
                  确定
                </a>
              </div>
            </div>
      </CSSTransition>
    </ModelLayer>
  )
}

export default Dialog