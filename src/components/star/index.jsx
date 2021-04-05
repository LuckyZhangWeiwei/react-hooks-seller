import {useState, useEffect, memo} from 'react'
import './index.styl'

const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

const Star = props => {
  const {size, score} = props
  const [itemClasses, setItemClasses] = useState([])

  useEffect(() => {
    const result = []
    let value = Math.floor(score * 2) / 2 // 向下取整
    const hasDecimal = value % 1 !== 0
    const integer = Math.floor(value)
    for (let i = 0; i < integer; i++) {
      result.push(CLS_ON)
    }
    if (hasDecimal) {
      result.push(CLS_HALF)
    }
    while (result.length < LENGTH) {
      result.push(CLS_OFF)
    }
    setItemClasses(result)
  }, [score])

  return (
    <div className={`star star-${size}`}>
      {
        itemClasses.map((item, index) => {
          return (
            <span key={index} className={`star-item ${item}`} />
          )
        })
      }
    </div>
  )
}

export default memo(Star)