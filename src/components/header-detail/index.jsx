import ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import './index.styl'

const HeaderDetail = props => {
  const [showTransition, setShowTransition] = useState(false)

  useEffect(() => {
    setShowTransition(true)
  }, [])

  const hide = () => {
    props.hideHeaderDetail()
  }
  
  return (
    <>
      {
        props.show &&
        <CSSTransition timeout={300} classNames="fade" in={showTransition}>
          <>
          {
            ReactDOM.createPortal(
              <div className="header-detail">
                <div className="detail-close" onClick={() => hide()}>
                  <i className="icon-close" />
                </div>
              </div>
              ,
              document.body
            )
          }
          </>
        </CSSTransition>
      }
    </>
 )
}

export default HeaderDetail