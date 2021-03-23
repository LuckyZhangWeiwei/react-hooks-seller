import { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import produce from 'immer'
import './index.styl'

const Balls = props => {
  const BALL_COUNT = 15
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
    let tempObj = {}
    const immeredObj = produce(balls, draft => {
      for (let i = 0; i < draft.length; i++) {
        if (!draft[i].show) {
          draft[i].show = true
          draft[i].showTransition = true
          draft[i].el = el
          tempObj = {
            id: i,
            show: true,
            showTransition: true,
            el
          }
          return
        }
      }
    })

    dropBalls.current.push(tempObj)
    setBalls(immeredObj)
  }

  const onEnter = (ele, isAppearing) => {
      const dropBall = dropBalls.current[dropBalls.current.length - 1]
      const rect = dropBall.el.target.getBoundingClientRect()
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
      const droppedBall = dropBalls.current.shift()

      const immeredObj = produce(balls, draft => {
        for (let i = 0; i < draft.length; i++) {
          if (draft[i].id === droppedBall.id) {
            draft[i].show = false
            draft[i].showTransition = false
            delete draft[i].el
            return
          }
        }
      })
      setBalls(immeredObj)
  }

  const onExit = ele => {
    ele.classList.remove('exit-done')
    ele.style = null
    ele.children[0].style = null
    ele.style.display = 'none'
  }

  const onExiting = ele => {}

  const onExited = ele => {
  }

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