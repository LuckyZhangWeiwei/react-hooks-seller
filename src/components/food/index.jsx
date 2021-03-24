import {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import Scroller from './../scroller'
import CartControl from './../cart-control'
import SplitLine from './../split-line'
import './index.styl'

const Food = props => {
  const { food, subtractFood, addFood, category } = props

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
            <img src={food.image} alt="" />
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
              food.count && 
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