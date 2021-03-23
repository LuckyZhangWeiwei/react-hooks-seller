import {useState, useEffect, useRef} from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import Scroller from './../scroller'
import CartControl from './../cart-control'
import './index.styl'

const Food = props => {
  const { food, subtractFood, addFood } = props
  const scrollerRef = useRef(null)

  useEffect(() => {
    console.log('food:', food)
  }, [food])

  const hide = () => {
    props.hide()
  }

  const addFirst = () => {}

  return (
    <div className="food-container">
      <Scroller myRef={scrollerRef} data={food}>
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
                <CartControl
                  food={food}
                  onDescrease={subtractFood}
                  onAdd={addFood}
                  useTransition={true} 
                />
              </div>
            }
            {
              !food.count &&
              <CSSTransition timeout={300} classNames="fade">
                <div className="buy" onClick={() => addFirst()}>
                  加入购物车
                </div>
              </CSSTransition>
            }

            
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
          />
          ,document.body)
      }
      </>
    </CSSTransition>
  )
}

export default FoodPortal