import { useRef, useEffect } from 'react'
import './index.styl'

const TabBarSlider = props => {
  const {tabCount} = props
  const sliderRef = useRef(null)
  const IndicatorWidthRef = useRef(null)
  useEffect(() => {
    IndicatorWidthRef.current = sliderRef.current.clientWidth
  }, [])

  useEffect(() => {
    sliderRef.current.style['transform'] = `translateX(${props.transfromX * IndicatorWidthRef.current}px) translateZ(0)`
  }, [props.transfromX])

  
  return (
    <div ref={sliderRef} className="tab-bar-slider" style={{width: `${1 * 100 / tabCount}%`}} />
  )
}

export default TabBarSlider