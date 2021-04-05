import {useEffect, useState, memo} from 'react'
import './index.styl'
import classnames from 'classnames'

const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

const RatingSelector = props => {
  const {
    ratings,
    onlyContent,
    selectType,
    desc,
    onSelect,
    onToggle
  } = props

  const [positives, setPositives] = useState([])
  const [negatives, setNegatives] = useState([])

  useEffect(() => {
    let positives = ratings.filter(rating => {
      return rating.rateType === POSITIVE
    })
    setPositives(positives)


    let negatives = ratings.filter(rating => {
      return rating.rateType === NEGATIVE
    })
    setNegatives(negatives)

  }, [ratings])

  return (
    <div className="rating-select">
      <div className="rating-type border-bottom-1px">
        <span 
          className={classnames('block positive', {'active': selectType === 2})}
          onClick={() => onSelect(2)}>
          {desc.all}
          <span className="count">{ratings.length}</span>
        </span>
       <span 
          className={classnames('block positive', {'active': selectType === 0})}
          onClick={() => onSelect(0)}>
          {desc.positive}
          <span className="count">{positives.length}</span>
        </span>
         <span 
          className={classnames('block negative', {'active': selectType === 1})}
          onClick={() => onSelect(1)}>
          {desc.negative}
          <span className="count">{negatives.length}</span>
        </span>
        <div 
          className={classnames('switch', {'on': onlyContent})}
          onClick={() => onToggle()}>
          <span className="icon-check_circle"></span>
          <span className="text">只看有内容的评价</span>
        </div>
      </div>
    </div>
  )
}

export default memo(RatingSelector)