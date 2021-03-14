import { useRef, useEffect } from 'react'
import './index.styl'

const TabBarSlider = props => {
  const sliderRef = useRef(null)
  const IndicatorWidthRef = useRef(null)
  let IndicatorWidth;
  useEffect(() => {
    IndicatorWidthRef.current = sliderRef.current.clientWidth
  }, [])
  useEffect(() => {
    sliderRef.current.style['transform'] = `translateX(${props.transfromX * IndicatorWidthRef.current}px) translateZ(0)`
  }, [props.transfromX])
  return (
    <div ref={sliderRef} className="tab-bar-slider" />
  )
}

export default TabBarSlider