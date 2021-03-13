import { useRef, useEffect } from 'react'
import './index.styl'

const TabBarSlider = props => {
  const sliderRef = useRef(null)
  useEffect(() => {
    sliderRef.current.style['transition'] = 'transform 0.2s linear'
  }, [])

  useEffect(() => {
    sliderRef.current.style['transform'] = `translateX(${props.transfromX * sliderRef.current.clientWidth}px) translateZ(0)`
  }, [props.transfromX])
  return (
    <div ref={sliderRef} className="tab-bar-slider"></div>
  )
}

export default TabBarSlider