import { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import './index.styl'

const Balls = props => {
  const BALL_COUNT = 10
  const innerCls = 'inner-hook'

  const dropBalls = useRef([])
  const [balls, setBalls] = useState([])
  const [showTransition, setShowTransition] = useState(false)

  const { showBallFlying } = props

  useEffect(() => {
    if (showBallFlying) {
      _triggerDrop(showBallFlying.target)
    }
  }, [showBallFlying])

  useEffect(() => {
    let ret = []
    for (let i = 0; i < BALL_COUNT; i++) {
      ret.push({
        show: false
      })
    }
    setBalls(ret)
  }, [])

  const onEnter = (ele, isAppearing) => {
    console.log('onEnter')
  }

  const onEntering = (ele, isAppearing) => {
    console.log('onEntering')
  }

  const onEntered = (ele, isAppearing) => {
    console.log('onEntered')
  }

  const _triggerDrop = (el) => {
    setShowTransition(true)

    for (let i=0; i < balls.length; i++ ) {
      const ball = balls[i]
      if (!ball.show) {
        ball.show = true
        ball.el = el
        dropBalls.current.push(ball)
        return
      }
    }
  }

  return (
    <div className="ball-container">
      {
        balls.map((ball, index) => {
          return (
            <div key={index}>
              <CSSTransition
                in={showTransition}
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
            </div>
          )
        })
      }
    </div>
  )
}

export default Balls