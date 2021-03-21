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

  const _triggerDrop = (el) => {
    setShowTransition(true)

    for (let i = 0; i < balls.length; i++ ) {
      const ball = balls[i]
      if (!ball.show) {
        ball.show = true
        ball.el = el
        dropBalls.current.push(ball)
        return
      }
    }
  }

  const onEnter = (ele, isAppearing) => {
    console.log('onEnter')
    const ball = dropBalls.current[dropBalls.current.length - 1]
    const rect = ball.el.target.getBoundingClientRect()
    const x = rect.left - 32
    const y = -(window.innerHeight - rect.top - 22)
    ele.style.display = ''
    ele.style.transform = ele.style.webkitTransform =  `translate3d(0, ${y}px, 0)`
    const inner = ele.getElementsByClassName(innerCls)[0]
    inner.style.transform = inner.style.webkitTransform =  `translate3d(${x}px, 0, 0)`
  }

  const onEntering = (ele, isAppearing) => {
    console.log('onEntering')
    // const _reflow = document.body.offsetHeight
    ele.style.transform = ele.style.webkitTransform =  `translate3d(0, 0, 0)`
    const inner = ele.getElementsByClassName(innerCls)[0]
    inner.style.transform = inner.style.webkitTransform =  `translate3d(0, 0, 0)`
    ele.addEventListener('transitionend', {})
  }

  const onEntered = (ele, isAppearing) => {
    console.log('onEntered')
    const ball = dropBalls.current.shift()
    if (ball) {
      ball.show = false
      ele.style.display = 'none'
    }
    // setShowTransition(false)
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