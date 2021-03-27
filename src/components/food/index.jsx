import {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import  classnames from 'classnames'
import Scroller from './../scroller'
import CartControl from './../cart-control'
import SplitLine from './../split-line'
import './index.styl'

const ALL = 2
const IMAGAE_SIZE = 12

const Food = props => {
  const { food, subtractFood, addFood, category } = props

  const [commentsSelectedType, setCommentsSelectedType] = useState(ALL)
  const [onlyConent, setOnlyContent] = useState(true)

  const [ratings, setRatings] = useState([])

  const [computedRatings, setComputedRatings] = useState([])

  useEffect(() => {
    setRatings(food.ratings)
  }, [food])

  useEffect(() => {
    let ret = []
    ratings.forEach(rating => {
      if (onlyConent && !rating.text) return
      if (commentsSelectedType === ALL || commentsSelectedType === rating.rateType) {
        ret.push(rating)
      }
    })
    setComputedRatings(ret)

  }, [ratings, commentsSelectedType])

  const getSelectedCategory = (goodsCategory, selectedFood) => {
    for (let categoryIndex = 0; categoryIndex < goodsCategory.length; categoryIndex++) {
      for (let foodIndex = 0; foodIndex < goodsCategory[categoryIndex].foods.length; foodIndex++) {
        if (goodsCategory[categoryIndex].foods[foodIndex].name === selectedFood.name) {
          return goodsCategory[categoryIndex]
        }
      }
    }
  }

  const addFirst = (target) => {
    const selectedCategory = getSelectedCategory(category, food)
    addFood(selectedCategory, food, target)
  }

  const onAddFood = (food, target) => {
    const selectedCategory = getSelectedCategory(category, food)
    addFood(selectedCategory, food, target)
  }

  const onDescrease = food => {
    const selectedCategory = getSelectedCategory(category, food)
    subtractFood(selectedCategory, food)
  }

  const hide = () => {
    props.hide()
  }

  return (
    <div className="food-container">
      <Scroller data={food}>
        <div className="food-content">
          <div className="image-header">
            <LazyLoadImage
              src={food.image}
              alt=""
            />
            <div className="back" onClick={() => hide()}>
              <i className="icon-arrow_lift" />
            </div>
          </div>
          <div className="content">
            <h1 className="title">{food.name}</h1>
            <div className="detail">
              <span className="sell-count">月售{food.sellCount}份</span>
              <span className="rating">好评率{food.rating}%</span>
            </div>
            <div className="price">
              <span className="now">￥{food.price}</span>
              {
                food.oldPrice &&
                <span className="old">￥{food.oldPrice}</span>  
              }
            </div>
            {
              food.count > 0 && 
              <div className="cart-control-wrapper">
                {
                  food &&
                  <CartControl
                    food={food}
                    onAdd={(food, target) => onAddFood(food, target)}
                    onDescrease={() => onDescrease(food)}
                    useTransition={true}
                  />
                }
              </div>
            }
            {
              !food.count &&
              <CSSTransition timeout={300} classNames="fade">
                <div 
                  className="buy" 
                  onClick={food => addFirst(food)}>
                  加入购物车
                </div>
              </CSSTransition>
            }
          </div>
            {
              food.info &&
              <>
                <SplitLine />
                <div className="info">
                  <h1 className="title">商品评价</h1>
                  <p className="text">{food.info}</p>
                </div>
              </>
            }
            <SplitLine />
            <div className="rating">
              <h1 className="title">商品评价</h1>
              <div className="rating-wrapper">
               {
                 computedRatings &&
                 <ul>
                   {
                     computedRatings.map((rating, index) => {
                       return (
                        <li key={index} className="rating-item border-bottom-1px">
                          <div className="user">
                            <span className="name">{rating.username}</span>
                            <img src={rating.avatar} alt="" className="avatar" height={IMAGAE_SIZE} width={IMAGAE_SIZE}/>
                          </div>
                          <div className="time">
                            {rating.rateTime}
                          </div>
                          <p className="text">
                            <span 
                              className={
                                classnames({'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1 })
                              }>
                              {rating.text}
                            </span>
                          </p>
                        </li>
                       )
                     })
                   }
                 </ul>
               }
               {
                 !computedRatings || !computedRatings.length &&
                 <div className="no-rating">
                  暂无评价
                </div>
               }
              </div>
            </div>
        </div>
      </Scroller>
    </div>
  )
}

const FoodPortal = props => {
  const [showTransition, setShowTransition] = useState(false)

  useEffect(() => {
    if (props.show)
      setShowTransition(true)
  }, [props.show])
  
  const hide = () => {
    setShowTransition(false)
    setTimeout(() => {
      props.hideFoodPortal()
    }, 310);
  }

  return (
    <CSSTransition timeout={300} classNames="slide" in={showTransition}>
      <>
      {
        ReactDOM.createPortal(
          <Food
            food={props.food}
            hide={() => hide()}
            addFood={props.addFood}
            subtractFood={props.subtractFood}
            category={props.category}
          />
          ,document.body)
      }
      </>
    </CSSTransition>
  )
}

export default FoodPortal