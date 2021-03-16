import { useEffect, useRef } from 'react'
import BScroll from '@better-scroll/core'
import './index.styl'

const Scroller = props => {

  const scrollerContainerRef = useRef(null)
  const scrollerRef = useRef(null)

  useEffect(() => {
    _initScroll()
  }, [])

  useEffect(() => {
    scrollerRef.current.refresh()
  }, [props.data])

  const _initScroll = () => {
    scrollerRef.current = new BScroll(scrollerContainerRef.current, {
      probeType: props.probeType,
      click: true
    })
    
    if (props.listenScroll) {
      scrollerRef.current.on('scroll', pos => {
        setTimeout(() => {
          props.onScroll(pos)  
        }, 20);
      })
    }
  }

  return (
    <div ref={scrollerContainerRef} className="scroll-container">
      <div>
        {
          props.children
        }
      </div>
    </div>
  )
} 

export default Scroller