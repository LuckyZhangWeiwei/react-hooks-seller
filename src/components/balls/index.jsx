import { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import produce from 'immer'
import './index.styl'

const Balls = props => {
  const BALL_COUNT = 10
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
    console.log('onEnter')
    const ball = dropBalls.current[dropBalls.current.length - 1]
    console.log(ball)
    const rect = ball.el.target.getBoundingClientRect()
    const x = rect.left - 32
    const y = -(window.innerHeight - rect.top - 22)
    ele.style.display = 'block'
    ele.style.transform = ele.style.webkitTransform =  `translate3d(0, ${y}px, 0)`
    const inner = ele.getElementsByClassName(innerCls)[0]
    inner.style.transform = inner.style.webkitTransform =  `translate3d(${x}px, 0, 0)`
  }

  const onEntering = (ele, isAppearing) => {
    console.log('onEntering')
    ele.style.transition = 'all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)'
    ele.style.transform = ele.style.webkitTransform =  `translate3d(0, 0, 0)`
    const inner = ele.getElementsByClassName(innerCls)[0]
    inner.style.transition = 'all 0.4s linear'
    inner.style.transform = inner.style.webkitTransform =  `translate3d(0, 0, 0)`
    ele.addEventListener('transitionend', {})
  }

  const onEntered = (ele, isAppearing) => {
    console.log('onEntered')
    ele.style.display = 'none'
    const ball = dropBalls.current.shift()
    // balls[ball.id].show = false
    // balls[ball.id].showTransition = false
    // setBalls([...balls])
    // const immeredObj = produce(balls, draft => {
    //   draft[ball.id].show = false
    //   draft[ball.id].showTransition = false
    // })
    // setBalls(immeredObj)
  }

  return (
    <div className="ball-container">
      {
        balls.map((ball, index) => {
          return (
            <div key={index}>
              <CSSTransition
                in={ball.showTransition}
                timeout={410}
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