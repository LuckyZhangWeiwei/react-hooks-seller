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