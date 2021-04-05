import ReactDOM from 'react-dom'
import { useState, useEffect, memo, useCallback } from 'react'
import { CSSTransition } from 'react-transition-group'
import SupportIcon from './../support-ico'
import Star from './../star'

import './index.styl'

const HeaderDetail = props => {
  const seller = props.data
  const [showTransition, setShowTransition] = useState(false)

  useEffect(() => {
    if (props.show) {
      setShowTransition(true)  
    }
  }, [props.show])

  const hide = useCallback(() => {
    setShowTransition(false)

    setTimeout(() => {
      props.hideHeaderDetail()    
    }, 310)
  }, [])

  return (
    <>
      {
        props.show &&
        <CSSTransition timeout={300} classNames="fade" in={showTransition}>
          <>
          {
            ReactDOM.createPortal(
              <div className="header-detail">
                <div className="detail-wrapper clear-fix">
                  <div className="detail-main">
                    <h1 className="name">{seller.name}</h1>
                    <div className="star-wrapper">
                      <Star
                        size="48"
                        score={seller.score}/>
                    </div>
                    <div className="title">
                      <div className="line" />
                      <div className="text">优惠信息</div>
                      <div className="line" />
                    </div>
                    {
                      seller.supports &&
                      <ul className="supports">
                        {
                          seller.supports.map((item, index) => {
                            return (
                              <li className="support-item"  key={index}>
                                <SupportIcon size="2" type={item.type} />
                                <span className="text">{item.description}</span>
                              </li>
                            )
                          })
                        }
                      </ul>
                    }
                    <div className="title">
                      <div className="line" />
                      <div className="text">公告</div>
                      <div className="line" />
                    </div>
                    <div className="bulletin">
                      <p className="content">{seller.bulletin}</p>
                    </div>
                  </div>
                </div>
                <div 
                  className="detail-close" 
                  onClick={() => hide()}>
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

export default memo(HeaderDetail)