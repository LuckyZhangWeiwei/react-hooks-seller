import { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import './index.styl'

const Balls = props => {
  const BALL_COUNT = 5
  const innerCls = 'inner-hook'

  const { showBallFlying } = props

  const dropBalls = useRef([])
  const [balls, setBalls] = useState([])

  useEffect(() => {
    if (showBallFlying) {
      _triggerDrop(showBallFlying.target)
    }
  }, [showBallFlying])

  useEffect(() => {
    let ret = []
    for (let i = 0; i < BALL_COUNT; i++) {
      ret.push({
        id: i,
        show: false,
        showTransition: false
      })
    }
    setBalls(ret)
  }, [])

  const _triggerDrop = el => {
    for (let i = 0; i < balls.length; i++ ) {
      const ball = balls[i]
      if (!ball.show) {
        ball.show = true
        ball.showTransition = true
        ball.el = el
        dropBalls.current.push(ball)
        return
      }
    }
    setBalls([...balls])
  }

  const onEnter = (ele, isAppearing) => {
      const ball = dropBalls.current[dropBalls.current.length - 1]
      const rect = ball.el.target.getBoundingClientRect()
      const x = rect.left - 32
      const y = -(window.innerHeight - rect.top - 22)
      ele.style.display = 'block'
      ele.style.transform = ele.style.webkitTransform =  `translate3d(0, ${y}px, 0)`
      const inner = ele.getElementsByClassName(innerCls)[0]
      inner.style.transform = inner.style.webkitTransform =  `translate3d(${x}px, 0, 0)`  
  }

  const onEntering = (ele, isAppearing) => {
      ele.style.transition = 'all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)'
      ele.style.transform = ele.style.webkitTransform =  `translate3d(0, 0, 0)`
      const inner = ele.getElementsByClassName(innerCls)[0]
      inner.style.transition = 'all 0.4s linear'
      inner.style.transform = inner.style.webkitTransform =  `translate3d(0, 0, 0)`
  }

  const onEntered = (ele, isAppearing) => {
      ele.style.display = 'none'
      // const droppedBall = dropBalls.current.shift()
      // balls[ball.id].show = false
      // balls[ball.id].showTransition = false
      setBalls([...balls, {id: balls.length + 1, show: false, showTransition: false}])
  }

  const onExit = ele => {}

  const onExiting = ele => {}

  const onExited = ele => {}

  return (
    <div className="ball-container">
      {
        balls.map((ball, index) => {
          return (
            <div key={index}>
              <CSSTransition
                in={ball.showTransition}
                timeout={400}
                onEnter={(ele, isAppearing) => onEnter(ele, isAppearing)}
                onEntering={(ele, isAppearing) => onEntering(ele, isAppearing)}
                onEntered={(ele, isAppearing) => onEntered(ele, isAppearing)}
                onExit={(ele, isAppearing) => onExit(ele)}
                onExiting={(ele, isAppearing) => onExiting(ele)}
                onExited={(ele, isAppearing) => onExited(ele)}
                >
                <div 
                  className="ball" 
                  style={{display: ball.show ? 'block' : 'none'}}>
                  <div className="inner inner-hook" />
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