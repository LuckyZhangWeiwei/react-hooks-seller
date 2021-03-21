import { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import './index.styl'

const Balls = props => {
  const BALL_COUNT = 10
  const innerCls = 'inner-hook'
  const [balls, setBalls] = useState([])

  const { showBallFlying } = props

  useEffect(() => {
    console.log(showBallFlying)
  }, [showBallFlying])

  useEffect(() => {
    let ret = []
    for (let i = 0; i< BALL_COUNT; i++) {
      ret.push({
        show: false
      })
    }
    setBalls(ret)
  }, [])

  const onEnter = (ele, isAppearing) => {

  }

  const onEntering = (ele, isAppearing) => {

  }

  const onEntered = (ele, isAppearing) => {

  }

  return (
    <div className="ball-container">
      {
        balls.map((ball, index) => {
          return (
            <CSSTransition
              key={index}
              timeout={300}
              onEnter={(ele, isAppearing) => onEnter(ele, isAppearing)}
              onEntering={(ele, isAppearing) => onEntering(ele, isAppearing)}
              onEntered={(ele, isAppearing) => onEntered(ele, isAppearing)}>
              <div 
                className="ball" 
                style={{display: ball.show ? 'block' : 'none'}}>
                <div className="inner inner-hook"/>
              </div>
            </CSSTransition>
          )
        })
      }
    </div>
  )
}

export default Balls